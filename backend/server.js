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

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// static uploads folder (for reports/files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => res.json({ ok: true, message: "API running ✅" }));
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
