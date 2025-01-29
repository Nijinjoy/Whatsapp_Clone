import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ setIsLoggedIn }) => {
    const [editMode, setEditMode] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: 'John Doe',
        about: 'Hey there! I am using WhatsApp.',
    });
    const [profilePicture, setProfilePicture] = useState(
        'https://i.pravatar.cc/150?img=10'
    );

    const navigation = useNavigation(); // Initialize navigation

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleProfileChange = (field, value) => {
        setProfileInfo({ ...profileInfo, [field]: value });
    };

    const handleChangeProfilePicture = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            setProfilePicture(result.uri);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log Out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Clear the token from AsyncStorage
                            await AsyncStorage.removeItem('idToken');
                            // Update the login state
                            setIsLoggedIn(false);
                            // Navigate to the login screen
                            navigation.navigate('LoginScreen');
                        } catch (error) {
                            console.error('Error logging out:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Picture */}
                <View style={styles.profilePictureContainer}>
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                    <TouchableOpacity
                        style={styles.editPictureButton}
                        onPress={handleChangeProfilePicture}
                    >
                        <MaterialIcons name="photo-camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Name Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Name</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={profileInfo.name}
                            onChangeText={(text) => handleProfileChange('name', text)}
                        />
                    ) : (
                        <Text style={styles.sectionText}>{profileInfo.name}</Text>
                    )}
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>About</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={profileInfo.about}
                            onChangeText={(text) => handleProfileChange('about', text)}
                        />
                    ) : (
                        <Text style={styles.sectionText}>{profileInfo.about}</Text>
                    )}
                </View>

                {/* Edit Button */}
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>
                        {editMode ? 'Save' : 'Edit Profile'}
                    </Text>
                </TouchableOpacity>

                {/* Log Out Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#075E54',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#075E54',
    },
    editPictureButton: {
        position: 'absolute',
        bottom: 0,
        right: 100,
        backgroundColor: '#075E54',
        padding: 8,
        borderRadius: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    sectionText: {
        fontSize: 18,
        color: '#000',
    },
    input: {
        fontSize: 18,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    editButton: {
        backgroundColor: '#075E54',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    editButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
