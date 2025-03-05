interface Address {
  village: string;
  district: string;
  state: string;
  pincode: string;
}

interface ContactDetails {
  phone: string;
  email: string;
  emergencyContact: string;
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
  cardNumber: string;
  validUntil: string;
  coverageDetails: string;
  eligibleFacilities: string;
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

interface Allergy {
  allergen: string;
  type: string;
  severity: string;
  reaction: string;
}

interface HealthReport {
  type: string;
  summary: string;
  startDate: string;
  endDate: string;
  firstReading: string;
  latestReading: string;
  improvement: boolean;
  improvementValue: string;
}

interface CurrentMedication {
  name: string;
  dosage: string;
  prescribedBy: string;
  schedule: string;
  nextRefillDate: string;
  source: string;
}

interface PreviousMedication {
  name: string;
  dosage: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  reasonForStopping: string;
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
  isDue: boolean;
  dueDate: string;
  freeUnderGovtScheme: boolean;
  notes: string;
}

interface RecommendedVaccination {
  vaccineName: string;
  description: string;
  priority: string;
  freeUnderGovtScheme: boolean;
  warning: string | null;
}

interface Appointment {
  type: string;
  purpose: string;
  date: string;
  time: string;
  doctorName: string;
  specialization: string;
  location: string;
  notes: string;
}

interface PastAppointment {
  date: string;
  doctorName: string;
  specialization: string;
  location: string;
  purpose: string;
  outcome: string;
  followUpRequired: boolean;
}

interface DiagnosticTest {
  testName: string;
  isDue: boolean;
  scheduledDate: string;
  location: string;
  notes: string;
  freeUnderGovtScheme: boolean;
}

interface PastDiagnosticTest {
  testName: string;
  testType: string;
  date: string;
  labName: string;
  resultSummary: string;
  status: string;
}

interface DiagnosticTrend {
  testName: string;
  trend: string;
  latestValue: string;
  latestDate: string;
  previousValue: string;
  previousDate: string;
  changeValue: string;
  interpretation: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone: string | null;
  email: string;
  address: string;
  isPrimary: boolean;
  notes: string | null;
}

interface MockUserData {
  userId: string;
  fullName: string;
  gender: string;
  age: number;
  dateOfBirth: string;
  bloodGroup: string;
  profilePicture: string;
  coverPhoto: string;
  address: Address;
  contactDetails: ContactDetails;
  governmentId: string;
  familyDetails: FamilyMember[];
  subscriptionPlan: string;
  subscriptionAmount: number;
  subscriptionBenefits: string[];
  insuranceCoverage: boolean;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceCoverageAmount: number;
  insuranceUsed: number;
  insuranceValidUntil: string;
  insuranceType: string;
  govtSchemes: GovernmentScheme[];
  chronicConditions: ChronicCondition[];
  pastMedicalConditions: PastMedicalCondition[];
  hospitalVisits: HospitalVisit[];
  surgeries: Surgery[];
  allergies: Allergy[];
  healthReports: HealthReport[];
  currentMedications: CurrentMedication[];
  previousMedications: PreviousMedication[];
  medicinePackages: MedicinePackage[];
  vaccinationRecords: VaccinationRecord[];
  upcomingVaccinations: UpcomingVaccination[];
  recommendedVaccinations: RecommendedVaccination[];
  upcomingAppointments: Appointment[];
  pastAppointments: PastAppointment[];
  upcomingDiagnosticTests: DiagnosticTest[];
  pastDiagnosticTests: PastDiagnosticTest[];
  diagnosticTrends: DiagnosticTrend[];
  emergencyContacts: EmergencyContact[];
}

export const mockUserData: MockUserData = {
  userId: "HCID-78945612",
  fullName: "Rajesh Kumar",
  gender: "Male",
  age: 42,
  dateOfBirth: "10-05-1981",
  bloodGroup: "O+",
  profilePicture: "/placeholder.svg?height=300&width=300",
  coverPhoto: "/placeholder.svg?height=500&width=1500",
  address: {
    village: "Ramanagar",
    district: "Bangalore Rural",
    state: "Karnataka",
    pincode: "562159",
  },
  contactDetails: {
    phone: "+91 9876543210",
    email: "rajesh.kumar@example.com",
    emergencyContact: "+91 9988776655",
  },
  governmentId: "XXXX-XXXX-7890",
  familyDetails: [
    {
      name: "Sunita Kumar",
      relationship: "Spouse",
      age: 38,
      coveredUnderInsurance: true,
    },
    {
      name: "Arjun Kumar",
      relationship: "Son",
      age: 12,
      coveredUnderInsurance: true,
    },
    {
      name: "Priya Kumar",
      relationship: "Daughter",
      age: 8,
      coveredUnderInsurance: true,
    },
  ],
  subscriptionPlan: "Family Health Plan",
  subscriptionAmount: 499,
  subscriptionBenefits: [
    "Unlimited doctor consultations",
    "50% discount on all diagnostic tests",
    "Free quarterly health checkups",
    "24/7 teleconsultation support",
  ],
  insuranceCoverage: true,
  insuranceProvider: "National Health Insurance",
  insurancePolicyNumber: "NHIP-125478963",
  insuranceCoverageAmount: 500000,
  insuranceUsed: 125000,
  insuranceValidUntil: "31-03-2024",
  insuranceType: "Family Floater",
  govtSchemes: [
    {
      name: "Ayushman Bharat PM-JAY",
      status: "Active",
      cardNumber: "PMJAY-2023-78945",
      validUntil: "31-12-2024",
      coverageDetails:
        "Hospitalization coverage up to ₹5 lakhs per family per year",
      eligibleFacilities: "All PMJAY empanelled hospitals",
    },
  ],
  chronicConditions: [
    {
      name: "Type 2 Diabetes",
      diagnosedDate: "15-06-2018",
      severity: "Moderate",
      status: "Under Control",
      managementPlan: "Oral medication, diet control, regular exercise",
    },
    {
      name: "Hypertension",
      diagnosedDate: "22-09-2019",
      severity: "Mild",
      status: "Monitoring",
      managementPlan:
        "Daily medication, reduced salt intake, stress management",
    },
  ],
  pastMedicalConditions: [
    {
      name: "Viral Pneumonia",
      startDate: "05-01-2020",
      endDate: "30-01-2020",
      treatment: "Antibiotics, respiratory support, hospitalization for 5 days",
    },
    {
      name: "Appendicitis",
      startDate: "12-07-2015",
      endDate: "25-07-2015",
      treatment: "Appendectomy surgery at District Hospital",
    },
  ],
  hospitalVisits: [
    {
      hospitalName: "District General Hospital",
      hospitalType: "Government",
      date: "18-03-2023",
      doctorName: "Dr. Sharma",
      specialization: "Endocrinology",
      diagnosis: "Diabetes follow-up, medication adjustment",
    },
    {
      hospitalName: "Rural Health Centre",
      hospitalType: "Government PHC",
      date: "05-01-2023",
      doctorName: "Dr. Reddy",
      specialization: "General Medicine",
      diagnosis: "Seasonal flu, prescribed antibiotics",
    },
    {
      hospitalName: "City Super Specialty Hospital",
      hospitalType: "Private",
      date: "12-11-2022",
      doctorName: "Dr. Gupta",
      specialization: "Cardiology",
      diagnosis: "Routine heart checkup, ECG normal",
    },
  ],
  surgeries: [
    {
      name: "Appendectomy",
      date: "15-07-2015",
      hospital: "District Hospital",
      surgeon: "Dr. Patil",
      details: "Laparoscopic removal of inflamed appendix",
      followUp: "Complete recovery, follow-up on 30-07-2015",
    },
  ],
  allergies: [
    {
      allergen: "Penicillin",
      type: "Medication",
      severity: "Severe",
      reaction: "Rash, difficulty breathing",
    },
    {
      allergen: "Peanuts",
      type: "Food",
      severity: "Moderate",
      reaction: "Hives, swelling",
    },
  ],
  healthReports: [
    {
      type: "Blood Sugar",
      summary:
        "Blood sugar levels have improved over the last 6 months with medication and lifestyle changes",
      startDate: "01-01-2023",
      endDate: "30-06-2023",
      firstReading: "178 mg/dL (fasting)",
      latestReading: "142 mg/dL (fasting)",
      improvement: true,
      improvementValue: "↓ 36 mg/dL",
    },
    {
      type: "Blood Pressure",
      summary:
        "Blood pressure has stabilized within normal range after medication adjustment",
      startDate: "01-01-2023",
      endDate: "30-06-2023",
      firstReading: "152/94 mmHg",
      latestReading: "134/86 mmHg",
      improvement: true,
      improvementValue: "↓ 18/8 mmHg",
    },
  ],
  currentMedications: [
    {
      name: "Metformin",
      dosage: "500mg twice daily",
      prescribedBy: "Dr. Sharma, Endocrinologist",
      schedule: "Morning, Evening after meals",
      nextRefillDate: "15-08-2023",
      source: "Generic Medicine Store",
    },
    {
      name: "Amlodipine",
      dosage: "5mg once daily",
      prescribedBy: "Dr. Gupta, Cardiologist",
      schedule: "Morning",
      nextRefillDate: "20-08-2023",
      source: "Government Supply",
    },
  ],
  previousMedications: [
    {
      name: "Azithromycin",
      dosage: "500mg once daily",
      prescribedBy: "Dr. Reddy, General Physician",
      startDate: "05-01-2023",
      endDate: "10-01-2023",
      reasonForStopping: "Course completed",
    },
    {
      name: "Glimepiride",
      dosage: "2mg once daily",
      prescribedBy: "Dr. Sharma, Endocrinologist",
      startDate: "25-06-2018",
      endDate: "15-03-2022",
      reasonForStopping: "Switched to Metformin due to better response",
    },
  ],
  medicinePackages: [
    {
      name: "Diabetes Care Package",
      active: true,
      monthlyCost: 349,
      nextDeliveryDate: "10-08-2023",
      supplyRemaining: 7,
      medications: [
        "Metformin 500mg",
        "Multivitamin Tablet",
        "Blood Sugar Test Strips",
      ],
    },
  ],
  vaccinationRecords: [
    {
      vaccineName: "COVID-19 Vaccine",
      type: "Covishield",
      date: "15-05-2021",
      doctorName: "Dr. Singh",
      location: "PHC Ramanagar",
      batchNumber: "CS21051505",
    },
    {
      vaccineName: "COVID-19 Vaccine (2nd dose)",
      type: "Covishield",
      date: "30-08-2021",
      doctorName: "Dr. Singh",
      location: "PHC Ramanagar",
      batchNumber: "CS21083025",
    },
    {
      vaccineName: "COVID-19 Booster",
      type: "Covishield",
      date: "10-01-2023",
      doctorName: "Dr. Reddy",
      location: "PHC Ramanagar",
      batchNumber: "CS23011042",
    },
    {
      vaccineName: "Tetanus Toxoid",
      type: "TT",
      date: "22-07-2020",
      doctorName: "Dr. Mehta",
      location: "District Hospital",
      batchNumber: "TT20072205",
    },
  ],
  upcomingVaccinations: [
    {
      vaccineName: "Influenza Vaccine",
      isDue: true,
      dueDate: "Now",
      freeUnderGovtScheme: true,
      notes: "Annual flu vaccination recommended for diabetic patients",
    },
    {
      vaccineName: "Pneumococcal Vaccine",
      isDue: false,
      dueDate: "15-09-2023",
      freeUnderGovtScheme: false,
      notes: "Recommended for adults with chronic conditions",
    },
  ],
  recommendedVaccinations: [
    {
      vaccineName: "Hepatitis B",
      description: "Protects against liver infection and complications",
      priority: "Medium",
      freeUnderGovtScheme: true,
      warning: null,
    },
    {
      vaccineName: "Shingles Vaccine (Herpes Zoster)",
      description: "Recommended for adults over 40 years old",
      priority: "Low",
      freeUnderGovtScheme: false,
      warning: "May cause mild side effects like soreness and fever",
    },
  ],
  upcomingAppointments: [
    {
      type: "Specialist",
      purpose: "Diabetes Follow-up",
      date: "15-08-2023",
      time: "10:30 AM",
      doctorName: "Dr. Sharma",
      specialization: "Endocrinologist",
      location: "District General Hospital",
      notes: "Bring latest blood test reports",
    },
    {
      type: "Diagnostic",
      purpose: "HbA1c Test",
      date: "10-08-2023",
      time: "08:00 AM",
      doctorName: "Lab Technician",
      specialization: "Pathology",
      location: "Rural Health Centre Laboratory",
      notes: "Fasting required for 8 hours",
    },
  ],
  pastAppointments: [
    {
      date: "18-03-2023",
      doctorName: "Dr. Sharma",
      specialization: "Endocrinologist",
      location: "District General Hospital",
      purpose: "Diabetes Review",
      outcome: "Medication adjusted, diet plan revised",
      followUpRequired: true,
    },
    {
      date: "05-01-2023",
      doctorName: "Dr. Reddy",
      specialization: "General Medicine",
      location: "Rural Health Centre",
      purpose: "Seasonal Flu",
      outcome: "Antibiotics prescribed for 5 days",
      followUpRequired: false,
    },
    {
      date: "12-11-2022",
      doctorName: "Dr. Gupta",
      specialization: "Cardiologist",
      location: "City Super Specialty Hospital",
      purpose: "Heart Checkup",
      outcome: "ECG normal, advised yearly checkup",
      followUpRequired: false,
    },
  ],
  upcomingDiagnosticTests: [
    {
      testName: "HbA1c (Glycated Hemoglobin)",
      isDue: true,
      scheduledDate: "10-08-2023",
      location: "Rural Health Centre Laboratory",
      notes: "Come fasting for 8 hours",
      freeUnderGovtScheme: true,
    },
    {
      testName: "Comprehensive Lipid Profile",
      isDue: false,
      scheduledDate: "15-08-2023",
      location: "District Hospital Laboratory",
      notes: "12 hours fasting required",
      freeUnderGovtScheme: false,
    },
  ],
  pastDiagnosticTests: [
    {
      testName: "HbA1c (Glycated Hemoglobin)",
      testType: "Blood Test",
      date: "05-02-2023",
      labName: "District Hospital Laboratory",
      resultSummary: "7.2% (Target <7.0%), slightly elevated",
      status: "Abnormal",
    },
    {
      testName: "Comprehensive Lipid Profile",
      testType: "Blood Test",
      date: "05-02-2023",
      labName: "District Hospital Laboratory",
      resultSummary:
        "Total Cholesterol: 185 mg/dL, HDL: 42 mg/dL, LDL: 110 mg/dL, Triglycerides: 165 mg/dL",
      status: "Borderline",
    },
    {
      testName: "Blood Pressure",
      testType: "Vital Sign",
      date: "18-03-2023",
      labName: "District General Hospital",
      resultSummary: "134/86 mmHg",
      status: "Normal",
    },
    {
      testName: "ECG",
      testType: "Cardiac",
      date: "12-11-2022",
      labName: "City Super Specialty Hospital",
      resultSummary: "Normal sinus rhythm, no abnormalities detected",
      status: "Normal",
    },
  ],
  diagnosticTrends: [
    {
      testName: "Blood Sugar (Fasting)",
      trend: "Improving",
      latestValue: "142 mg/dL",
      latestDate: "05-07-2023",
      previousValue: "168 mg/dL",
      previousDate: "05-01-2023",
      changeValue: "↓ 26 mg/dL",
      interpretation:
        "Showing improvement but still above target range of <126 mg/dL",
    },
    {
      testName: "Blood Pressure",
      trend: "Stable",
      latestValue: "134/86 mmHg",
      latestDate: "18-03-2023",
      previousValue: "138/88 mmHg",
      previousDate: "12-11-2022",
      changeValue: "↓ 4/2 mmHg",
      interpretation: "Within normal range, well-controlled with medication",
    },
    {
      testName: "LDL Cholesterol",
      trend: "Worsening",
      latestValue: "110 mg/dL",
      latestDate: "05-02-2023",
      previousValue: "102 mg/dL",
      previousDate: "10-08-2022",
      changeValue: "↑ 8 mg/dL",
      interpretation: "Slight increase, dietary modifications recommended",
    },
  ],
  emergencyContacts: [
    {
      name: "Sunita Kumar",
      relationship: "Spouse",
      phone: "+91 9988776655",
      alternatePhone: null,
      email: "sunita.kumar@example.com",
      address: "Same as patient",
      isPrimary: true,
      notes: null,
    },
  ],
};