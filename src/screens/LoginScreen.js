import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';

const InputField = ({ icon, placeholder, secureTextEntry, value, onChangeText, toggleSecure }) => (
    <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color="#aaa" style={styles.icon} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
        />
        {toggleSecure && (
            <TouchableOpacity onPress={toggleSecure}>
                <Ionicons name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={20} color="#aaa" />
            </TouchableOpacity>
        )}
    </View>
);

const SocialButton = ({ icon, text, onPress, color }) => (
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: color }]} onPress={onPress}>
        <FontAwesome name={icon} size={20} color="#fff" />
        <Text style={styles.socialButtonText}>{text}</Text>
    </TouchableOpacity>
);

const LoginScreen = () => {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        expoClientId: 'YOUR_EXPO_CLIENT_ID',
    });

    const handleGoogleLogin = async () => {
        const result = await promptAsync();
        if (result?.type === 'success') console.log('Google Login Success:', result);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formSection}>
                            <Text style={styles.formTitle}>Login to your account</Text>
                            <InputField icon="mail-outline" placeholder="Email" />
                            <InputField
                                icon="lock-closed-outline"
                                placeholder="Password"
                                secureTextEntry={!passwordVisible}
                                toggleSecure={() => setPasswordVisible(!passwordVisible)}
                            />
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <Text style={styles.orText}>OR</Text>
                            <SocialButton icon="google" text="Sign in with Google" onPress={handleGoogleLogin} color="#DB4437" />
                        </View>
                    </ScrollView>
                    <View style={styles.signupPrompt}>
                        <Text style={styles.signupText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={styles.signupLink}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    inner: { flex: 1 },
    formSection: { marginTop: 20, paddingHorizontal: 20 },
    scrollContent: { paddingBottom: 40 },
    formTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
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
    icon: { marginRight: 10 },
    input: { flex: 1, height: 50, fontSize: 16, color: '#333' },
    loginButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 2,
    },
    loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    forgotPasswordText: { marginTop: 15, fontSize: 14, color: '#007BFF', textAlign: 'center' },
    orText: { textAlign: 'center', marginVertical: 20, fontSize: 14, fontWeight: 'bold', color: '#555' },
    socialButton: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    signupPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    signupText: { fontSize: 14, color: '#555' },
    signupLink: { fontSize: 14, color: '#007BFF', fontWeight: 'bold' },
});
