import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, createUserWithEmailAndPassword } from '../utils/firebaseHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation, setIsLoggedIn }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleRegister = async () => {
        console.log("Register button clicked");
        if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        setLoading(true);
        console.log("Starting Firebase registration...");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            console.log("User registered:", userCredential);
            if (!userCredential.user) {
                throw new Error("User registration failed");
            }
            const idToken = await userCredential.user.getIdToken();
            const refreshToken = userCredential.user.refreshToken;
            const userId = userCredential.user.uid;
            const userEmail = userCredential.user.email;
            console.log("Saving tokens to AsyncStorage...");
            await Promise.all([
                AsyncStorage.setItem('userToken', idToken),
                AsyncStorage.setItem('refreshToken', refreshToken),
                AsyncStorage.setItem('userId', userId),
                AsyncStorage.setItem('userEmail', userEmail)
            ]);
            console.log("User successfully registered and logged in!");
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Firebase Error:", error);

            let errorMessage = 'Registration failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use. Please use a different one.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email format. Please enter a valid email.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Weak password. Please use at least 8 characters with letters & numbers.';
            }
            Alert.alert('Error', errorMessage);
        } finally {
            console.log("Finished registration process");
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        height: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007BFF',
        fontSize: 14,
    },
});

export default RegisterScreen;
