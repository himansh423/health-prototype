import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  basicDetails: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    coverPhoto: { type: String },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
      helpline: { type: String },
    },
    mapsLink: { type: String },
  },
  generalInfo: {
    totalBeds: { type: Number, required: true },
    currentAvailableBeds: { type: Number, required: true },
    icuBeds: { type: Number, required: true },
    icuAvailableBeds: { type: Number, required: true },
    ventilators: { type: Number, required: true },
    availableVentilators: { type: Number, required: true },
    emergencyWard: { type: Boolean, required: true },
    opdTimings: { type: String, required: true },
    emergencyServices: { type: String, required: true },
    ambulanceAvailable: { type: Boolean, required: true },
    bloodBankAvailable: { type: Boolean, required: true },
    pharmacyAvailable: { type: Boolean, required: true },
    disabledFacilities: [{ type: String }],
  },
  departments: [
    {
      name: { type: String, required: true },
      icon: { type: String },
    },
  ],
  doctors: [
    {
      name: { type: String, required: true },
      qualification: { type: String, required: true },
      specialization: { type: String, required: true },
      position: { type: String, required: true },
      experience: { type: Number, required: true },
      availability: { type: String, required: true },
      opdTimings: { type: String, required: true },
      emergencyAvailable: { type: Boolean, required: true },
      photo: { type: String },
    },
  ],
  performance: {
    rating: { type: Number, required: true },
    totalReviews: { type: Number, required: true },
    successfulSurgeries: { type: Number, required: true },
    mortalityRate: { type: String, required: true },
    averagePatients: {
      daily: { type: Number, required: true },
      monthly: { type: Number, required: true },
    },
    achievements: [{ type: String }],
  },
  emergencyCare: {
    traumaCenter: { type: Boolean, required: true },
    burnUnit: { type: Boolean, required: true },
    neonatalICU: { type: Boolean, required: true },
    dialysisCenter: { type: Boolean, required: true },
    organTransplant: { type: Boolean, required: true },
    mentalHealthHelpline: { type: Boolean, required: true },
  },
  pharmacy: {
    freeMedicineScheme: { type: Boolean, required: true },
    genericMedicineAvailable: { type: Boolean, required: true },
    onlineBooking: { type: Boolean, required: true },
    homeDelivery: { type: Boolean, required: true },
    essentialMedicines: [{ type: String }],
  },
  costAndInsurance: {
    generalConsultation: { type: String, required: true },
    averageSurgeryCost: { type: String, required: true },
    ayushmanBharat: { type: Boolean, required: true },
    esic: { type: Boolean, required: true },
    cghs: { type: Boolean, required: true },
    stateSchemes: [{ type: String }],
    financialAid: { type: String },
  },
  facilities: {
    waitingArea: { type: Boolean, required: true },
    canteen: { type: Boolean, required: true },
    parking: { type: String, required: true },
    wards: [{ type: String }],
    attachedMedicalCollege: { type: Boolean, required: true },
    researchFacilities: { type: Boolean, required: true },
    telemedicine: { type: Boolean, required: true },
    ambulanceServices: { type: String, required: true },
  },
  staff: {
    doctors: { type: Number, required: true },
    nurses: { type: Number, required: true },
    supportStaff: { type: Number, required: true },
    sanitationRating: { type: String, required: true },
  },
  announcements: [{ type: String }],
  nearbyHospitals: [
    {
      name: { type: String, required: true },
      distance: { type: String, required: true },
    },
  ],
  appointmentBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

const Hospital =
  mongoose.models.Hospitals || mongoose.model("Hospitals", hospitalSchema);

export default Hospital;
