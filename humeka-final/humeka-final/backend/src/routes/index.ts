import { Router } from "express";
import authRoutes from "./authRoutes";
import noteRoutes from "./noteRoutes";
import userRoutes from "./userRoutes";
import appointmentRoutes from './appointmentRoutes'
import timeSlotRoutes from './timeSlotRoutes'
import messageRoutes from "./messageRoutes";
import groupRoutes from "./groupRoutes";


const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/notes', noteRoutes)
router.use('/appointments', appointmentRoutes)
router.use('/timeSlots', timeSlotRoutes)
router.use('/messages', messageRoutes)
router.use('/groups', groupRoutes)


export default router