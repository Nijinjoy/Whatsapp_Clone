import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/InputComponent";
import { useNavigation } from "@react-navigation/native";
import { loginIntersection } from "../assets/images";
import { initializeApp } from "firebase/app";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateInputs()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                console.log("Login Successful", { email, password });
            }, 2000);
        }
    };

    const handleLoginWithOtp = () => {
        navigation.navigate("OtpLoginScreen");
    };

    const handleForgotPassword = () => {
        console.log("Forgot Password pressed");
    };

    const handleSignup = () => {
        navigation.navigate("RegisterScreen");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.imageContainer}>
                            <Image source={loginIntersection} style={styles.image} />
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Welcome Back!</Text>
                            <Text style={styles.subtitle}>
                                Log in to connect and chat with your friends seamlessly.
                            </Text>

                            <InputComponent
                                label="Email Address"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                }}
                                iconName="email"
                                errorMessage={errors.email}
                            />

                            <InputComponent
                                label="Password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors((prev) => ({ ...prev, password: "" }));
                                }}
                                secureTextEntry
                                errorMessage={errors.password}
                                iconName="lock"
                            />

                            <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, loading && styles.disabledButton]}
                                onPress={handleLogin}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Login</Text>
                                )}
                            </Pressable>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Don’t have an account?</Text>
                                <Pressable onPress={handleSignup}>
                                    <Text style={styles.signupLink}> Sign Up</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
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
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 5 },
    },
    disabledButton: {
        backgroundColor: "#a0c4e2",
    },
    otpButton: {
        backgroundColor: "#FFA726", 
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
    googleButton: {
        backgroundColor: "#db4a39",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
    },
    googleButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
