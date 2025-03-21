import { ref, set } from "firebase/database";
import { database } from "./firebaseHelper";

export const storeUserData = async (uid, fullName, email) => {
    try {
        await set(ref(database, "users/" + uid), {
            fullName: fullName.trim(),
            email,
            uid,
            createdAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};
