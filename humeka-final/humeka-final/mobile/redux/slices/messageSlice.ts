import { createSlice } from "@reduxjs/toolkit";
import { sendMessage, getMessages } from "../actions/messageActions";
import { errorToast } from "@/utils/toast";
import {Message} from '@/types/Message'

interface IinitialState {
    messages: Message[];
    fetching: boolean;
    loading: boolean;
    tempStorage: Message | null;
}

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        fetching: false,
        loading: false,
        tempStorage: null,
    } as IinitialState,
    reducers: {
        addMessageToTempStorage: (state, action) => {
            state.tempStorage = action.payload
            state.messages.push(action.payload)
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        clearMessages: (state) => {
            state.messages = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false
                state.messages = state.messages.map(message => message.id === state.tempStorage!.id ? action.payload : message)
                state.tempStorage = null
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false
                state.messages = state.messages.filter(message => message.id !== state.tempStorage!.id)
                state.tempStorage = null
                errorToast(action.payload as string)
            })

            .addCase(getMessages.pending, (state) => {
                state.fetching = true
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.fetching = false
                state.messages = action.payload
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.fetching = false
                errorToast(action.payload as string)
            })
    },
})

export const {addMessage, addMessageToTempStorage, clearMessages} = messageSlice.actions
export default messageSlice.reducer