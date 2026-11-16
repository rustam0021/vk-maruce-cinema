import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import trailerReducer from './slices/trailerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trailer: trailerReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;