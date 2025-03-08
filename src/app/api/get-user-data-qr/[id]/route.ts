import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Function to fetch user data
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/get-user-data/${userId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Function to generate PDF from user data
async function generatePDF(userData: any) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();

    // Set up fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    // Set up page dimensions
    const { width, height } = page.getSize();
    const margin = 50;
    let y = height - margin;

    // Helper function to add text
    const addText = (
      text: string,
      x: number,
      y: number,
      font: any,
      size: number,
      color = rgb(0, 0, 0)
    ) => {
      page.drawText(text, { x, y, font, size, color });
    };

    // Header with title
    addText("Health Profile", margin, y, helveticaBoldFont, 25);
    y -= 30;

    // User basic information
    addText("Personal Information", margin, y, helveticaBoldFont, 16);
    y -= 20;

    const user = userData.data;

    // Personal details section
    addText(
      `Name: ${user.firstName} ${user.lastName}`,
      margin,
      y,
      helveticaFont,
      12
    );
    y -= 15;
    addText(`Age: ${user.age}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(`Gender: ${user.gender}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(`Blood Group: ${user.bloodGroup}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(
      `Date of Birth: ${new Date(user.dateOfBirth).toLocaleDateString()}`,
      margin,
      y,
      helveticaFont,
      12
    );
    y -= 15;
    addText(`Email: ${user.email}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(
      `Phone: ${user.contactDetails.phone}`,
      margin,
      y,
      helveticaFont,
      12
    );
    y -= 15;
    addText(
      `Emergency Contact: ${user.contactDetails.emergencyContact}`,
      margin,
      y,
      helveticaFont,
      12
    );
    y -= 30;

    // Address section
    addText("Address", margin, y, helveticaBoldFont, 16);
    y -= 20;
    addText(`Village: ${user.address.village}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(`District: ${user.address.district}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(`State: ${user.address.state}`, margin, y, helveticaFont, 12);
    y -= 15;
    addText(`Pincode: ${user.address.pincode}`, margin, y, helveticaFont, 12);
    y -= 30;

    // Medical conditions
    addText("Chronic Conditions", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.chronicConditions && user.chronicConditions.length > 0) {
      user.chronicConditions.forEach((condition: any) => {
        addText(`Condition: ${condition.name}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Diagnosed: ${new Date(
            condition.diagnosedDate
          ).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Severity: ${condition.severity}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Status: ${condition.status}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Management Plan: ${condition.managementPlan}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText("No chronic conditions recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Allergies
    addText("Allergies", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.allergies && user.allergies.length > 0) {
      user.allergies.forEach((allergy: any) => {
        addText(`Allergen: ${allergy.allergen}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Type: ${allergy.type}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Severity: ${allergy.severity}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Reaction: ${allergy.reaction}`, margin, y, helveticaFont, 12);
        y -= 20;
      });
    } else {
      addText("No allergies recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Current medications
    addText("Current Medications", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.currentMedications && user.currentMedications.length > 0) {
      user.currentMedications.forEach((medication: any) => {
        addText(`Medication: ${medication.name}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Dosage: ${medication.dosage}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Prescribed By: ${medication.prescribedBy}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Schedule: ${medication.schedule}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Next Refill: ${new Date(
            medication.nextRefillDate
          ).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText("No current medications recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Add a new page for more information
    page = pdfDoc.addPage(); // Add a new page
    y = height - margin; // Reset y position for the new page

    // Vaccination records
    addText("Vaccination Records", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.vaccinationRecords && user.vaccinationRecords.length > 0) {
      user.vaccinationRecords.forEach((vaccine: any) => {
        addText(
          `Vaccine: ${vaccine.vaccineName}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Type: ${vaccine.type}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Date: ${new Date(vaccine.date).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Doctor: ${vaccine.doctorName}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Location: ${vaccine.location}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Batch Number: ${vaccine.batchNumber}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText(
        "No vaccination records available.",
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 20;
    }

    // Hospital visits
    addText("Hospital Visits", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.hospitalVisits && user.hospitalVisits.length > 0) {
      user.hospitalVisits.forEach((visit: any) => {
        addText(
          `Hospital: ${visit.hospitalName}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Type: ${visit.hospitalType}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Date: ${new Date(visit.date).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Doctor: ${visit.doctorName}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Specialization: ${visit.specialization}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Diagnosis: ${visit.diagnosis}`, margin, y, helveticaFont, 12);
        y -= 20;
      });
    } else {
      addText("No hospital visits recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Surgeries
    addText("Surgeries", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.surgeries && user.surgeries.length > 0) {
      user.surgeries.forEach((surgery: any) => {
        addText(`Surgery: ${surgery.name}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Date: ${new Date(surgery.date).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Hospital: ${surgery.hospital}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Surgeon: ${surgery.surgeon}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Details: ${surgery.details}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Follow-up: ${new Date(surgery.followUp).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText("No surgeries recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Add a new page for family details and insurance
    page = pdfDoc.addPage(); // Add a new page
    y = height - margin; // Reset y position for the new page

    // Family details
    addText("Family Details", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.familyDetails && user.familyDetails.length > 0) {
      user.familyDetails.forEach((family: any) => {
        addText(`Name: ${family.name}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Relationship: ${family.relationship}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(`Age: ${family.age}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Covered Under Insurance: ${
            family.coveredUnderInsurance ? "Yes" : "No"
          }`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText("No family details recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Insurance information
    addText("Insurance Information", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.insuranceCoverage) {
      addText(
        `Provider: ${user.insuranceProvider}`,
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 15;
      addText(
        `Policy Number: ${user.insurancePolicyNumber}`,
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 15;
      addText(`Type: ${user.insuranceType}`, margin, y, helveticaFont, 12);
      y -= 15;
      addText(
        `Coverage Amount: Rs. ${user.insuranceCoverageAmount.toLocaleString()}`,
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 15;
      addText(
        `Used Amount: Rs. ${user.insuranceUsed.toLocaleString()}`,
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 15;
      addText(
        `Valid Until: ${new Date(
          user.insuranceValidUntil
        ).toLocaleDateString()}`,
        margin,
        y,
        helveticaFont,
        12
      );
      y -= 20;
    } else {
      addText("No insurance coverage recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Government schemes
    addText("Government Schemes", margin, y, helveticaBoldFont, 16);
    y -= 20;

    if (user.govtSchemes && user.govtSchemes.length > 0) {
      user.govtSchemes.forEach((scheme: any) => {
        addText(`Scheme: ${scheme.name}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(`Status: ${scheme.status}`, margin, y, helveticaFont, 12);
        y -= 15;
        addText(
          `Card Number: ${scheme.cardNumber}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Valid Until: ${new Date(scheme.validUntil).toLocaleDateString()}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Coverage Details: ${scheme.coverageDetails}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 15;
        addText(
          `Eligible Facilities: ${scheme.eligibleFacilities}`,
          margin,
          y,
          helveticaFont,
          12
        );
        y -= 20;
      });
    } else {
      addText("No government schemes recorded.", margin, y, helveticaFont, 12);
      y -= 20;
    }

    // Finalize the PDF
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch user data
    const userData = await fetchUserData(id);

    // Replace ₹ with Rs. in the data
    const sanitizedUserData = JSON.parse(
      JSON.stringify(userData).replace(/₹/g, "Rs.")
    );

    // Generate PDF
    const pdfBuffer = await generatePDF(sanitizedUserData);

    // Return the PDF as a downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="health_profile_${id}.pdf"`,
      },
    });
  } catch (error) {
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
