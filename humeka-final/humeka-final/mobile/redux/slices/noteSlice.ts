import { createSlice } from "@reduxjs/toolkit";
import { errorToast, successToast } from "@/utils/toast";
import { createNote, getNotes, updateNote, deleteNote } from "../actions/noteActions";
import { Note } from "@/types/Note";


interface InitialState {
    notes: Note[];
    isLoading: boolean;
    fetching: boolean
    updateState: 'idle'|'successful'|'failed',
    createState: 'idle'|'successful'|'failed',
    status: 'idle'|'successful'|'failed'
}

const initialState: InitialState = {
    notes: [],
    isLoading: false,
    fetching: false,
    updateState: 'idle',
    createState: 'idle',
    status:'idle'
};

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetUpdateState: (state) => {
            state.updateState = 'idle'
        },
        resetCreateState: (state) => {
            state.createState = 'idle'
        },
        resetStatus: (state) => {
            state.status = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes.splice(0, 0, action.payload);
                state.createState = 'successful'
                successToast("Entry created successfully");
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.createState = 'failed'
                errorToast(action.payload as string);
            })
            .addCase(getNotes.pending, (state) => {
                state.fetching = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.fetching = false;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                errorToast(action.payload as string);
            })
            .addCase(updateNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
                state.updateState = 'successful'
                successToast("Entry updated successfully");
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false;
                state.updateState = 'failed'
                errorToast(action.payload as string);
            })
            .addCase(deleteNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = state.notes.filter(note => note.id !== action.payload);
                state.status = 'successful'
                successToast("Entry deleted successfully");
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed'
                errorToast(action.payload as string);
            });
    },
});

export const {resetUpdateState, resetCreateState, resetStatus} = noteSlice.actions
export default noteSlice.reducer;