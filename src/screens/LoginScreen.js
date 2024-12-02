import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/InputComponent"; // Common input component
import loginIntersection from "../assets/images/loginIntersection/loginIntersection.png";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleLogin = () => {
        let isValid = true;

        if (!email) {
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
            isValid = false;
        }
        if (!password) {
            setErrors((prev) => ({ ...prev, password: "Password is required" }));
            isValid = false;
        }

        if (isValid) {
            console.log("Login Successful", { email, password });
        }
    };

    const handleForgotPassword = () => {
        console.log("Forgot Password pressed");
    };

    const handleSignup = () => {
        console.log("Sign Up pressed");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.imageContainer}>
                        <Image source={loginIntersection} style={styles.image} />
                        <Text style={styles.loginText}>Login</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <InputComponent
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            keyboardType="email-address"
                            errorMessage={errors.email}
                            iconName="email" // Add email icon
                        />
                        <InputComponent
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setErrors((prev) => ({ ...prev, password: "" }));
                            }}
                            secureTextEntry
                            errorMessage={errors.password}
                            iconName="lock" // Add password icon
                        />

                        <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account?</Text>
                            <Pressable onPress={handleSignup}>
                                <Text style={styles.signupLink}> Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    loginText: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#4a90e2",
        fontSize: 14,
        fontWeight: "600",
    },
    button: {
        backgroundColor: "#4a90e2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signupText: {
        fontSize: 14,
        color: "#aaa",
    },
    signupLink: {
        fontSize: 14,
        color: "#4a90e2",
        fontWeight: "600",
    },
});



// import loginIntersection from '../assets/images/loginIntersection/loginIntersection.png'
