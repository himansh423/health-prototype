import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
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
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospitals" }],
});

const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
