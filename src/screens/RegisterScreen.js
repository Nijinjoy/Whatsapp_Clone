import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { loginIntersection } from '../assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword, firestore } from '../utils/firebaseHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputComponent from '../components/InputComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const RegisterScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(text)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (text) => {
        setPassword(text);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(text)) {
            setPasswordError('Password must be at least 6 characters and contain a number, lowercase and uppercase letter');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (text) => {
        setConfirmPassword(text);
        if (text !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            return;
        }
        if (password !== confirmPassword) {
            return;
        }
        if (emailError || passwordError || confirmPasswordError) {
            Alert.alert('Error', 'Please fix the errors before submitting');
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            dispatch(login({ fullName, email: user.email, uid: user.uid }));
            // await AsyncStorage.setItem('idToken', idToken);
            Alert.alert('Success', 'User registered successfully!');
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Error', error.message);
        }
        finally {
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <LinearGradient colors={['#007BFF', '#0056D2']} style={styles.header}>
                        <Image source={loginIntersection} style={styles.image} />
                        <Text style={styles.title}>Welcome!</Text>
                        <Text style={styles.subtitle}>Create an account to get started</Text>
                    </LinearGradient>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formSection}>
                            <InputComponent
                                value={fullName}
                                onChangeText={setFullName}
                                placeholder="Enter your full name"
                                leftIcon={<MaterialIcons name="person" size={20} color="#007BFF" />}
                            />
                            <InputComponent
                                value={email}
                                onChangeText={validateEmail}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                errorMessage={emailError}
                                leftIcon={<MaterialIcons name="email" size={20} color="#007BFF" />}
                            />
                            <InputComponent
                                value={password}
                                onChangeText={validatePassword}
                                placeholder="Enter your password"
                                secureTextEntry={!passwordVisible}
                                errorMessage={passwordError}
                                leftIcon={<MaterialIcons name="lock" size={20} color="#007BFF" />}
                                rightIcon={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                            />
                            <InputComponent
                                value={confirmPassword}
                                onChangeText={validateConfirmPassword}
                                placeholder="Confirm your password"
                                secureTextEntry={!confirmPasswordVisible}
                                errorMessage={confirmPasswordError}
                                leftIcon={<MaterialIcons name="lock" size={20} color="#007BFF" />}
                                rightIcon={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            />
                            <TouchableOpacity
                                style={styles.registerButton}
                                onPress={handleRegister}
                                disabled={loading}
                            >
                                <LinearGradient colors={['#007BFF', '#0056D2']} style={styles.gradient}>
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={styles.registerButtonText}>Register</Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                    <View style={styles.signupPrompt}>
                        <Text style={styles.signupText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
        backgroundColor: '#f5f5f5',
    },
    inner: {
        flex: 1,
    },
    header: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
    },
    scrollContent: {
        padding: 20,
    },
    formSection: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
        borderRadius: 25,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 25,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    signupText: {
        fontSize: 14,
        color: '#000',
    },
    signupLink: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
