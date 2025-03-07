import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  gender: { type: String },
  age: { type: Number },
  dateOfBirth: { type: String },
  bloodGroup: { type: String },
  profilePicture: { type: String },
  coverPhoto: { type: String },
  address: {
    village: String,
    district: String,
    state: String,
    pincode: String,
  },
  contactDetails: {
    phone: String,
    email: String,
    emergencyContact: String,
  },
  governmentId: { type: String },
  familyDetails: [
    {
      name: String,
      relationship: String,
      age: Number,
      coveredUnderInsurance: Boolean,
    },
  ],
  subscriptionPlan: String,
  subscriptionAmount: Number,
  subscriptionBenefits: [String],
  insuranceCoverage: Boolean,
  insuranceProvider: String,
  insurancePolicyNumber: String,
  insuranceCoverageAmount: Number,
  insuranceUsed: Number,
  insuranceValidUntil: String,
  insuranceType: String,
  govtSchemes: [
    {
      name: String,
      status: String,
      cardNumber: String,
      validUntil: String,
      coverageDetails: String,
      eligibleFacilities: String,
    },
  ],
  chronicConditions: [
    {
      name: String,
      diagnosedDate: String,
      severity: String,
      status: String,
      managementPlan: String,
    },
  ],
  pastMedicalConditions: [
    {
      name: String,
      startDate: String,
      endDate: String,
      treatment: String,
    },
  ],
  hospitalVisits: [
    {
      hospitalName: String,
      hospitalType: String,
      date: String,
      doctorName: String,
      specialization: String,
      diagnosis: String,
    },
  ],
  surgeries: [
    {
      name: String,
      date: String,
      hospital: String,
      surgeon: String,
      details: String,
      followUp: String,
    },
  ],
  allergies: [
    {
      allergen: String,
      type: String,
      severity: String,
      reaction: String,
    },
  ],
  healthReports: [
    {
      type: String,
      summary: String,
      startDate: String,
      endDate: String,
      firstReading: String,
      latestReading: String,
      improvement: Boolean,
      improvementValue: String,
    },
  ],
  currentMedications: [
    {
      name: String,
      dosage: String,
      prescribedBy: String,
      schedule: String,
      nextRefillDate: String,
      source: String,
    },
  ],
  previousMedications: [
    {
      name: String,
      dosage: String,
      prescribedBy: String,
      startDate: String,
      endDate: String,
      reasonForStopping: String,
    },
  ],
  medicinePackages: [
    {
      name: String,
      active: Boolean,
      monthlyCost: Number,
      nextDeliveryDate: String,
      supplyRemaining: Number,
      medications: [String],
    },
  ],
  vaccinationRecords: [
    {
      vaccineName: String,
      type: String,
      date: String,
      doctorName: String,
      location: String,
      batchNumber: String,
    },
  ],
  upcomingVaccinations: [
    {
      vaccineName: String,
      isDue: Boolean,
      dueDate: String,
      freeUnderGovtScheme: Boolean,
      notes: String,
    },
  ],
  recommendedVaccinations: [
    {
      vaccineName: String,
      description: String,
      priority: String,
      freeUnderGovtScheme: Boolean,
      warning: String,
    },
  ],
  // upcomingAppointments: [
  //   {
  //     type: String,
  //     purpose: String,
  //     date: String,
  //     time: String,
  //     doctorName: String,
  //     specialization: String,
  //     location: String,
  //     notes: String,
  //   },
  // ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospitals" }],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
