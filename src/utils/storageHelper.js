import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTokens = async (idToken, refreshToken, uid, userEmail) => {
    try {
        await AsyncStorage.multiSet([
            ["userToken", idToken],
            ["refreshToken", refreshToken],
            ["userId", uid],
            ["userEmail", userEmail]
        ]);
    } catch (error) {
        console.error("AsyncStorage Error:", error);
    }
};
