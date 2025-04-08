import { createSlice } from "@reduxjs/toolkit";
import { cancelGroupSession, createGroup, createGroupSession, getGroups, getGroupSessions, getOwnGroupSessions, joinGroup, leaveGroup } from "../actions/groupActions";
import { errorToast, successToast } from "@/utils/toast";
import { Group, GroupSession } from "@/types/Group";

interface IinitialState {
    groups: Group[],
    fetching: boolean,
    loading: boolean,
    status: 'idle'|'successful'|'failed',
    createStatus: 'idle'|'successful'|'failed',
    sessionFetching: boolean,
    sessionLoading: boolean,
    sessionStatus: 'idle'|'successful'|'failed',
    groupSessions: GroupSession[],
    ownGroupSessions: GroupSession[]
};

const groupSlice = createSlice({
    name: "group",
    initialState:{
        groups: [],
        fetching: false,
        loading: false,
        status:'idle',
        createStatus: 'idle',
        sessionFetching: false,
        sessionLoading: false,
        sessionStatus: 'idle',
        groupSessions: [],
    ownGroupSessions: []
    } as IinitialState,
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle'
        },
        resetCreateStatus: (state) => {
            state.createStatus = 'idle'
        },
        resetSessionStatus: (state) => {
            state.sessionStatus = 'idle'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = [...state.groups, action.payload]
                state.createStatus = 'successful'
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.createStatus = 'failed'
                errorToast(action.payload as string);
            })

            .addCase(getGroups.pending, (state) => {
                state.fetching = true
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.fetching = false
                state.groups = action.payload
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.fetching = false
                errorToast(action.payload as string);
            })

            .addCase(joinGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(joinGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = state.groups.map((group) =>
                    group.id === action.payload.id ? action.payload : group
                );
                state.status = 'successful'
            })
            .addCase(joinGroup.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                errorToast(action.payload as string);
            })

            .addCase(leaveGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(leaveGroup.fulfilled, (state, action) => {
                state.loading = false
                state.groups = state.groups.map((group) =>
                    group.id === action.payload.id ? action.payload : group
                );
                state.status = 'successful'
                successToast('You have left the group successfully')
            })
            .addCase(leaveGroup.rejected, (state, action) => {
                state.loading = false
                state.status = 'failed'
                errorToast(action.payload as string);
            })

            .addCase(createGroupSession.pending, (state) => {
                state.sessionLoading = true
            })
            .addCase(createGroupSession.fulfilled, (state, action) => {
                state.sessionLoading = false
                state.ownGroupSessions = [...state.ownGroupSessions, action.payload]
                state.sessionStatus = 'successful'
                successToast('Group Session created successfully')
            })
            .addCase(createGroupSession.rejected, (state, action) => {
                state.sessionLoading = false
                state.sessionStatus = 'failed'
                errorToast(action.payload as string);
            })
            
            .addCase(getGroupSessions.pending, (state) => {
                state.sessionFetching = true
            })
            .addCase(getGroupSessions.fulfilled, (state, action) => {
                state.sessionFetching = false
                state.groupSessions = action.payload
            })
            .addCase(getGroupSessions.rejected, (state, action) => {
                state.sessionFetching = false
                errorToast(action.payload as string);
            })

            .addCase(getOwnGroupSessions.pending, (state) => {
                state.sessionFetching = true
            })
            .addCase(getOwnGroupSessions.fulfilled, (state, action) => {
                state.sessionFetching = false
                state.ownGroupSessions = action.payload
            })
            .addCase(getOwnGroupSessions.rejected, (state, action) => {
                state.sessionFetching = false
                errorToast(action.payload as string);
            })

            .addCase(cancelGroupSession.pending, (state) => {
                state.sessionLoading = true
            })
            .addCase(cancelGroupSession.fulfilled, (state, action) => {
                state.sessionLoading = false
                state.ownGroupSessions = state.ownGroupSessions.filter((session) => session.id !== action.payload)
                state.sessionStatus = 'successful'
            })
            .addCase(cancelGroupSession.rejected, (state, action) => {
                state.sessionLoading = false
                state.sessionStatus = 'failed'
                errorToast(action.payload as string);
            })          
    },
});

export const {resetStatus, resetCreateStatus, resetSessionStatus} = groupSlice.actions
export default groupSlice.reducer;