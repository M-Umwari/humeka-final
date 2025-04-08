import { Router } from "express";
import { TimeSlotController } from "../controllers/timeSlotController";
import { isLoggedIn, restrictToRole } from "../middleware/authenticate";
import { validateDefaultTimeSlotSchema } from "../middleware/validation/timeSlotSchema";


const router = Router()
router.use(isLoggedIn)


router.get('/activedates/:id/:date', TimeSlotController.getTimeSlotsByDate)
router.get('/activedates/:id', TimeSlotController.getActiveDates) 

router
    .route('/')
    .post(restrictToRole(['counselor']), TimeSlotController.createTimeSlot)

router.get('/counselor/:id', TimeSlotController.getAllTimeSlots)   

router
    .route('/default')
    .post(restrictToRole(['counselor']), validateDefaultTimeSlotSchema, TimeSlotController.createDefaultTimeSlot)
    .get(restrictToRole(['counselor']), TimeSlotController.getDefaultTimeSlots)

router
    .route('/default/:id')
    .patch(restrictToRole(['counselor']), TimeSlotController.updateDefaultTimeSlot)
    .delete(restrictToRole(['counselor']), TimeSlotController.deleteDefaultTimeSlot)

router
    .route('/:id')
    .patch(restrictToRole(['counselor']), TimeSlotController.updateTimeSlot)
    .delete(restrictToRole(['counselor']), TimeSlotController.deleteTimeSlot) 


export default router