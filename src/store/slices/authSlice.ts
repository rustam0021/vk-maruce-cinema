import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthMode = 'login' | 'registration' | 'success';

interface User {
    email: string;
    name?: string;
}

interface AuthState {
    isAuthModalOpen: boolean;
    user: User | null;
    authMode: AuthMode;
}

const initialState: AuthState = {
    isAuthModalOpen: false,
    user: null,
    authMode: 'login',
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 

        openAuthModal: (state, action: PayloadAction<AuthMode | undefined>) => {
            state.isAuthModalOpen = true;
            if(action.payload) {
                state.authMode = action.payload
            }
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        },

        // Установка пользователя при успешном входе
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthModalOpen = false; // Сразу закрываем модалку
        },

        setAuthType: (state, action: PayloadAction<AuthMode>) => {
            state.authMode = action.payload
        },

        // выход из системы
        logOut: (state) => {
            state.user = null;
        },
    }
})

export const { openAuthModal, closeAuthModal, setUser, logOut, setAuthType } = authSlice.actions;
export default authSlice.reducer;
