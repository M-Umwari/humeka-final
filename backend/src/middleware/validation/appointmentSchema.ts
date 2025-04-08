import {Request, Response, NextFunction} from 'express'
import * as yup from 'yup';


export const createAppointmentSchema = yup.object({
  timeSlotId: yup.string().uuid('Invalid time slot ID').required('Time slot ID is required')
})

export const validateCreateAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createAppointmentSchema.validate(req.body, { abortEarly: false })
        next();
    } catch (error) {
        console.log(error.errors)
        res.status(400).json({
            status: "error",
            message: "validation Error",
            errors: error.errors,
        });
    }
};
