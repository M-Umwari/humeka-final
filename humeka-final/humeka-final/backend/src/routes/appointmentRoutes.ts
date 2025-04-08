import { Router } from "express";
import AppointmentController from "../controllers/appointmentController";
import { validateCreateAppointment } from "../middleware/validation/appointmentSchema";
import { isLoggedIn } from "../middleware/authenticate";


const router = Router();

router.use(isLoggedIn)

router.post('/', validateCreateAppointment, AppointmentController.createAppointment)
router.delete("/:id", AppointmentController.cancelAppointment);


export default router;