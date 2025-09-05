import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["patient", "admin"], default: "patient" },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
