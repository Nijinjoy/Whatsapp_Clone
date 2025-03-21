import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
    Image,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { validateRegistration } from '../utils/validationFile'
import { registerUser } from '../utils/authHelper'
import { storeUserData } from '../utils/databaseHelper'
import { storeTokens } from '../utils/storageHelper'
import { email } from '../assets/images';

const RegisterScreen = ({ navigation, setIsLoggedIn }) => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        console.log("Register button clicked");
        const { fullName, email, password, confirmPassword } = form;
        setLoading(true);
        try {
            console.log("Starting Firebase registration...");
            const user = await registerUser(email, password);
            const { uid, email: userEmail } = user;
            const idToken = await user.getIdToken();
            const refreshToken = user.refreshToken;
            console.log("Saving user details to Realtime Database...");
            await storeUserData(uid, fullName, userEmail);
            console.log("Saving tokens to AsyncStorage...");
            await storeTokens(idToken, refreshToken, uid, userEmail);
            console.log("User successfully registered!");
            setIsLoggedIn(true);
        } catch (error) {
            let errorMessage = "Registration failed. Please try again.";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This email is already in use.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email format.";
                    break;
                case "auth/weak-password":
                    errorMessage = "Weak password. Use at least 8 characters.";
                    break;
                default:
                    errorMessage = error.message || "Something went wrong!";
            }
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <Image source={email} style={styles.emailImage} resizeMode="contain" />
                </View>

                {/* <Text style={styles.title}>Sign Up</Text> */}

                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        placeholderTextColor="#999"
                        value={form.fullName}
                        onChangeText={(value) => handleChange("fullName", value)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                        value={form.email}
                        onChangeText={(value) => handleChange("email", value)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={(value) => handleChange("password", value)}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showConfirmPassword}
                        value={form.confirmPassword}
                        onChangeText={(value) => handleChange("confirmPassword", value)}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#666" />
                    </TouchableOpacity>
                </View>

                <View style={{ width: "100%", alignItems: "center" }}>
                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
                    </TouchableOpacity>
                </View>


                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.loginText}>
                        Already have an account? <Text style={styles.loginLink}>Log in</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: "#333",
    },
    button: {
        width: "100%",
        // maxWidth: 300,
        padding: 15,
        backgroundColor: 'red',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginText: {
        textAlign: "center",
        color: "white",
        marginTop: 15,
        fontSize: 14,
    },
    loginLink: {
        fontWeight: "bold",
        color: "#ff6b6b",
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    emailImage: {
        width: 200,
        height: 200,
    },

});

export default RegisterScreen;
