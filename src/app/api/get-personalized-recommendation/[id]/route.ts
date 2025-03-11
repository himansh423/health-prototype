import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Define interfaces for the user data structure
interface ContactDetails {
  phone: string;
  email: string;
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
  nextRefillDate: string;
}

interface HealthReport {
  type: string;
  latestReading: string;
  improvement: boolean;
  improvementValue: string;
}

interface Vaccination {
  vaccineName: string;
  dueDate: string;
  notes: string;
}

interface RecommendedVaccination {
  vaccineName: string;
  priority: string;
  warning: string;
}

interface FamilyMember {
  name: string;
  relationship: string;
  age: number;
  coveredUnderInsurance: boolean;
}

interface GovernmentScheme {
  name: string;
  status: string;
  coverageDetails: string;
}

interface PastMedicalCondition {
  name: string;
  treatment: string;
  startDate: string;
  endDate: string;
}

interface HospitalVisit {
  hospitalName: string;
  date: string;
  doctorName: string;
  diagnosis: string;
}

interface Surgery {
  name: string;
  date: string;
  surgeon: string;
  details: string;
}

interface MedicinePackage {
  name: string;
  active: boolean;
  nextDeliveryDate: string;
  medications: string[];
}

interface VaccinationRecord {
  vaccineName: string;
  date: string;
  location: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: Address;
  contactDetails: ContactDetails;
  chronicConditions: ChronicCondition[];
  allergies: Allergy[];
  currentMedications: Medication[];
  healthReports: HealthReport[];
  upcomingVaccinations: Vaccination[];
  recommendedVaccinations: RecommendedVaccination[];
  insuranceCoverage: boolean;
  insuranceCoverageAmount: string;
  insuranceValidUntil: string;
  subscriptionBenefits: string[];
  familyDetails: FamilyMember[];
  govtSchemes: GovernmentScheme[];
  pastMedicalConditions: PastMedicalCondition[];
  hospitalVisits: HospitalVisit[];
  surgeries: Surgery[];
  medicinePackages: MedicinePackage[];
  vaccinationRecords: VaccinationRecord[];
}

// Interface for API response
interface FetchUserDataResponse {
  success: boolean;
  data: UserData;
}

// Initialize GoogleGenerativeAI with type-safe environment variable
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

// Function to fetch user data with proper typing
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const res = await axios.get<FetchUserDataResponse>(
      `https://health-prototype.vercel.app/api/get-user-data/${userId}`
    );
    if (!res.data.success) {
      throw new Error("Failed to fetch user data");
    }
    return res.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Export typed GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response | NextResponse> {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  try {
    const id = (await params).id;
    const userData: UserData = await fetchUserData(id);

    // Create the prompt with typed template literal
    const prompt: string = `
You are a health advisor analyzing a user's health profile. Based on the following user data, provide a detailed health recommendation in a structured and easy-to-read format. Break down the recommendations into sections and use bullet points for clarity. Ensure the recommendations are actionable and prioritize the user's health needs.

User Data:
- Name: ${userData.firstName} ${userData.lastName}
- Age: ${userData.age}
- Gender: ${userData.gender}
- Blood Group: ${userData.bloodGroup}
- Address: ${userData.address.village}, ${userData.address.district}, ${
      userData.address.state
    }, ${userData.address.pincode}
- Contact Details: Phone: ${userData.contactDetails.phone}, Email: ${
      userData.contactDetails.email
    }, Emergency Contact: ${userData.contactDetails.emergencyContact}
- Chronic Conditions: ${userData.chronicConditions
      .map(
        (condition) =>
          `${condition.name} (Diagnosed: ${condition.diagnosedDate}, Severity: ${condition.severity}, Status: ${condition.status})`
      )
      .join(", ")}
- Allergies: ${userData.allergies
      .map(
        (allergy) =>
          `${allergy.allergen} (Type: ${allergy.type}, Severity: ${allergy.severity}, Reaction: ${allergy.reaction})`
      )
      .join(", ")}
- Current Medications: ${userData.currentMedications
      .map(
        (med) =>
          `${med.name} (Dosage: ${med.dosage}, Prescribed By: ${med.prescribedBy}, Next Refill: ${med.nextRefillDate})`
      )
      .join(", ")}
- Health Reports: ${userData.healthReports
      .map(
        (report) =>
          `${report.type}: ${report.latestReading} (Improvement: ${
            report.improvement ? "Yes" : "No"
          }, Improvement Value: ${report.improvementValue})`
      )
      .join(", ")}
- Upcoming Vaccinations: ${userData.upcomingVaccinations
      .map(
        (vaccine) =>
          `${vaccine.vaccineName} (Due Date: ${vaccine.dueDate}, Notes: ${vaccine.notes})`
      )
      .join(", ")}
- Recommended Vaccinations: ${userData.recommendedVaccinations
      .map(
        (vaccine) =>
          `${vaccine.vaccineName} (Priority: ${vaccine.priority}, Warning: ${vaccine.warning})`
      )
      .join(", ")}
- Insurance Coverage: ${
      userData.insuranceCoverage ? "Yes" : "No"
    } (Coverage Amount: ${userData.insuranceCoverageAmount}, Valid Until: ${
      userData.insuranceValidUntil
    })
- Subscription Benefits: ${userData.subscriptionBenefits.join(", ")}
- Family Details: ${userData.familyDetails
      .map(
        (member) =>
          `${member.name} (Relationship: ${member.relationship}, Age: ${
            member.age
          }, Covered Under Insurance: ${
            member.coveredUnderInsurance ? "Yes" : "No"
          })`
      )
      .join(", ")}
- Government Schemes: ${userData.govtSchemes
      .map(
        (scheme) =>
          `${scheme.name} (Status: ${scheme.status}, Coverage: ${scheme.coverageDetails})`
      )
      .join(", ")}
- Past Medical Conditions: ${userData.pastMedicalConditions
      .map(
        (condition) =>
          `${condition.name} (Treatment: ${condition.treatment}, Dates: ${condition.startDate} to ${condition.endDate})`
      )
      .join(", ")}
- Hospital Visits: ${userData.hospitalVisits
      .map(
        (visit) =>
          `${visit.hospitalName} (Date: ${visit.date}, Doctor: ${visit.doctorName}, Diagnosis: ${visit.diagnosis})`
      )
      .join(", ")}
- Surgeries: ${userData.surgeries
      .map(
        (surgery) =>
          `${surgery.name} (Date: ${surgery.date}, Surgeon: ${surgery.surgeon}, Details: ${surgery.details})`
      )
      .join(", ")}
- Medicine Packages: ${userData.medicinePackages
      .map(
        (pkg) =>
          `${pkg.name} (Active: ${pkg.active ? "Yes" : "No"}, Next Delivery: ${
            pkg.nextDeliveryDate
          }, Medications: ${pkg.medications.join(", ")})`
      )
      .join(", ")}
- Vaccination Records: ${userData.vaccinationRecords
      .map(
        (record) =>
          `${record.vaccineName} (Date: ${record.date}, Location: ${record.location})`
      )
      .join(", ")}

Instructions:
1. Health Summary: Provide a brief summary of the user's current health status based on their chronic conditions, medications, and recent health reports.
2. Focus Areas: Highlight 2-3 key areas the user should focus on to improve their health (e.g., diet, exercise, medication adherence).
3. Doctor Consultation: Recommend whether the user should consult a doctor again and specify the reason (e.g., follow-up for chronic conditions, new symptoms, or upcoming vaccinations).
4. Preventive Measures: Suggest preventive measures such as vaccinations, lifestyle changes, or regular health checkups.
5. Medication Management: Provide advice on managing current medications, including reminders for refills or potential side effects.
6. Insurance & Benefits: Advise on how the user can maximize their insurance coverage and subscription benefits.
7. Family Health: Provide recommendations for the user's family members based on their age and health coverage.
8. Government Schemes: Suggest how the user can utilize government health schemes like Ayushman Bharat.

Output Format:
- Use clear headings for each section without any markdown symbols like asterisks.
- Use bullet points for recommendations.
- Keep the language simple and actionable.
- Avoid medical jargon unless necessary.
- DO NOT use markdown formatting like ** for bold text. Instead, just write the headings in plain text.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const streamingResponse = await model.generateContentStream(prompt);

    // Handle streaming with proper async function typing
    (async (): Promise<void> => {
      try {
        for await (const chunk of streamingResponse.stream) {
          const text: string | undefined = chunk.text();
          if (text) {
            await writer.write(encoder.encode(text));
          }
        }
        await writer.close();
      } catch (error) {
        console.error("Error processing stream:", error);
        const errorMessage: string =
          "Error generating recommendations. Please try again.";
        await writer.write(encoder.encode(errorMessage));
        await writer.close();
      }
    })();

    // Return typed Response
    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
