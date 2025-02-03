import React, { useState } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import { loginIntersection } from '../assets/images';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword } from '../utils/firebaseHelper';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import InputComponent from '../components/InputComponent';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail, validatePassword, validateConfirmPassword, validateRequiredField } from '../utils/validationFile';

const RegisterScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrors((prev) => ({
            ...prev,
            email: emailRegex.test(email) ? '' : 'Please enter a valid email address'
        }));
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        setErrors((prev) => ({
            ...prev,
            password: passwordRegex.test(password)
                ? ''
                : 'Password must be at least 6 characters and contain a number, lowercase and uppercase letter'
        }));
    };

    const validateConfirmPassword = (confirmPassword) => {
        setErrors((prev) => ({
            ...prev,
            confirmPassword: confirmPassword === formData.password ? '' : 'Passwords do not match'
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === 'email') validateEmail(value);
        if (field === 'password') validatePassword(value);
        if (field === 'confirmPassword') validateConfirmPassword(value);
    };

    const handleRegister = async () => {
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (errors.email || errors.password || errors.confirmPassword) {
            Alert.alert('Error', 'Please fix the errors before submitting');
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            await AsyncStorage.setItem('idToken', idToken);
            dispatch(login({ fullName: formData.fullName, email: user.email, uid: user.uid }));
            Alert.alert('Success', 'User registered successfully!');
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <LinearGradient colors={['#007BFF', '#0056D2']} style={styles.header}>
                        <Animatable.Image
                            animation="fadeInDown"
                            duration={1000}
                            source={loginIntersection}
                            style={styles.image}
                        />
                        <Animatable.Text animation="fadeInUp" duration={1000} style={styles.title}>
                            Welcome!
                        </Animatable.Text>
                        <Animatable.Text animation="fadeInUp" duration={1000} style={styles.subtitle}>
                            Create an account to get started
                        </Animatable.Text>
                    </LinearGradient>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formSection}>
                            {['fullName', 'email', 'password', 'confirmPassword'].map((field, index) => (
                                <Animatable.View key={field} animation="fadeInUp" duration={1000} delay={index * 200}>
                                    <InputComponent
                                        label={field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                                        placeholder={`Enter your ${field === 'fullName' ? 'full name' : field}`}
                                        iconName={field === 'email' ? 'email' : field === 'password' ? 'password' : 'lock'}
                                        value={formData[field]}
                                        onChangeText={(value) => handleInputChange(field, value)}
                                        secureTextEntry={field.includes('password') && !visibility[field]}
                                        errorMessage={errors[field]}
                                        onRightIconPress={() => setVisibility((prev) => ({ ...prev, [field]: !prev[field] }))}
                                    />
                                </Animatable.View>
                            ))}
                            <Animatable.View animation="fadeInUp" duration={1000} delay={1200}>
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
                            </Animatable.View>
                            <Animatable.View animation="fadeInUp" duration={1000} delay={1400} style={styles.signupPrompt}>
                                <Text style={styles.signupText}>Already have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                    <Text style={styles.signupLink}> Log In</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    </ScrollView>
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
        height: 80,
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
        padding: 15,
    },
    formSection: {
        marginTop: 0,
    },
    registerButton: {
        marginTop: 10,
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
        paddingBottom: 50,
        marginTop: 20
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
