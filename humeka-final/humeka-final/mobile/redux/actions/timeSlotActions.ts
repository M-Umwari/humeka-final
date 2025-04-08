import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/api/client";
import { DefaultTimeSlot, defaultTimeSlotFormData, TimeSlot, TimeSlotFormData, updateDefaultTimeSlotFormData, updateTimeSlotFormData } from "@/types/TimeSlot";


export const getActiveDates = createAsyncThunk<string[], string>(
  "timeSlots/getActiveDates",
  async (counselorId, thunkAPI) => {
    try {
      const response = await axios.get(`timeSlots/activedates/${counselorId}`);
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTimeSlotsByDate = createAsyncThunk<TimeSlot[], {counselorId: string, date: string}>(
  "timeSlots/getTimeSlotsByDate",
  async ({counselorId, date}, thunkAPI) => {
    try {
      const response = await axios.get(`timeSlots/activedates/${counselorId}/${date}`)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createTimeSlot = createAsyncThunk<TimeSlot, TimeSlotFormData>(
  "timeSlots/createTimeSlot",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("timeSlots", formData)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getAllTimeSlots = createAsyncThunk<TimeSlot[], string>(
  "timeSlots/getAllTimeSlots",
  async (counselorId, thunkAPI) => {
    try {
      const response = await axios.get(`timeSlots/counselor/${counselorId}`)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createDefaultTimeSlot = createAsyncThunk<DefaultTimeSlot, defaultTimeSlotFormData>(
  "timeSlots/createDefaultTimeSlot",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("timeSlots/default", formData)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
);

export const getDefaultTimeSlots = createAsyncThunk<DefaultTimeSlot[]>(
  "timeSlots/getDefaultTimeSlots",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("timeSlots/default")
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateDefaultTimeSlot = createAsyncThunk<DefaultTimeSlot, updateDefaultTimeSlotFormData>(
  "timeSlots/updateDefaultTimeSlot",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(`timeSlots/default/${id}`, formData)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteDefaultTimeSlot = createAsyncThunk<string, string>(
  "timeSlots/deleteDefaultTimeSlot",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`timeSlots/default/${id}`)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateTimeSlot = createAsyncThunk<TimeSlot, updateTimeSlotFormData>(
  "timeSlots/updateTimeSlot",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(`timeSlots/${id}`, formData)
      return response.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteTimeSlot = createAsyncThunk<string, string>(
  "timeSlots/deleteTimeSlot",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`timeSlots/${id}`)
      return id
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)