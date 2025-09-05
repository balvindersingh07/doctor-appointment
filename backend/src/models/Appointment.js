import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateTime: { type: Date, required: true },
  department: { type: String, required: true },
  comments: String,
  reportFiles: [String],
  status: { type: String, default: "booked", enum: ["booked","completed","cancelled"] }
},{ timestamps:true });
export default mongoose.model("Appointment", appointmentSchema);
