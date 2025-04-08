import { NextFunction } from 'express';
import * as yup from 'yup'
import {Request, Response} from 'express'


const noteSchema = yup.object().shape({
    note: yup.string().required()
});


export const validateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await noteSchema.validate(req.body, { abortEarly: false })
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