import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  zipcode: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  phone: String,
  avatar: String,
  role: { type: String, default: "patient" },
  address: addressSchema
}, { timestamps: true });

export default mongoose.model("User", userSchema);
