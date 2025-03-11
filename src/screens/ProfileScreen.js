import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity, StyleSheet, useColorScheme, KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { logo } from '../assets/images';

const ProfileScreen = () => {
    const [name, setName] = useState('John Doe');
    const [about, setAbout] = useState('Hey there! I am using WhatsApp');
    const [profileImage, setProfileImage] = useState(null);
    const colorScheme = useColorScheme(); // Detect dark mode

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

    return (
        <View style={styles.container}>
            {/* Main Content */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value based on your bottom tab height
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled" // Dismiss keyboard on tap outside
                >
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

                    {/* Name Section */}
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

                    {/* About Section */}
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

                    {/* Phone Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <View style={styles.row}>
                            <FontAwesome name="phone" size={16} color="gray" />
                            <Text style={styles.phoneText}>+91 9876543210</Text>
                        </View>
                    </View>
            </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Tab */}
            <View style={styles.bottomTab}>
                <Text style={styles.bottomTabText}>Bottom Tab</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 100, // Add padding to avoid overlap with the bottom tab
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#e0e0e0',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#25D366',
        borderRadius: 18,
        padding: 6,
    },
    inputContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
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
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60, // Adjust height as needed
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    bottomTabText: {
        fontSize: 16,
        color: 'black',
    },
});

export default ProfileScreen;
