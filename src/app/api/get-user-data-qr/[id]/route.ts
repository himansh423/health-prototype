import { type NextRequest, NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  PDFPage,
  PDFFont,
  RGB,
} from "pdf-lib";

// Comprehensive interfaces for user data structure
interface ContactDetails {
  phone: string;
  emergencyContact: string;
}

interface Address {
  village: string;
  district: string;
  state: string;
  pincode: string;
}

interface ChronicCondition {
  name: string;
  diagnosedDate: string;
  severity: string;
  status: string;
  managementPlan: string;
}

interface PastMedicalCondition {
  name: string;
  startDate: string;
  endDate: string;
  treatment: string;
}

interface Allergy {
  allergen: string;
  type: string;
  severity: string;
  reaction: string;
}

interface Medication {
  name: string;
  dosage: string;
  prescribedBy: string;
  schedule: string;
  nextRefillDate?: string; // Optional for current medications
  startDate?: string; // For previous medications
  endDate?: string; // For previous medications
  reasonForStopping?: string; // For previous medications
}

interface MedicinePackage {
  name: string;
  active: boolean;
  monthlyCost: number;
  nextDeliveryDate: string;
  supplyRemaining: number;
  medications: string[];
}

interface VaccinationRecord {
  vaccineName: string;
  type: string;
  date: string;
  doctorName: string;
  location: string;
  batchNumber: string;
}

interface UpcomingVaccination {
  vaccineName: string;
  dueDate: string;
  freeUnderGovtScheme: boolean;
  notes?: string;
}

interface RecommendedVaccination {
  vaccineName: string;
  description: string;
  priority: string;
  freeUnderGovtScheme: boolean;
  warning?: string;
}

interface HospitalVisit {
  hospitalName: string;
  hospitalType: string;
  date: string;
  doctorName: string;
  specialization: string;
  diagnosis: string;
}

interface Surgery {
  name: string;
  date: string;
  hospital: string;
  surgeon: string;
  details: string;
  followUp: string;
}

interface HealthReport {
  type: string;
  summary: string;
  startDate: string;
  endDate: string;
  firstReading: string;
  latestReading: string;
  improvement: boolean;
  improvementValue?: string;
}

interface FamilyDetail {
  name: string;
  relationship: string;
  age: number;
  coveredUnderInsurance: boolean;
}

interface GovernmentScheme {
  name: string;
  status: string;
  cardNumber: string;
  validUntil: string;
  coverageDetails: string;
}

interface Appointment {
  date: string;
  time?: string;
  doctorName?: string;
  hospitalName?: string;
  purpose?: string;
}

interface UserData {
  data: {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    bloodGroup: string;
    dateOfBirth: string;
    email: string;
    contactDetails: ContactDetails;
    governmentId?: string;
    address: Address;
    subscriptionPlan?: string;
    subscriptionAmount?: number;
    subscriptionBenefits?: string[];
    chronicConditions?: ChronicCondition[];
    pastMedicalConditions?: PastMedicalCondition[];
    allergies?: Allergy[];
    currentMedications?: Medication[];
    previousMedications?: Medication[];
    medicinePackages?: MedicinePackage[];
    vaccinationRecords?: VaccinationRecord[];
    upcomingVaccinations?: UpcomingVaccination[];
    recommendedVaccinations?: RecommendedVaccination[];
    hospitalVisits?: HospitalVisit[];
    surgeries?: Surgery[];
    healthReports?: HealthReport[];
    familyDetails?: FamilyDetail[];
    insuranceCoverage: boolean;
    insuranceProvider?: string;
    insurancePolicyNumber?: string;
    insuranceType?: string;
    insuranceCoverageAmount: number;
    insuranceUsed: number;
    insuranceValidUntil: string;
    govtSchemes?: GovernmentScheme[];
    appointments?: Appointment[];
  };
}

// Function to fetch user data
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const response: Response = await fetch(
      "https://health-prototype.vercel.app"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return (await response.json()) as UserData;
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function generatePDF(userData: UserData): Promise<Buffer> {
  try {
    const pdfDoc: PDFDocument = await PDFDocument.create();
    let page: PDFPage = pdfDoc.addPage();

    const primaryBlue: RGB = rgb(0 / 255, 112 / 255, 243 / 255); // #0070f3
    const teal: RGB = rgb(67 / 255, 198 / 255, 184 / 255); // #43C6B8
    const orange: RGB = rgb(249 / 255, 115 / 255, 22 / 255); // #F97316
    const white: RGB = rgb(1, 1, 1); // white
    const black: RGB = rgb(0, 0, 0); // black
    const lightGray: RGB = rgb(0.95, 0.95, 0.95); // light gray for alternating rows
    const mediumGray: RGB = rgb(0.85, 0.85, 0.85); // medium gray for borders
    const lightBlue: RGB = rgb(0.9, 0.95, 1); // light blue for some backgrounds

    // Set up fonts
    const helveticaFont: PDFFont = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );
    const helveticaBoldFont: PDFFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );
    const timesRomanFont: PDFFont = await pdfDoc.embedFont(
      StandardFonts.TimesRoman
    );
    const timesRomanBoldFont: PDFFont = await pdfDoc.embedFont(
      StandardFonts.TimesRomanBold
    );

    // Set up page dimensions
    const { width, height }: { width: number; height: number } = page.getSize();
    const margin: number = 50;
    let y: number = height - margin;

    // Helper function to add text
    const addText = (
      text: string,
      x: number,
      y: number,
      font: PDFFont,
      size: number,
      color: RGB = black
    ): void => {
      page.drawText(text, { x, y, font, size, color });
    };

    // Helper function to draw a line
    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      thickness: number = 1,
      color: RGB = black
    ): void => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness,
        color,
      });
    };

    const checkForNewPage = (
      currentY: number,
      requiredSpace: number = 150
    ): number => {
      if (currentY < requiredSpace) {
        page = pdfDoc.addPage();
        const { height }: { height: number } = page.getSize();

        page.drawRectangle({
          x: 0,
          y: height - 50,
          width: width,
          height: 50,
          color: primaryBlue,
        });

        addText(
          "Health Profile - Continued",
          width / 2 - 100,
          height - 30,
          helveticaBoldFont,
          18,
          white
        );
        return height - 70;
      }
      return currentY;
    };

    // Create a stylish header
    page.drawRectangle({
      x: 0,
      y: height - 150,
      width: width,
      height: 150,
      color: primaryBlue,
    });

    for (let i: number = 0; i < 5; i++) {
      page.drawCircle({
        x: margin + i * 20,
        y: height - 30,
        size: 8,
        color: teal,
      });
    }

    addText(
      "Health Profile",
      width / 2 - 100,
      height - 80,
      timesRomanBoldFont,
      36,
      white
    );
    drawLine(
      width / 2 - 100,
      height - 90,
      width / 2 + 100,
      height - 90,
      2,
      white
    );
    addText(
      "Comprehensive Medical Record",
      width / 2 - 90,
      height - 110,
      timesRomanFont,
      16,
      white
    );

    y = height - 170;

    const createTableHeader = (
      headers: string[],
      yPos: number,
      rowWidth: number
    ): number => {
      const cellWidth: number = rowWidth / headers.length;

      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: rowWidth + 10,
        height: 25,
        color: teal,
      });

      headers.forEach((header: string, index: number) => {
        addText(
          header,
          margin + index * cellWidth + 5,
          yPos,
          helveticaBoldFont,
          12,
          white
        );

        if (index < headers.length - 1) {
          drawLine(
            margin + (index + 1) * cellWidth,
            yPos - 5,
            margin + (index + 1) * cellWidth,
            yPos + 20,
            1,
            white
          );
        }
      });

      return yPos - 30;
    };

    const addTableRow = (
      values: string[],
      yPos: number,
      rowWidth: number,
      rowIndex: number
    ): number => {
      const cellWidth: number = rowWidth / values.length;
      const bgColor: RGB = rowIndex % 2 === 0 ? lightGray : white;

      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: rowWidth + 10,
        height: 25,
        color: bgColor,
      });

      values.forEach((value: string, index: number) => {
        addText(
          value,
          margin + index * cellWidth + 5,
          yPos,
          helveticaFont,
          10,
          black
        );

        if (index < values.length - 1) {
          drawLine(
            margin + (index + 1) * cellWidth,
            yPos - 5,
            margin + (index + 1) * cellWidth,
            yPos + 20,
            0.5,
            mediumGray
          );
        }
      });

      return yPos - 30;
    };

    const addSectionHeader = (text: string, yPos: number): number => {
      yPos = checkForNewPage(yPos, 100);

      for (let i: number = 0; i < 5; i++) {
        const opacity: number = 0.8 - i * 0.15;
        page.drawRectangle({
          x: margin - 10 + i,
          y: yPos - 5 - i,
          width: width - 2 * margin + 20 - i * 2,
          height: 30,
          color: primaryBlue,
          opacity: opacity > 0 ? opacity : 0.1,
        });
      }

      page.drawRectangle({
        x: margin - 15,
        y: yPos - 5,
        width: 5,
        height: 30,
        color: orange,
      });

      addText(text, margin, yPos, helveticaBoldFont, 16, white);

      page.drawCircle({
        x: width - margin - 15,
        y: yPos + 10,
        size: 6,
        color: orange,
      });

      return yPos - 40;
    };

    const addDataRow = (
      label: string,
      value: string,
      yPos: number,
      rowIndex: number
    ): number => {
      yPos = checkForNewPage(yPos, 30);

      const bgColor: RGB = rowIndex % 2 === 0 ? lightGray : white;
      page.drawRectangle({
        x: margin - 5,
        y: yPos - 5,
        width: width - 2 * margin + 10,
        height: 20,
        color: bgColor,
        borderColor: mediumGray,
        borderWidth: 0.5,
      });

      page.drawCircle({
        x: margin,
        y: yPos + 5,
        size: 3,
        color: teal,
      });

      addText(`${label}:`, margin + 10, yPos, helveticaBoldFont, 11, black);
      addText(value, margin + 150, yPos, helveticaFont, 11, primaryBlue);
      return yPos - 25;
    };

    const addFooter = (pageObj: PDFPage): void => {
      const { width }: { width: number } = pageObj.getSize();

      pageObj.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 30,
        color: primaryBlue,
      });

      pageObj.drawText(
        "Health Profile Generated on " + new Date().toLocaleDateString(),
        {
          x: margin,
          y: 10,
          font: helveticaFont,
          size: 10,
          color: white,
        }
      );

      const pageIndex: number = pdfDoc
        .getPageIndices()
        .indexOf(pdfDoc.getPages().indexOf(pageObj));
      pageObj.drawText(`Page ${pageIndex + 1} of ${pdfDoc.getPageCount()}`, {
        x: width - margin - 60,
        y: 10,
        font: helveticaFont,
        size: 10,
        color: white,
      });

      for (let i: number = 0; i < 3; i++) {
        pageObj.drawCircle({
          x: width / 2 - 15 + i * 15,
          y: 15,
          size: 5,
          color: teal,
        });
      }
    };

    const user: UserData["data"] = userData.data;

    y = addSectionHeader("Personal Information", y);
    let rowIndex: number = 0;
    y = addDataRow("Name", `${user.firstName} ${user.lastName}`, y, rowIndex++);
    y = addDataRow("Age", `${user.age}`, y, rowIndex++);
    y = addDataRow("Gender", `${user.gender}`, y, rowIndex++);
    y = addDataRow("Blood Group", `${user.bloodGroup}`, y, rowIndex++);
    y = addDataRow(
      "Date of Birth",
      `${new Date(user.dateOfBirth).toLocaleDateString()}`,
      y,
      rowIndex++
    );
    y = addDataRow("Email", `${user.email}`, y, rowIndex++);
    y = addDataRow("Phone", `${user.contactDetails.phone}`, y, rowIndex++);
    y = addDataRow(
      "Emergency Contact",
      `${user.contactDetails.emergencyContact}`,
      y,
      rowIndex++
    );
    if (user.governmentId) {
      y = addDataRow("Government ID", `${user.governmentId}`, y, rowIndex++);
    }
    y -= 10;

    y = addSectionHeader("Address", y);
    rowIndex = 0;
    y = addDataRow("Village", `${user.address.village}`, y, rowIndex++);
    y = addDataRow("District", `${user.address.district}`, y, rowIndex++);
    y = addDataRow("State", `${user.address.state}`, y, rowIndex++);
    y = addDataRow("Pincode", `${user.address.pincode}`, y, rowIndex++);
    y -= 10;

    if (user.subscriptionPlan) {
      y = addSectionHeader("Subscription Details", y);
      rowIndex = 0;
      y = addDataRow("Plan", `${user.subscriptionPlan}`, y, rowIndex++);
      if (user.subscriptionAmount) {
        y = addDataRow(
          "Amount",
          `Rs. ${user.subscriptionAmount}`,
          y,
          rowIndex++
        );
      }

      if (user.subscriptionBenefits && user.subscriptionBenefits.length > 0) {
        y = addDataRow("Benefits", "", y, rowIndex++);
        user.subscriptionBenefits.forEach((benefit: string) => {
          y = checkForNewPage(y, 30);
          addText(
            `• ${benefit}`,
            margin + 150,
            y,
            helveticaFont,
            11,
            primaryBlue
          );
          y -= 20;
        });
      }
      y -= 10;
    }

    y = addSectionHeader("Chronic Conditions", y);

    if (user.chronicConditions && user.chronicConditions.length > 0) {
      const conditionHeaders: string[] = [
        "Condition",
        "Diagnosed Date",
        "Severity",
        "Status",
        "Management",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(conditionHeaders, y, tableWidth);

      const getSeverityColor = (severity: string): RGB => {
        switch (severity.toLowerCase()) {
          case "high":
          case "severe":
            return rgb(0.9, 0.2, 0.2);
          case "medium":
          case "moderate":
            return orange;
          default:
            return rgb(0.2, 0.7, 0.2);
        }
      };

      user.chronicConditions.forEach(
        (condition: ChronicCondition, index: number) => {
          y = checkForNewPage(y, 40);

          const severityColor: RGB = getSeverityColor(condition.severity);
          const severityText: string = `• ${condition.severity}`;

          const values: string[] = [
            condition.name,
            new Date(condition.diagnosedDate).toLocaleDateString(),
            severityText,
            condition.status,
            condition.managementPlan.length > 20
              ? condition.managementPlan.substring(0, 20) + "..."
              : condition.managementPlan,
          ];

          y = addTableRow(values, y, tableWidth, index);

          page.drawCircle({
            x: margin + (tableWidth / 5) * 2 + 5,
            y: y + 25,
            size: 5,
            color: severityColor,
          });
        }
      );
    } else {
      y = addDataRow("Note", "No chronic conditions recorded.", y, 0);
    }
    y -= 10;

    if (user.pastMedicalConditions && user.pastMedicalConditions.length > 0) {
      y = addSectionHeader("Past Medical Conditions", y);

      const pastConditionHeaders: string[] = [
        "Condition",
        "Start Date",
        "End Date",
        "Treatment",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(pastConditionHeaders, y, tableWidth);

      user.pastMedicalConditions.forEach(
        (condition: PastMedicalCondition, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            condition.name,
            new Date(condition.startDate).toLocaleDateString(),
            new Date(condition.endDate).toLocaleDateString(),
            condition.treatment,
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
      y -= 10;
    }

    y = addSectionHeader("Allergies", y);

    if (user.allergies && user.allergies.length > 0) {
      const allergyHeaders: string[] = [
        "Allergen",
        "Type",
        "Severity",
        "Reaction",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(allergyHeaders, y, tableWidth);

      user.allergies.forEach((allergy: Allergy, index: number) => {
        y = checkForNewPage(y, 40);

        const values: string[] = [
          allergy.allergen,
          allergy.type,
          allergy.severity,
          allergy.reaction.length > 25
            ? allergy.reaction.substring(0, 25) + "..."
            : allergy.reaction,
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
    } else {
      y = addDataRow("Note", "No allergies recorded.", y, 0);
    }
    y -= 10;

    y = addSectionHeader("Current Medications", y);

    if (user.currentMedications && user.currentMedications.length > 0) {
      const medicationHeaders: string[] = [
        "Medication",
        "Dosage",
        "Prescribed By",
        "Schedule",
        "Next Refill",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(medicationHeaders, y, tableWidth);

      user.currentMedications.forEach(
        (medication: Medication, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            medication.name,
            medication.dosage,
            medication.prescribedBy,
            medication.schedule,
            medication.nextRefillDate
              ? new Date(medication.nextRefillDate).toLocaleDateString()
              : "N/A",
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
    } else {
      y = addDataRow("Note", "No current medications recorded.", y, 0);
    }
    y -= 10;

    if (user.previousMedications && user.previousMedications.length > 0) {
      y = addSectionHeader("Previous Medications", y);

      const prevMedHeaders: string[] = [
        "Medication",
        "Dosage",
        "Prescribed By",
        "Start Date",
        "End Date",
        "Reason for Stopping",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(prevMedHeaders, y, tableWidth);

      user.previousMedications.forEach(
        (medication: Medication, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            medication.name,
            medication.dosage,
            medication.prescribedBy,
            medication.startDate
              ? new Date(medication.startDate).toLocaleDateString()
              : "N/A",
            medication.endDate
              ? new Date(medication.endDate).toLocaleDateString()
              : "N/A",
            medication.reasonForStopping || "N/A",
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
      y -= 10;
    }

    if (user.medicinePackages && user.medicinePackages.length > 0) {
      y = addSectionHeader("Medicine Packages", y);

      user.medicinePackages.forEach((pkg: MedicinePackage) => {
        y = checkForNewPage(y, 120);

        page.drawRectangle({
          x: margin,
          y: y - 100,
          width: width - 2 * margin,
          height: 100,
          color: lightBlue,
          borderColor: primaryBlue,
          borderWidth: 1,
        });

        page.drawRectangle({
          x: margin,
          y: y,
          width: width - 2 * margin,
          height: 25,
          color: primaryBlue,
        });

        addText(pkg.name, margin + 10, y + 7, helveticaBoldFont, 14, white);

        const statusColor: RGB = pkg.active ? teal : rgb(0.7, 0.7, 0.7);
        page.drawCircle({
          x: width - margin - 20,
          y: y + 12,
          size: 8,
          color: statusColor,
        });

        addText(
          pkg.active ? "Active" : "Inactive",
          width - margin - 60,
          y + 7,
          helveticaFont,
          12,
          statusColor
        );

        y -= 25;
        addText(
          `Monthly Cost: Rs. ${pkg.monthlyCost}`,
          margin + 20,
          y,
          helveticaFont,
          12,
          black
        );
        y -= 15;
        addText(
          `Next Delivery: ${new Date(
            pkg.nextDeliveryDate
          ).toLocaleDateString()}`,
          margin + 20,
          y,
          helveticaFont,
          12,
          black
        );
        y -= 15;
        addText(
          `Supply Remaining: ${pkg.supplyRemaining} days`,
          margin + 20,
          y,
          helveticaFont,
          12,
          black
        );
        y -= 15;

        if (pkg.medications && pkg.medications.length > 0) {
          addText("Medications:", margin + 20, y, helveticaBoldFont, 12, black);
          y -= 15;

          pkg.medications.forEach((med: string) => {
            addText(`• ${med}`, margin + 40, y, helveticaFont, 11, black);
            y -= 15;
          });
        }

        y -= 10;
      });
      y -= 10;
    }

    y = addSectionHeader("Vaccination Records", y);

    if (user.vaccinationRecords && user.vaccinationRecords.length > 0) {
      const vaccineHeaders: string[] = [
        "Vaccine",
        "Type",
        "Date",
        "Doctor",
        "Location",
        "Batch #",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(vaccineHeaders, y, tableWidth);

      user.vaccinationRecords.forEach(
        (vaccine: VaccinationRecord, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            vaccine.vaccineName,
            vaccine.type,
            new Date(vaccine.date).toLocaleDateString(),
            vaccine.doctorName,
            vaccine.location,
            vaccine.batchNumber,
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
    } else {
      y = addDataRow("Note", "No vaccination records available.", y, 0);
    }
    y -= 10;

    if (user.upcomingVaccinations && user.upcomingVaccinations.length > 0) {
      y = addSectionHeader("Upcoming Vaccinations", y);

      const upcomingVaccineHeaders: string[] = [
        "Vaccine",
        "Due Date",
        "Free Under Govt Scheme",
        "Notes",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(upcomingVaccineHeaders, y, tableWidth);

      user.upcomingVaccinations.forEach(
        (vaccine: UpcomingVaccination, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            vaccine.vaccineName,
            new Date(vaccine.dueDate).toLocaleDateString(),
            vaccine.freeUnderGovtScheme ? "Yes" : "No",
            vaccine.notes || "",
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
      y -= 10;
    }

    if (
      user.recommendedVaccinations &&
      user.recommendedVaccinations.length > 0
    ) {
      y = addSectionHeader("Recommended Vaccinations", y);

      const recVaccineHeaders: string[] = [
        "Vaccine",
        "Description",
        "Priority",
        "Free Under Govt Scheme",
        "Warning",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(recVaccineHeaders, y, tableWidth);

      user.recommendedVaccinations.forEach(
        (vaccine: RecommendedVaccination, index: number) => {
          y = checkForNewPage(y, 40);

          const values: string[] = [
            vaccine.vaccineName,
            vaccine.description.length > 20
              ? vaccine.description.substring(0, 20) + "..."
              : vaccine.description,
            vaccine.priority,
            vaccine.freeUnderGovtScheme ? "Yes" : "No",
            vaccine.warning || "",
          ];

          y = addTableRow(values, y, tableWidth, index);
        }
      );
      y -= 10;
    }

    y = addSectionHeader("Hospital Visits", y);

    if (user.hospitalVisits && user.hospitalVisits.length > 0) {
      const visitHeaders: string[] = [
        "Hospital",
        "Type",
        "Date",
        "Doctor",
        "Specialization",
        "Diagnosis",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(visitHeaders, y, tableWidth);

      user.hospitalVisits.forEach((visit: HospitalVisit, index: number) => {
        y = checkForNewPage(y, 40);

        const values: string[] = [
          visit.hospitalName,
          visit.hospitalType,
          new Date(visit.date).toLocaleDateString(),
          visit.doctorName,
          visit.specialization,
          visit.diagnosis.length > 20
            ? visit.diagnosis.substring(0, 20) + "..."
            : visit.diagnosis,
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
    } else {
      y = addDataRow("Note", "No hospital visits recorded.", y, 0);
    }
    y -= 10;

    y = addSectionHeader("Surgeries", y);

    if (user.surgeries && user.surgeries.length > 0) {
      const surgeryHeaders: string[] = [
        "Surgery",
        "Date",
        "Hospital",
        "Surgeon",
        "Details",
        "Follow-up",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(surgeryHeaders, y, tableWidth);

      user.surgeries.forEach((surgery: Surgery, index: number) => {
        y = checkForNewPage(y, 40);

        const values: string[] = [
          surgery.name,
          new Date(surgery.date).toLocaleDateString(),
          surgery.hospital,
          surgery.surgeon,
          surgery.details.length > 15
            ? surgery.details.substring(0, 15) + "..."
            : surgery.details,
          new Date(surgery.followUp).toLocaleDateString(),
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
    } else {
      y = addDataRow("Note", "No surgeries recorded.", y, 0);
    }
    y -= 10;

    if (user.healthReports && user.healthReports.length > 0) {
      y = addSectionHeader("Health Reports", y);

      const reportHeaders: string[] = [
        "Type",
        "Summary",
        "Period",
        "First Reading",
        "Latest Reading",
        "Improvement",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(reportHeaders, y, tableWidth);

      user.healthReports.forEach((report: HealthReport, index: number) => {
        y = checkForNewPage(y, 40);

        const period: string = `${new Date(
          report.startDate
        ).toLocaleDateString()} - ${new Date(
          report.endDate
        ).toLocaleDateString()}`;
        const improvementText: string = report.improvement
          ? `Yes (${report.improvementValue || ""})`
          : "No";

        const values: string[] = [
          report.type,
          report.summary,
          period,
          report.firstReading,
          report.latestReading,
          improvementText,
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
      y -= 10;
    }

    y = addSectionHeader("Family Details", y);

    if (user.familyDetails && user.familyDetails.length > 0) {
      const familyHeaders: string[] = [
        "Name",
        "Relationship",
        "Age",
        "Covered Under Insurance",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(familyHeaders, y, tableWidth);

      user.familyDetails.forEach((family: FamilyDetail, index: number) => {
        y = checkForNewPage(y, 40);

        const values: string[] = [
          family.name,
          family.relationship,
          family.age.toString(),
          family.coveredUnderInsurance ? "Yes" : "No",
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
    } else {
      y = addDataRow("Note", "No family details recorded.", y, 0);
    }
    y -= 10;

    y = addSectionHeader("Insurance Information", y);

    if (user.insuranceCoverage) {
      y = checkForNewPage(y, 150);

      page.drawRectangle({
        x: margin,
        y: y - 120,
        width: width - 2 * margin,
        height: 120,
        color: lightBlue,
        borderColor: primaryBlue,
        borderWidth: 1,
        borderOpacity: 0.5,
      });

      page.drawRectangle({
        x: margin,
        y: y - 30,
        width: width - 2 * margin,
        height: 30,
        color: primaryBlue,
      });

      addText(
        "Insurance Card",
        margin + 10,
        y - 15,
        helveticaBoldFont,
        14,
        white
      );

      page.drawCircle({
        x: width - margin - 50,
        y: y - 15,
        size: 10,
        color: white,
      });

      y -= 40;
      addText(
        `Provider: ${user.insuranceProvider || "N/A"}`,
        margin + 20,
        y,
        helveticaBoldFont,
        12,
        black
      );
      y -= 15;
      addText(
        `Policy Number: ${user.insurancePolicyNumber || "N/A"}`,
        margin + 20,
        y,
        helveticaFont,
        12,
        black
      );
      y -= 15;
      addText(
        `Type: ${user.insuranceType || "N/A"}`,
        margin + 20,
        y,
        helveticaFont,
        12,
        black
      );
      y -= 15;

      const coverageAmount: number = user.insuranceCoverageAmount;
      const usedAmount: number = user.insuranceUsed;
      const remainingPercentage: number = Math.max(
        0,
        100 - (usedAmount / coverageAmount) * 100
      );

      addText(
        `Coverage: Rs. ${coverageAmount.toLocaleString()}`,
        margin + 20,
        y,
        helveticaFont,
        12,
        black
      );
      y -= 15;
      addText(
        `Used: Rs. ${usedAmount.toLocaleString()}`,
        margin + 20,
        y,
        helveticaFont,
        12,
        black
      );
      y -= 15;

      const barWidth: number = 200;
      const usedWidth: number = barWidth * (usedAmount / coverageAmount);

      page.drawRectangle({
        x: margin + 100,
        y: y - 5,
        width: barWidth,
        height: 10,
        color: lightGray,
        borderColor: mediumGray,
        borderWidth: 0.5,
      });

      page.drawRectangle({
        x: margin + 100,
        y: y - 5,
        width: usedWidth,
        height: 10,
        color:
          remainingPercentage < 20
            ? rgb(0.9, 0.2, 0.2)
            : remainingPercentage < 50
            ? orange
            : teal,
      });

      addText(
        `Valid Until: ${new Date(
          user.insuranceValidUntil
        ).toLocaleDateString()}`,
        margin + 20,
        y - 20,
        helveticaFont,
        12,
        black
      );
      y -= 40;
    } else {
      y = addDataRow("Note", "No insurance coverage recorded.", y, 0);
      y -= 10;
    }

    y = addSectionHeader("Government Schemes", y);

    if (user.govtSchemes && user.govtSchemes.length > 0) {
      const schemeHeaders: string[] = [
        "Scheme",
        "Status",
        "Card Number",
        "Valid Until",
        "Coverage",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(schemeHeaders, y, tableWidth);

      user.govtSchemes.forEach((scheme: GovernmentScheme, index: number) => {
        y = checkForNewPage(y, 40);

        const values: string[] = [
          scheme.name,
          scheme.status,
          scheme.cardNumber,
          new Date(scheme.validUntil).toLocaleDateString(),
          scheme.coverageDetails.length > 20
            ? scheme.coverageDetails.substring(0, 20) + "..."
            : scheme.coverageDetails,
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
    } else {
      y = addDataRow("Note", "No government schemes recorded.", y, 0);
    }

    if (user.appointments && user.appointments.length > 0) {
      y = addSectionHeader("Upcoming Appointments", y);

      const appointmentHeaders: string[] = [
        "Date",
        "Time",
        "Doctor",
        "Hospital",
        "Purpose",
      ];
      const tableWidth: number = width - 2 * margin;
      y = createTableHeader(appointmentHeaders, y, tableWidth);

      user.appointments.forEach((appointment: Appointment, index: number) => {
        y = checkForNewPage(y, 40);

        const appointmentDate: Date = new Date(appointment.date);
        const values: string[] = [
          appointmentDate.toLocaleDateString(),
          appointment.time || "N/A",
          appointment.doctorName || "N/A",
          appointment.hospitalName || "N/A",
          appointment.purpose || "N/A",
        ];

        y = addTableRow(values, y, tableWidth, index);
      });
      y -= 10;
    }

    pdfDoc.getPages().forEach((pageObj: PDFPage) => {
      addFooter(pageObj);
    });

    const pdfBytes: Uint8Array = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error: unknown) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id;

    const userData: UserData = await fetchUserData(id);

    // Sanitize userData by replacing ₹ with Rs.
    const sanitizedUserData: UserData = JSON.parse(
      JSON.stringify(userData).replace(/₹/g, "Rs.")
    ) as UserData;

    const pdfBuffer: Buffer = await generatePDF(sanitizedUserData);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="health_profile_${id}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate PDF",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
