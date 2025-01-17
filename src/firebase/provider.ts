import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User, } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credential = await GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = (error as FirebaseError).code;
        const errorMessage = (error as FirebaseError).message;
        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
    try {

        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const user = result.user;
        const { photoURL, uid } = user;
        console.log('user', FirebaseAuth.currentUser);
        await updateProfile(FirebaseAuth.currentUser as User, { displayName });
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };

    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
};

export const loginWithEmailPassword = async ({ email, password }: { email: string, password: string }) => {
    try {
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
}

export const logoutFirebase = async () => {
    try {
        await FirebaseAuth.signOut();
        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: (error as FirebaseError).message
        }
    }
}