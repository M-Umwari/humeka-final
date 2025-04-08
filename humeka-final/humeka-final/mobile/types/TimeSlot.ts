import { User } from "./authFormData";

export interface Appointment {
    id:string,
    user: User,
    timeSlot: TimeSlot
}

export interface TimeSlot {
    id: string;
    from: string;
    to: string;
    date: string;
    isAvailable: boolean;
    appointment: Appointment | null
    createdAt: string;
    updatedAt: string;
}

export interface TimeSlotFormData {
    from: Date,
    to: Date,
    date: Date
}

export interface updateTimeSlotFormData {
    id: string,
    formData: TimeSlotFormData,
}

export interface DefaultTimeSlot {
    id: string;
    from: string;
    to: string;
    fromFull: string;
    toFull: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface defaultTimeSlotFormData {
    from: Date,
    to: Date,
}

export interface updateDefaultTimeSlotFormData {
    id: string,
    formData: defaultTimeSlotFormData,
}

export interface AppointmentFormData {
    timeSlotId: string
}
  