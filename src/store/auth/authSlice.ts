
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'not-authenticated', 'authenticated', 'checking'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (_, { payload }) => {
            return {
                status: 'authenticated',
                uid: payload.uid,
                email: payload.email,
                displayName: payload.displayName,
                photoURL: payload.photoURL,
                errorMessage: null
            }
        },
        logout: (_, { payload }) => {
            return {
                status: 'not-authenticated',
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
                errorMessage: payload
            }
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    },
});

export const authReducer = authSlice.reducer;

export const { login, logout, checkingCredentials } = authSlice.actions;