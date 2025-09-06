// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";

dotenv.config();
const app = express();
app.set("trust proxy", 1);

// ---- DB ----
connectDB();

// ---- Parsers ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- CORS (env supports comma-separated origins) ----
const baseList = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const DEV = ["http://localhost:5173", "http://127.0.0.1:5173", "https://localhost:5173"];
const allowlist = [...new Set([...baseList, ...DEV])];

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // Postman/cURL/health
    if (allowlist.includes(origin)) return cb(null, true);
    if (/\.vercel\.app$/.test(origin) || /\.netlify\.app$/.test(origin)) return cb(null, true);
    return cb(null, true); // (no credentials used) last resort allow
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ---- Logger ----
app.use(morgan("dev"));

// ---- Static uploads (ensure dir exists) ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads"); // => /backend/uploads
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// serve uploaded files
app.use("/uploads", express.static(uploadDir));

// ---- Routes ----
app.get("/", (_req, res) => res.json({ ok: true, message: "API running ✅" }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

// ---- Start ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
