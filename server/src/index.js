// server/src/index.js
import dotenv from "dotenv";
dotenv.config(); // ✅ must be first: loads .env

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// --- middleware ---
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// --- health ---
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- routes ---
app.use("/api/auth", authRoutes);

// --- 404 ---
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// --- start server ---
const PORT = Number(process.env.PORT) || 5000;
const URI = process.env.MONGODB_URI;

async function start() {
  try {
    if (!URI) {
      console.error("❌ MONGODB_URI is missing. Create server/.env with MONGODB_URI");
      process.exit(1);
    }

    await connectDB(URI);

    const server = app.listen(PORT, () =>
      console.log(`🚀 API running at http://localhost:${PORT}`)
    );

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down…`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };
    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("DB connect error", err);
    process.exit(1);
  }
}

start();
