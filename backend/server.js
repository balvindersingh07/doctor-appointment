// backend/server.js
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

// --- Parsers ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CORS (dev + prod) ---
const allowlist = [
  process.env.FRONTEND_ORIGIN,   // e.g. http://localhost:5173 OR your Vercel/Netlify URL
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // curl/Postman/health
    if (allowlist.includes(origin)) return cb(null, true);
    if (/\.vercel\.app$/.test(origin) || /\.netlify\.app$/.test(origin))
      return cb(null, true);
    // fallback: allow (no credentials used in frontend)
    return cb(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// handle preflight cleanly
app.options("*", cors(corsOptions));

// --- Logger (dev) ---
app.use(morgan("dev"));

// --- Static uploads ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
app.get("/", (req, res) => res.json({ ok: true, message: "API running ✅" }));
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

// --- Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
