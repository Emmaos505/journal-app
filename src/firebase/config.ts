// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqhKWgMfv3zNIsC8rgLJ2EU89fM4YNaGE",
    authDomain: "journal-app-ed5cd.firebaseapp.com",
    projectId: "journal-app-ed5cd",
    storageBucket: "journal-app-ed5cd.firebasestorage.app",
    messagingSenderId: "198949570337",
    appId: "1:198949570337:web:282a3305a3dcfb743f2060"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);