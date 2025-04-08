import axios from "@/api/client";
import { Note, noteFormData, updateNoteFormData } from "@/types/Note";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createNote = createAsyncThunk<Note, noteFormData>('note/create', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('notes', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getNotes = createAsyncThunk<Note[]>('note/getAll', async(_, thunkAPI) => {
    try{
        const response = await axios.get('notes')
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const updateNote = createAsyncThunk<Note, updateNoteFormData>('note/update', async({id, formData}, thunkAPI) => {
    try{
        const response = await axios.patch(`notes/${id}`, formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const deleteNote = createAsyncThunk<string, string>('note/delete', async(id, thunkAPI) => {
    try{
        await axios.delete(`notes/${id}`)
        return id
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})