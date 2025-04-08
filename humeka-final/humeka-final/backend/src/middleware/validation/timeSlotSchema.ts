import * as Yup from 'yup';
import {Request, Response, NextFunction} from 'express'


const defaultTimeSlotSchema = Yup.object({
  from: Yup.date()
    .required('Start time is required'),
  to: Yup.date()
    .required('End time is required')
    .test('is-greater', 'End time must be greater than start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        return value > from;
      }
      return true;
    })
    .test('is-same-day', 'End time must be on the same day as start time', function(value) {
      const { from } = this.parent;
      if (from && value) {
        const startDate = new Date(from);
        const endDate = new Date(value);
        return startDate.toDateString() === endDate.toDateString();
      }
      return true;
    }),
});

export const validateDefaultTimeSlotSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await defaultTimeSlotSchema.validate(req.body, { abortEarly: false })
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