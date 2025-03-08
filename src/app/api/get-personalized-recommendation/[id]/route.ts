import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

// Function to fetch user data
async function fetchUserData(userId: string) {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/get-user-data/${userId}`
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

// Function to generate health recommendations
async function generateHealthRecommendations(userData: any) {
  const prompt = `
You are a health advisor analyzing a user's health profile. Based on the following user data, provide a detailed health recommendation in a structured and easy-to-read format. Break down the recommendations into sections and use bullet points for clarity. Ensure the recommendations are actionable and prioritize the user's health needs.

**User Data:**
- **Name:** ${userData.firstName} ${userData.lastName}
- **Age:** ${userData.age}
- **Gender:** ${userData.gender}
- **Blood Group:** ${userData.bloodGroup}
- **Address:** ${userData.address.village}, ${userData.address.district}, ${userData.address.state}, ${userData.address.pincode}
- **Contact Details:** Phone: ${userData.contactDetails.phone}, Email: ${userData.contactDetails.email}, Emergency Contact: ${userData.contactDetails.emergencyContact}
- **Chronic Conditions:** ${userData.chronicConditions.map((condition: any) => `${condition.name} (Diagnosed: ${condition.diagnosedDate}, Severity: ${condition.severity}, Status: ${condition.status})`).join(", ")}
- **Allergies:** ${userData.allergies.map((allergy: any) => `${allergy.allergen} (Type: ${allergy.type}, Severity: ${allergy.severity}, Reaction: ${allergy.reaction})`).join(", ")}
- **Current Medications:** ${userData.currentMedications.map((med: any) => `${med.name} (Dosage: ${med.dosage}, Prescribed By: ${med.prescribedBy}, Next Refill: ${med.nextRefillDate})`).join(", ")}
- **Health Reports:** ${userData.healthReports.map((report: any) => `${report.type}: ${report.latestReading} (Improvement: ${report.improvement ? "Yes" : "No"}, Improvement Value: ${report.improvementValue})`).join(", ")}
- **Upcoming Vaccinations:** ${userData.upcomingVaccinations.map((vaccine: any) => `${vaccine.vaccineName} (Due Date: ${vaccine.dueDate}, Notes: ${vaccine.notes})`).join(", ")}
- **Recommended Vaccinations:** ${userData.recommendedVaccinations.map((vaccine: any) => `${vaccine.vaccineName} (Priority: ${vaccine.priority}, Warning: ${vaccine.warning})`).join(", ")}
- **Insurance Coverage:** ${userData.insuranceCoverage ? "Yes" : "No"} (Coverage Amount: ${userData.insuranceCoverageAmount}, Valid Until: ${userData.insuranceValidUntil})
- **Subscription Benefits:** ${userData.subscriptionBenefits.join(", ")}
- **Family Details:** ${userData.familyDetails.map((member: any) => `${member.name} (Relationship: ${member.relationship}, Age: ${member.age}, Covered Under Insurance: ${member.coveredUnderInsurance ? "Yes" : "No"})`).join(", ")}
- **Government Schemes:** ${userData.govtSchemes.map((scheme: any) => `${scheme.name} (Status: ${scheme.status}, Coverage: ${scheme.coverageDetails})`).join(", ")}
- **Past Medical Conditions:** ${userData.pastMedicalConditions.map((condition: any) => `${condition.name} (Treatment: ${condition.treatment}, Dates: ${condition.startDate} to ${condition.endDate})`).join(", ")}
- **Hospital Visits:** ${userData.hospitalVisits.map((visit: any) => `${visit.hospitalName} (Date: ${visit.date}, Doctor: ${visit.doctorName}, Diagnosis: ${visit.diagnosis})`).join(", ")}
- **Surgeries:** ${userData.surgeries.map((surgery: any) => `${surgery.name} (Date: ${surgery.date}, Surgeon: ${surgery.surgeon}, Details: ${surgery.details})`).join(", ")}
- **Medicine Packages:** ${userData.medicinePackages.map((pkg: any) => `${pkg.name} (Active: ${pkg.active ? "Yes" : "No"}, Next Delivery: ${pkg.nextDeliveryDate}, Medications: ${pkg.medications.join(", ")})`).join(", ")}
- **Vaccination Records:** ${userData.vaccinationRecords.map((record: any) => `${record.vaccineName} (Date: ${record.date}, Location: ${record.location})`).join(", ")}

**Instructions:**
1. **Health Summary:** Provide a brief summary of the user's current health status based on their chronic conditions, medications, and recent health reports.
2. **Focus Areas:** Highlight 2-3 key areas the user should focus on to improve their health (e.g., diet, exercise, medication adherence).
3. **Doctor Consultation:** Recommend whether the user should consult a doctor again and specify the reason (e.g., follow-up for chronic conditions, new symptoms, or upcoming vaccinations).
4. **Preventive Measures:** Suggest preventive measures such as vaccinations, lifestyle changes, or regular health checkups.
5. **Medication Management:** Provide advice on managing current medications, including reminders for refills or potential side effects.
6. **Insurance & Benefits:** Advise on how the user can maximize their insurance coverage and subscription benefits.
7. **Family Health:** Provide recommendations for the user's family members based on their age and health coverage.
8. **Government Schemes:** Suggest how the user can utilize government health schemes like Ayushman Bharat.

**Output Format:**
- Use clear headings for each section.
- Use bullet points for recommendations.
- Keep the language simple and actionable.
- Avoid medical jargon unless necessary.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const userData = await fetchUserData(id);
    const recommendations = await generateHealthRecommendations(userData);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}