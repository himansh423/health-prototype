import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import axios from "axios"

// Define interfaces for the user data structure
interface ContactDetails {
  phone: string
  email: string
  emergencyContact: string
}

interface Address {
  village: string
  district: string
  state: string
  pincode: string
}

interface ChronicCondition {
  name: string
  diagnosedDate: string
  severity: string
  status: string
}

interface Allergy {
  allergen: string
  type: string
  severity: string
  reaction: string
}

interface Medication {
  name: string
  dosage: string
  prescribedBy: string
  nextRefillDate: string
}

interface HealthReport {
  type: string
  latestReading: string
  improvement: boolean
  improvementValue: string
}

interface Vaccination {
  vaccineName: string
  dueDate: string
  notes: string
}

interface RecommendedVaccination {
  vaccineName: string
  priority: string
  warning: string
}

interface FamilyMember {
  name: string
  relationship: string
  age: number
  coveredUnderInsurance: boolean
}

interface GovernmentScheme {
  name: string
  status: string
  coverageDetails: string
}

interface PastMedicalCondition {
  name: string
  treatment: string
  startDate: string
  endDate: string
}

interface HospitalVisit {
  hospitalName: string
  date: string
  doctorName: string
  diagnosis: string
}

interface Surgery {
  name: string
  date: string
  surgeon: string
  details: string
}

interface MedicinePackage {
  name: string
  active: boolean
  nextDeliveryDate: string
  medications: string[]
}

interface VaccinationRecord {
  vaccineName: string
  date: string
  location: string
}

interface UserData {
  firstName: string
  lastName: string
  age: number
  gender: string
  bloodGroup: string
  address: Address
  contactDetails: ContactDetails
  chronicConditions: ChronicCondition[]
  allergies: Allergy[]
  currentMedications: Medication[]
  healthReports: HealthReport[]
  upcomingVaccinations: Vaccination[]
  recommendedVaccinations: RecommendedVaccination[]
  insuranceCoverage: boolean
  insuranceCoverageAmount: string
  insuranceValidUntil: string
  subscriptionBenefits: string[]
  familyDetails: FamilyMember[]
  govtSchemes: GovernmentScheme[]
  pastMedicalConditions: PastMedicalCondition[]
  hospitalVisits: HospitalVisit[]
  surgeries: Surgery[]
  medicinePackages: MedicinePackage[]
  vaccinationRecords: VaccinationRecord[]
}

// Interface for API response
interface FetchUserDataResponse {
  success: boolean
  data: UserData
}

// Interface for request body
interface RequestBody {
  message: string
  language: "english" | "hindi"
  userId: string
}

// Initialize GoogleGenerativeAI with type-safe environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

// Function to fetch user data with proper typing
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const res = await axios.get<FetchUserDataResponse>(
      `https://health-prototype.vercel.app/api/get-user-data/${userId}`,
    )
    if (!res.data.success) {
      throw new Error("Failed to fetch user data")
    }
    return res.data.data
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = (await request.json()) as RequestBody
    const { message, language, userId } = body

    // Fetch user data
    const userData = await fetchUserData(userId)

    // Create system prompt based on language
    const systemPrompt =
      language === "english"
        ? `You are a health assistant chatbot that provides helpful advice about health concerns. 
         You have access to the user's health profile and should use this information to provide personalized responses.
         Always be respectful, accurate, and helpful. If you're unsure about something, acknowledge your limitations.
         For serious medical concerns, always advise the user to consult with a healthcare professional.
         Respond in English.`
        : `आप एक स्वास्थ्य सहायक चैटबॉट हैं जो स्वास्थ्य संबंधी चिंताओं के बारे में सहायक सलाह प्रदान करता है।
         आपके पास उपयोगकर्ता के स्वास्थ्य प्रोफ़ाइल तक पहुंच है और आपको इस जानकारी का उपयोग व्यक्तिगत प्रतिक्रियाएं प्रदान करने के लिए करना चाहिए।
         हमेशा सम्मानजनक, सटीक और सहायक रहें। यदि आप किसी बात के बारे में अनिश्चित हैं, तो अपनी सीमाओं को स्वीकार करें।
         गंभीर चिकित्सा संबंधी चिंताओं के लिए, हमेशा उपयोगकर्ता को स्वास्थ्य देखभाल पेशेवर से परामर्श करने की सलाह दें।
         हिंदी में जवाब दें।`

    // Create user data context
    const userContext = `
User Data:
- Name: ${userData.firstName} ${userData.lastName}
- Age: ${userData.age}
- Gender: ${userData.gender}
- Blood Group: ${userData.bloodGroup}
- Chronic Conditions: ${userData.chronicConditions.map((c) => c.name).join(", ")}
- Allergies: ${userData.allergies.map((a) => a.allergen).join(", ")}
- Current Medications: ${userData.currentMedications.map((m) => m.name).join(", ")}
- Recent Health Reports: ${userData.healthReports.map((r) => `${r.type}: ${r.latestReading}`).join(", ")}
- Past Medical Conditions: ${userData.pastMedicalConditions.map((p) => p.name).join(", ")}
`

    // Create the prompt
    const prompt = `${systemPrompt}

${userContext}

User Question: ${message}

Please provide a helpful, accurate response based on the user's health profile. If the question is not related to health, politely redirect the conversation to health topics.`

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in health chatbot API:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        response: "क्षमा करें, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।",
      },
      { status: 500 },
    )
  }
}

