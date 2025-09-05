// server/src/config/db.js
import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI not provided");
  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    // keep defaults minimal; add options here if you need
  });

  console.log("✅ MongoDB connected");
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close(false);
    console.log("🛑 MongoDB disconnected");
  } catch (e) {
    console.error("MongoDB disconnect error:", e.message);
  }
}
