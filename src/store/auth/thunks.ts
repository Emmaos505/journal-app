import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./authSlice"
import { Dispatch } from "@reduxjs/toolkit";

export const checkingAuthentication = (email: string = '', password: string = '') => {
    return async (dispatch: Dispatch) => {
        console.log({ email, password });
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle();
        if (!result.ok) {
            return dispatch(logout(result.errorMessage));
        }
        dispatch(login(result));
    }
}

interface RegisterArg {
    email: string,
    password: string;
    displayName: string;
}

export const startUserAndEmailSignIn = ({ email, password, displayName }: RegisterArg) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await registerUserWithEmailPassword({ email, displayName, password });
        if (!result.ok) {
            return dispatch(logout(result.errorMessage));
        }
        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword = ({ email, password }: { email: string, password: string }) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok) {
            return dispatch(logout(result.errorMessage))
        }
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        const result = await logoutFirebase()
        if (!result.ok) {
            return dispatch(logout(result.errorMessage))
        }
        dispatch(logout(null));
    }
}
