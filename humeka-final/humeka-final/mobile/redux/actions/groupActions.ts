import axios from "@/api/client";
import { createGroupFormData, createGroupSessionFormData, Group, groupFormData, GroupSession } from "@/types/Group";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createGroup = createAsyncThunk<Group, createGroupFormData>("group/create", async (formData, thunkAPI) => {
    try {
        const response = await axios.post("groups", formData)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
});

export const getGroups = createAsyncThunk<Group[]>("group/getAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("groups")
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const joinGroup = createAsyncThunk<Group, string>("group/join", async (groupId, thunkAPI) => {
    try {
        const response = await axios.post("groups/join", { groupId })
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
});

export const leaveGroup = createAsyncThunk<Group, string>("group/leave", async (groupId, thunkAPI) => {
    try {
        const response = await axios.post("groups/leave", { groupId })
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const createGroupSession = createAsyncThunk<GroupSession, createGroupSessionFormData>("group/createSession", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(`groups/sessions`, formData)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const getGroupSessions = createAsyncThunk<GroupSession[]>("group/getSessions", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`groups/sessions`)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const getOwnGroupSessions = createAsyncThunk<GroupSession[]>("group/getOwnSessions", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`groups/sessions/own`)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})

export const cancelGroupSession = createAsyncThunk<string, string>("group/cancelSession", async (sessionId, thunkAPI) => {
    try {
        await axios.delete(`groups/sessions/${sessionId}`)
        return sessionId
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})