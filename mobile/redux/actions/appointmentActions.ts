import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/client";
import { Appointment, AppointmentFormData } from "@/types/TimeSlot";
  

export const createAppointment = createAsyncThunk<Appointment, AppointmentFormData>(
  "appointments/createAppointment",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("appointments", formData)
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
);

export const cancelAppointment = createAsyncThunk<string, string>(
  "appointments/cancelAppointment",
  async (appointmentId, thunkAPI) => {
    try {
      await axios.delete(`appointments/${appointmentId}`)
      return appointmentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)