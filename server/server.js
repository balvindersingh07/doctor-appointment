// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";

dotenv.config();
const app = express();

// --- DB ---
connectDB();

// --- CORS: allow dev + prod ---
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN; // e.g. https://doctor-appointment-six-jet.vercel.app
const corsOptions = {
  origin: (origin, cb) => {
    if (
      !origin ||
      origin.includes("localhost:5173") ||
      (FRONTEND_ORIGIN && origin === FRONTEND_ORIGIN)
    ) return cb(null, true);
    return cb(null, false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

// static uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// health + routes
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/", (req, res) => res.json({ ok: true, message: "API running ✅" }));
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
