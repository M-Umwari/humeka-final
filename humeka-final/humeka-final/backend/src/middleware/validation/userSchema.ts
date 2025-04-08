import { NextFunction } from 'express';
import * as yup from 'yup'
import {Request, Response} from 'express'

const userStatusSchema = yup.object().shape({
    active: yup.boolean().required()
})

const userRoleSchema = yup.object().shape({
    role: yup.string().oneOf(['admin', 'user']).required()
})


export const validationSchema = yup.object().shape({
    mood: yup.number()
        .min(0, "Mood rating must be at least 0")
        .max(5, "Mood rating cannot be more than 5")
        .required("Mood rating is required"),
    emotions: yup.array()
        .of(yup.string())
        .min(1, "Please select at least one emotion")
        .required("Emotions selection is required"),
    energy: yup.number()
        .min(0, "Energy rating must be at least 0")
        .max(5, "Energy rating cannot be more than 5")
        .required("Energy rating is required"),
    stress: yup.number()
        .min(0, "Stress rating must be at least 0")
        .max(5, "Stress rating cannot be more than 5")
        .required("Stress rating is required"),
    interest: yup.number()
        .min(0, "Interest rating must be at least 0")
        .max(5, "Interest rating cannot be more than 5")
        .required("Interest rating is required"),
    support: yup.string()
        .oneOf(["Always", "Sometimes", "Rarely", "Never"], "Invalid selection")
        .required("Support selection is required"),
})


export const validateUserStatusSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userStatusSchema.validate(req.body, { abortEarly: false })
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

export const validateUserRoleSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userRoleSchema.validate(req.body, { abortEarly: false })
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

export const validateQuestionnaireSchema = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validationSchema.validate(req.body, { abortEarly: false })
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