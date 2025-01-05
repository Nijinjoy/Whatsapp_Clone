// RegisterScreen.js
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { registerIntersection } from '../assets/images';
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { getFirebaseApp } from '../utils/firebaseHelper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const app = getFirebaseApp();
    const auth = getAuth(app);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone number must be 10 digits";
        if (!form.password.trim()) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;  // Check if the form is valid
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            console.log("Registration Successful:", userCredential);

            // Get the ID token and save it to AsyncStorage
            const idToken = await userCredential.user.getIdToken();
            await AsyncStorage.setItem('idToken', idToken);
            console.log("ID Token Saved:", idToken);

            // Show success alert
            Alert.alert("Success", "You have successfully registered!");

            // Reset the navigation stack and navigate to the 'Tabs' stack (defaulting to 'Chats' screen)
            navigation.reset({
                index: 0, // Reset to the first route
                routes: [{ name: 'Tabs' }],  // Navigate to 'Tabs' screen
            });
            // Optionally navigate to the 'Chats' screen after resetting the stack
            navigation.navigate('Tabs', {
                screen: 'Chats',  // Navigate to the 'Chats' screen within the Tabs navigator
            });

        } catch (error) {
            console.log("Registration Error:", error);
            Alert.alert("Error", error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
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
                            <Image source={registerIntersection} style={styles.image} />
                            <Text style={styles.title}>Create Your Account</Text>
                        </View>
                        <View style={styles.formContainer}>
                            {["name", "email", "phone", "password"].map((field) => (
                                <InputComponent
                                    key={field}
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={form[field]}
                                    onChangeText={(value) => handleChange(field, value)}
                                    errorMessage={errors[field]}
                                    keyboardType={field === "phone" ? "phone-pad" : field === "email" ? "email-address" : "default"}
                                    secureTextEntry={field === "password"}
                                    iconName={field === "name" ? "account-circle" : field === "email" ? "email" : field === "phone" ? "phone" : "lock"}
                                />
                            ))}

                            <ButtonComponent
                                title={isLoading ? "Registering..." : "Register"}
                                onPress={handleRegister}
                                isLoading={isLoading}
                                disabled={isLoading}
                                buttonStyle={{ backgroundColor: isLoading ? "#a0c4e2" : "#007BFF" }}
                            />

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Already have an account?</Text>
                                <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                                    <Text style={styles.footerLink}> Login</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    imageContainer: { alignItems: "center", marginVertical: 20 },
    image: { width: 200, height: 200 },
    title: { fontSize: 24, fontWeight: "bold", marginTop: 10, color: "#333" },
    formContainer: { paddingHorizontal: 20 },
    footer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
    footerText: { fontSize: 14, color: "#555" },
    footerLink: { fontSize: 14, color: "#007BFF", fontWeight: "bold" },
});
