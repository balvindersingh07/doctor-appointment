import { Router } from "express";
import auth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { createAppointment, myAppointments } from "../controllers/appointmentController.js";
const router = Router();
router.post("/", auth, upload.array("reports",5), createAppointment);
router.get("/", auth, myAppointments);
export default router;
