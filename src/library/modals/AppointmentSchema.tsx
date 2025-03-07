import mongoose from "mongoose";

const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    appointmentBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }, 
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospitals", required: true }, 
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctors", required: true }, 
    purpose: { type: String, required: true }, 
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    }, 
    notes: { type: String }, 
  },
  { timestamps: true }
);

const Appointment = mongoose.models.Appointments || mongoose.model("Appointments", AppointmentSchema);

export default Appointment;
