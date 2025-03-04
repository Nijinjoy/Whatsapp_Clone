import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
// import { login } from '../redux/slices/authSlice';
import { doc, setDoc } from 'firebase/firestore';
// import { storage } from '../firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileScreen = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [editMode, setEditMode] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: user?.fullName || 'John Doe', // Use Redux user name
        about: 'Hey there! I am using WhatsApp.',
        email: user?.email || 'johndoe@example.com',
    });

    const [profilePicture, setProfilePicture] = useState(
        'https://i.pravatar.cc/150?img=10'
    );
    const [newProfilePicture, setNewProfilePicture] = useState(null); // Store the new picture URI

    const navigation = useNavigation(); // Initialize navigation

    const handleEditProfile = () => {
        setEditMode(!editMode);
        if (!editMode) {
            dispatch(login({ ...user, fullName: profileInfo.name, email: profileInfo.email }));
            saveProfileToFirestore(profileInfo); // Save profile to Firestore when edited
        }
    };

    const handleProfileChange = (field, value) => {
        setProfileInfo({ ...profileInfo, [field]: value });
    };

    const saveProfileToFirestore = async (profileData) => {
        try {
            const userRef = doc(firestore, "users", user?.id || "default");
            await setDoc(userRef, profileData, { merge: true });
            console.log("Profile saved to Firestore!");
        } catch (error) {
            console.error("Error saving profile:", error);
        }
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
            // Upload the image to Firestore and get the image URL
            const uploadedUrl = await uploadToFirestore(result.uri);
            if (uploadedUrl) {
                // Set the image URL as the profile picture in the state
                setProfilePicture(uploadedUrl);
            }
        }
    };


    const uploadProfilePicture = async () => {
        if (!newProfilePicture) {
            return; // No new picture selected
        }
        const downloadUrl = await uploadToFirebase(newProfilePicture);
        if (downloadUrl) {
            setProfilePicture(downloadUrl);
            saveProfileToFirestore({ ...profileInfo, profilePicture: downloadUrl }); // Save updated profile with the new picture
        }
    };
    const uploadToFirestore = async (uri) => {
        try {
            // Convert image URI to blob and upload to Firebase Storage
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileName = `profile_pictures/${user?.id || "default"}_${Date.now()}.jpg`;

            // Here, Firebase storage will still be used temporarily
            const storageRef = ref(storage, fileName);
            await uploadBytes(storageRef, blob);

            const downloadUrl = await getDownloadURL(storageRef); // Get the image URL

            // Save the image URL to Firestore
            const db = getFirestore();
            const userRef = doc(db, 'users', user?.id || 'default');
            await setDoc(userRef, { profilePicture: downloadUrl }, { merge: true });

            // Update the local state with the new profile picture URL
            setProfilePicture(downloadUrl);

            return downloadUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Failed', 'An error occurred while uploading the image.');
            return null;
        }
    };

    useEffect(() => {
        if (newProfilePicture) {
            uploadProfilePicture(); // Automatically upload when a new picture is selected
        }
    }, [newProfilePicture]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profilePictureContainer}>
                    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                    <TouchableOpacity
                        style={styles.editPictureButton}
                            onPress={async () => {
                                console.log('Button pressed'); // Debugging line
                                await handleChangeProfilePicture();
                            }}
                    >
                        <MaterialIcons name="photo-camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Name</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={profileInfo.name}
                            onChangeText={(text) => handleProfileChange('name', text)}
                        />
                    ) : (
                            <Text style={styles.sectionText}>{user?.fullName || 'John Doe'}</Text>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Email</Text>
                    {editMode ? (
                        <TextInput
                            style={styles.input}
                            value={profileInfo.email}
                            onChangeText={(text) => handleProfileChange('email', text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    ) : (
                        <Text style={styles.sectionText}>{user?.email || 'johndoe@example.com'}</Text>
                    )}
                </View>

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

                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>
                        {editMode ? 'Save' : 'Edit Profile'}
                    </Text>
                    </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
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
        paddingBottom: 100, 
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
