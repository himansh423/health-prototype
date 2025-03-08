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
    village: {type:String},
    district: {type:String},
    state: {type:String},
    pincode: {type:String},
  },
  contactDetails: {
    phone: {type:String},
    email: {type:String},
    emergencyContact: {type:String},
  },
  governmentId: { type: String },
  familyDetails: [
    {
      name: {type:String},
      relationship: {type:String},
      age: {type:Number},
      coveredUnderInsurance: {type:Boolean},
    },
  ],
  subscriptionPlan: {type:String},
  subscriptionAmount: {type:Number},
  subscriptionBenefits: [{type:String}],
  insuranceCoverage: {type:Boolean},
  insuranceProvider: {type:String},
  insurancePolicyNumber: {type:String},
  insuranceCoverageAmount: {type:Number},
  insuranceUsed: {type:Number},
  insuranceValidUntil: {type:String},
  insuranceType: {type:String},
  govtSchemes: [
    {
      name: {type:String},
      status: {type:String},
      cardNumber: {type:String},
      validUntil: {type:String},
      coverageDetails: {type:String},
      eligibleFacilities: {type:String},
    },
  ],
  chronicConditions: [
    {
      name: {type:String},
      diagnosedDate: {type:String},
      severity: {type:String},
      status: {type:String},
      managementPlan: {type:String},
    },
  ],
  pastMedicalConditions: [
    {
      name: {type:String},
      startDate:{type:String},
      endDate: {type:String},
      treatment: {type:String},
    },
  ],
  hospitalVisits: [
    {
      hospitalName: {type:String},
      hospitalType: {type:String},
      date: {type:String},
      doctorName: {type:String},
      specialization: {type:String},
      diagnosis: {type:String},
    },
  ],
  surgeries: [
    {
      name: {type:String},
      date: {type:String},
      hospital: {type:String},
      surgeon: {type:String},
      details: {type:String},
      followUp: {type:String},
    },
  ],
  allergies: [
    {
      allergen: {type:String},
      type: {type:String},
      severity: {type:String},
      reaction: {type:String},
    },
  ],
  healthReports: [
    {
      type: {type:String},
      summary: {type:String},
      startDate: {type:String},
      endDate: {type:String},
      firstReading: {type:String},
      latestReading: {type:String},
      improvement: {type:Boolean},
      improvementValue: {type:String},
    },
  ],
  currentMedications: [
    {
      name: {type:String},
      dosage: {type:String},
      prescribedBy: {type:String},
      schedule: {type:String},
      nextRefillDate: {type:String},
      source: {type:String},
    },
  ],
  previousMedications: [
    {
      name: {type:String},
      dosage: {type:String},
      prescribedBy: {type:String},
      startDate: {type:String},
      endDate: {type:String},
      reasonForStopping: {type:String},
    },
  ],
  medicinePackages: [
    {
      name: {type:String},
      active: {type:Boolean},
      monthlyCost: {type:Number},
      nextDeliveryDate: {type:String},
      supplyRemaining: {type:Number},
      medications: [{type:String}],
    },
  ],
  vaccinationRecords: [
    {
      vaccineName: { type: String, required: true },
      type: { type: String, required: true },
      date: { type: String, required: true },
      doctorName: { type: String, required: true },
      location: { type: String, required: true },
      batchNumber: { type: String, required: true },
    },
  ],
  upcomingVaccinations: [
    {
      vaccineName: {type:String},
      isDue: {type:Boolean},
      dueDate: {type:String},
      freeUnderGovtScheme: {type:Boolean},
      notes: {type:String},
    },
  ],
  recommendedVaccinations: [
    {
      vaccineName: {type:String},
      description: {type:String},
      priority: {type:String},
      freeUnderGovtScheme: {type:Boolean},
      warning: {type:String},
    },
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments" }],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
