import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, StyleSheet, useColorScheme, KeyboardAvoidingView, ScrollView, Platform, Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { logo } from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, createUserWithEmailAndPassword, signOut, getAuth } from '../utils/firebaseHelper'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation()
    const [name, setName] = useState('John Doe');
    const [about, setAbout] = useState('Hey there! I am using this app.');
    const [profileImage, setProfileImage] = useState(null);
    const colorScheme = useColorScheme(); // Detect light or dark mode

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('userToken');
            setIsLoggedIn(false);  // ✅ Update state to trigger navigation
            Alert.alert("Logout Successful", "You have been logged out.");
        } catch (error) {
            console.error("Logout Error:", error);
            Alert.alert("Logout Failed", error.message);
        }
    };


    return (
        <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5' }]}>
            {/* Gradient Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    {/* Profile Picture */}
                    <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                        <Image
                            source={logo}
                            style={styles.profileImage}
                        />
                        <View style={styles.cameraIcon}>
                            <Ionicons name="camera" size={20} color="white" />
                        </View>
                    </TouchableOpacity>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your name"
                                placeholderTextColor="gray"
                            />
                            <Ionicons name="pencil" size={18} color="gray" />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>About</Text>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                value={about}
                                onChangeText={setAbout}
                                placeholder="Enter your about status"
                                placeholderTextColor="gray"
                            />
                            <Ionicons name="pencil" size={18} color="gray" />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <View style={styles.row}>
                            <FontAwesome name="phone" size={16} color="gray" />
                            <Text style={styles.phoneText}>+91 9876543210</Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 70,
        backgroundColor: '#075E54',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 15,
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 100,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#e0e0e0',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#25D366',
        borderRadius: 18,
        padding: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 5,
    },
    inputContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 16,
        color: 'black',
        flex: 1,
    },
    phoneText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
    },
    logoutButton: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#d9534f',
        paddingVertical: 14,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ProfileScreen;
