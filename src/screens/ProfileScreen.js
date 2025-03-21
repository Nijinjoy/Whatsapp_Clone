import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, database, storage } from '../utils/firebaseHelper';
import { ref, set, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import HeaderComponent from '../components/HeaderComponent'; // Import your custom header

const ProfileScreen = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setEmail(currentUser.email);
                console.log("User UID:===>", currentUser.uid);

                // 🔹 Fetch user details from Firebase
                const userRef = ref(database, `users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setName(userData.name || "");
                    setAbout(userData.about || "");
                    setProfileImage(userData.profileImage || null);
                }
            } else {
                console.log("User not authenticated.");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const uploadImageAndSaveData = async () => {
        if (!name || !about) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        setUploading(true);
        let imageUrl = profileImage;

        if (profileImage && !profileImage.startsWith("http")) {
            try {
                const response = await fetch(profileImage);
                const blob = await response.blob();
                const imageRef = storageRef(storage, `profileImages/${user.uid}.jpg`);
                await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(imageRef);
            } catch (error) {
                Alert.alert("Error", "Failed to upload image");
                setUploading(false);
                return;
            }
        }

        set(ref(database, `users/${user.uid}`), {
            name,
            email,
            about,
            profileImage: imageUrl,
        })
            .then(() => Alert.alert("Success", "Profile updated successfully!"))
            .catch((error) => Alert.alert("Error", error.message))
            .finally(() => setUploading(false));
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00A86B" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderComponent
                title="My Profile"
                leftIcon="arrow-back"
                onLeftPress={() => console.log("Back pressed")}
                rightIcon="edit"
                onRightPress={() => console.log("Edit profile pressed")}
            />

            {/* Wrapped the content with padding */}
            <View style={styles.content}>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.pickImageText}>Pick Image</Text>
                    )}
                </TouchableOpacity>

                <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Enter Email" value={email} editable={false} />
                <TextInput style={[styles.input, styles.aboutInput]} placeholder="About" value={about} onChangeText={setAbout} multiline />

                <TouchableOpacity style={styles.button} onPress={uploadImageAndSaveData} disabled={uploading}>
                    <Text style={styles.buttonText}>{uploading ? "Uploading..." : "Submit"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        backgroundColor: "#fff" 
    },
    content: {
        paddingHorizontal: 20, // Add padding for content only
        width: "100%",
        alignItems: "center" 
    },
    imagePicker: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15 
    },
    profileImage: { 
        width: "100%",
        height: "100%",
        borderRadius: 60 
    },
    pickImageText: {
        color: "#555" 
    },
    input: { 
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10 
    },
    aboutInput: {
        height: 80,
        textAlignVertical: "top" 
    },
    button: {
        backgroundColor: "#00A86B",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%" 
    },
    buttonText: {
        color: "#fff",
        fontSize: 16, 
        fontWeight: "bold" 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

});

export default ProfileScreen;
