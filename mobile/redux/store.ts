import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './slices/noteSlice'
import userReducer from './slices/userSlice'
import timeSlotReducer from './slices/timeSlotSlice'
import groupReducer from './slices/groupSlice'
import messageReducer from './slices/messageSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
    timeSlot: timeSlotReducer,
    group: groupReducer,
    message: messageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
