import { Router } from "express";
import auth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  createAppointment,
  myAppointments,
} from "../controllers/appointmentController.js";

const router = Router();

/**
 * Multer errors (e.g., folder missing, file too large) by default return 500.
 * Wrap upload so we can send clean 400 with message instead.
 */
const safeUpload = (req, res, next) => {
  const handler = upload.array("reports", 5);
  handler(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message || "Upload failed",
      });
    }
    next();
  });
};

router.post("/", auth, safeUpload, createAppointment);
router.get("/", auth, myAppointments);

export default router;
