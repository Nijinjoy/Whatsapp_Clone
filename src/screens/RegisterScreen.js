import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { loginIntersection } from '../assets/images';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onNavigate = () => {
        navigation.navigate("LoginScreen")
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/* Header Section */}
                    <LinearGradient colors={['#007BFF', '#0056D2']} style={styles.header}>
                        <Image source={loginIntersection} style={styles.image} />
                        <Text style={styles.title}>Welcome!</Text>
                        <Text style={styles.subtitle}>Create an account to get started</Text>
                    </LinearGradient>

                    {/* Form Section */}
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formSection}>
                            <Text style={styles.formTitle}>Register your account</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color="#aaa"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#aaa"
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color="#aaa"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#aaa"
                                    keyboardType="email-address"
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color="#aaa"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!passwordVisible}
                                />
                                <TouchableOpacity
                                    onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Ionicons
                                        name={
                                            passwordVisible ? 'eye-off-outline' : 'eye-outline'
                                        }
                                        size={20}
                                        color="#aaa"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color="#aaa"
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#aaa"
                                    secureTextEntry={!confirmPasswordVisible}
                                />
                                <TouchableOpacity
                                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                    <Ionicons
                                        name={
                                            confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'
                                        }
                                        size={20}
                                        color="#aaa"
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                    {/* Login Prompt */}
                    <View style={styles.signupPrompt}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={onNavigate}>
                            <Text style={styles.signupLink}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    inner: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#e0e0e0',
    },
    formSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 50,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        marginTop: 15,
        fontSize: 14,
        color: '#007BFF',
        textAlign: 'center',
    },
    socialLoginSection: {
        marginTop: 20,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: 'center',
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
    },
    signupPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    signupText: {
        fontSize: 14,
        color: '#555',
    },
    signupLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    },
});

