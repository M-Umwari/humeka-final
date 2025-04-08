import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    mood: Yup.number()
        .min(0, "Mood rating must be at least 0")
        .max(5, "Mood rating cannot be more than 5")
        .required("Mood rating is required"),
    emotions: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least one emotion")
        .required("Emotions selection is required"),
    energy: Yup.number()
        .min(0, "Energy rating must be at least 0")
        .max(5, "Energy rating cannot be more than 5")
        .required("Energy rating is required"),
    stress: Yup.number()
        .min(0, "Stress rating must be at least 0")
        .max(5, "Stress rating cannot be more than 5")
        .required("Stress rating is required"),
    interest: Yup.number()
        .min(0, "Interest rating must be at least 0")
        .max(5, "Interest rating cannot be more than 5")
        .required("Interest rating is required"),
    support: Yup.string()
        .oneOf(["Always", "Sometimes", "Rarely", "Never"], "Invalid selection")
        .required("Support selection is required"),
})

export default validationSchema;