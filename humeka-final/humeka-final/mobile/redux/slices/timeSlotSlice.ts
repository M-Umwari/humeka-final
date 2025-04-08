import { createSlice } from "@reduxjs/toolkit";
import {
  getActiveDates,
  getTimeSlotsByDate,
  createTimeSlot,
  getAllTimeSlots,
  createDefaultTimeSlot,
  getDefaultTimeSlots,
  updateDefaultTimeSlot,
  deleteDefaultTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
} from "../actions/timeSlotActions";
import { errorToast, successToast } from "@/utils/toast";
import { DefaultTimeSlot, TimeSlot } from "../../types/TimeSlot";
import { cancelAppointment, createAppointment } from "../actions/appointmentActions";


type IInitialState = {
  timeSlots: TimeSlot[];
  defaultTimeSlots: DefaultTimeSlot[];
  activeDates: string[];
  loading: boolean;
  fetching: boolean;
  status: "idle" | "successful" | "failed";
  tempStorage: TimeSlot | null
}

const timeSlotSlice = createSlice({
  name: "timeSlot",
  initialState: {
    timeSlots: [],
    defaultTimeSlots: [],
    activeDates: [],
    loading: false,
    fetching: false,
    status: "idle",
    tempStorage: null
  } as IInitialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    addTimeSlot: (state, action) => {
      state.tempStorage = action.payload
      state.timeSlots = [...state.timeSlots, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveDates.pending, (state) => {
        state.fetching = true
      })
      .addCase(getActiveDates.fulfilled, (state, action) => {
        state.fetching = false
        state.activeDates = action.payload;
      })
      .addCase(getActiveDates.rejected, (state, action) => {
        state.fetching = false
        errorToast(action.payload as string);
      })
      .addCase(getTimeSlotsByDate.pending, (state) => {
        state.fetching = true
      })
      .addCase(getTimeSlotsByDate.fulfilled, (state, action) => {
        state.fetching = false
        state.timeSlots = action.payload;
      })
      .addCase(getTimeSlotsByDate.rejected, (state, action) => {
        state.fetching = false
        errorToast(action.payload as string);
      })

      .addCase(createTimeSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.status = "successful"
        state.timeSlots = state.timeSlots.map(slot => slot.id === state.tempStorage!.id ? action.payload : slot)
        state.tempStorage = null
        successToast("Time slot created successfully");
      })
      .addCase(createTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        state.timeSlots = state.timeSlots.filter(slot => slot.id !== state.tempStorage!.id)
        state.tempStorage = null
        errorToast(action.payload as string);
      })
      .addCase(getAllTimeSlots.pending, (state) => {
        state.fetching = true
      })
      .addCase(getAllTimeSlots.fulfilled, (state, action) => {
        state.fetching = false
        state.timeSlots = action.payload
      })
      .addCase(getAllTimeSlots.rejected, (state, action) => {
        state.fetching = false
        errorToast(action.payload as string);
      })
      .addCase(updateTimeSlot.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.timeSlots = state.timeSlots.map((slot) =>
          slot.id === action.payload.id ? action.payload : slot
        );
        state.status = "successful"
        successToast("Time slot updated successfully");
      })
      .addCase(updateTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string);
      })
      .addCase(deleteTimeSlot.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.timeSlots = state.timeSlots.filter(
          (slot) => slot.id !== action.payload
        );
        state.status = "successful"
        successToast("Time slot deleted successfully");
      })
      .addCase(deleteTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string);
      })

      .addCase(createDefaultTimeSlot.pending, (state) => {
        state.loading = true
      })
      .addCase(createDefaultTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.defaultTimeSlots = [...state.defaultTimeSlots, action.payload]
        state.defaultTimeSlots.push(action.payload)
        state.status = "successful"
        successToast("Default time slot created successfully");
      })
      .addCase(createDefaultTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string);
      })
      .addCase(getDefaultTimeSlots.pending, (state) => {
        state.fetching = true
      })
      .addCase(getDefaultTimeSlots.fulfilled, (state, action) => {
        state.fetching = false
        state.defaultTimeSlots = action.payload
      })
      .addCase(getDefaultTimeSlots.rejected, (state, action) => {
        state.fetching = false
        errorToast(action.payload as string)
      })
      .addCase(updateDefaultTimeSlot.pending, (state) => {
        state.loading = true
      })
      .addCase(updateDefaultTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.defaultTimeSlots = state.defaultTimeSlots.map((slot) =>
          slot.id === action.payload.id ? action.payload : slot
        )
        state.status = "successful"
        successToast("Default time slot updated successfully");
      })
      .addCase(updateDefaultTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string);
      })
      .addCase(deleteDefaultTimeSlot.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDefaultTimeSlot.fulfilled, (state, action) => {
        state.loading = false
        state.defaultTimeSlots = state.defaultTimeSlots.filter(
          (slot) => slot.id !== action.payload
        )
        state.status = 'successful'
        successToast("Default time slot deleted successfully");
      })
      .addCase(deleteDefaultTimeSlot.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string);
      })
      
      .addCase(createAppointment.pending, (state) => {
        state.loading = true
      })
      .addCase(createAppointment.fulfilled, (state) => {
        state.loading = false
        successToast('Appointment scheduled successfully. Check your email for further details')
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false
        errorToast(action.payload as string)
      })

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false
        state.timeSlots = state.timeSlots.map((slot) =>
          slot.id === action.payload ? {...slot, appointment:null, isAvailable:true} : slot
        );
        state.status = "successful"
        successToast('Appointment cancellation successful')
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false
        state.status = "failed"
        errorToast(action.payload as string)
      })
  },
});

export const { resetStatus, addTimeSlot } = timeSlotSlice.actions;
export default timeSlotSlice.reducer;
