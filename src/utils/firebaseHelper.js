import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

let firebaseApp;
let firebaseAuth;
let googleProvider;

export const getFirebaseApp = () => {
    if (!firebaseApp) {
        const firebaseConfig = {
            apiKey: "AIzaSyAZJj-w35T2kWu7IRtPOnE84lOn6RIWwF0",
            authDomain: "chat-application-41487.firebaseapp.com",
            projectId: "chat-application-41487",
            storageBucket: "chat-application-41487.appspot.com", // Corrected storageBucket
            messagingSenderId: "230295587212",
            appId: "1:230295587212:web:e33243132c2914d777eea9",
            measurementId: "G-E69B2D97P3"
        };

        firebaseApp = initializeApp(firebaseConfig);
        firebaseAuth = getAuth(firebaseApp);
        googleProvider = new GoogleAuthProvider();
    }

    return firebaseApp;
};

export const getFirebaseAuth = () => {
    if (!firebaseAuth) {
        throw new Error("Firebase Auth has not been initialized. Call getFirebaseApp() first.");
    }
    return firebaseAuth;
};

export const getGoogleProvider = () => {
    if (!googleProvider) {
        throw new Error("Google Auth Provider has not been initialized. Call getFirebaseApp() first.");
    }
    return googleProvider;
};
