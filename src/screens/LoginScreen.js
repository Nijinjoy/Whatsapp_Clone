import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
    Image,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { email } from '../assets/images';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseHelper';
import { storeTokens } from '../utils/storageHelper';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (navigation) => {
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;
            console.log("Logged in user:", user);
            const idToken = await user.getIdToken();
            const refreshToken = user.stsTokenManager.refreshToken;
            const uid = user.uid;
            const userEmail = user.email;
            await storeTokens(idToken, refreshToken, uid, userEmail);
            setIsLoggedIn(true);
            Alert.alert("Success", "Login Successful!");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
        setLoading(false);
    };

    return (
        <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    <Image source={email} style={styles.emailImage} resizeMode="contain" />
                </View>
                <Text style={styles.title}>Sign in to Continue</Text>
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login </Text>}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
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

export default LoginScreen;
