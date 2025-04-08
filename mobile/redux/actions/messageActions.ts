import { Message, sendMessageFormData } from "@/types/Message";
import axios from "../../api/client";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const sendMessage = createAsyncThunk<Message, sendMessageFormData>("message/send", async (formData, thunkAPI) => {
    try {
        const response = await axios.post("messages", formData);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

export const getMessages = createAsyncThunk<Message[], string>("message/getAll", async (groupId, thunkAPI) => {
    try {
        const response = await axios.get(`messages/${groupId}`);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})