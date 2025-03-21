import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../config/firebaseConfig";
import { auth } from "./firebaseHelper";

export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
        if (!userCredential.user) throw new Error("User registration failed");

        return userCredential.user;
    } catch (error) {
        console.error("Auth Error:", error);
        throw error;
    }
};
