import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SettingScreen = () => {
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    // Function to handle opening social media links
    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
    };

    // Function to handle language change
    const changeLanguage = (language) => {
        setSelectedLanguage(language);
        setLanguageModalVisible(false); // Close the modal after selection
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <TouchableOpacity style={styles.profileImageWrapper} onPress={() => { /* Logic to change profile image */ }}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?img=3' }} // Placeholder profile picture
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>John Doe</Text>
                        <Text style={styles.profileStatus}>Hey there! I am using WhatsApp.</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name="edit" size={20} color="#075E54" />
                    </TouchableOpacity>
                </View>

                {/* Settings Options */}
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="person" size={24} color="#075E54" />
                    <Text style={styles.optionText}>Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="lock" size={24} color="#075E54" />
                    <Text style={styles.optionText}>Privacy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="notifications" size={24} color="#075E54" />
                    <Text style={styles.optionText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="data-usage" size={24} color="#075E54" />
                    <Text style={styles.optionText}>Storage and Data</Text>
                </TouchableOpacity>

                {/* App Language Option */}
                <TouchableOpacity style={styles.option} onPress={() => setLanguageModalVisible(true)}>
                    <MaterialIcons name="language" size={24} color="#075E54" />
                    <Text style={styles.optionText}>App Language</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="info" size={24} color="#075E54" />
                    <Text style={styles.optionText}>About</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]}>
                    <MaterialIcons name="logout" size={24} color="red" />
                    <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
                </TouchableOpacity>

                {/* Social Media Links */}
                <Text style={styles.socialMediaHeader}>Follow Us On</Text>

                {/* Instagram */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => openLink('https://www.instagram.com')}
                >
                    <MaterialIcons name="instagram" size={24} color="#E1306C" />
                    <Text style={styles.optionText}>Instagram</Text>
                </TouchableOpacity>

                {/* Facebook */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => openLink('https://www.facebook.com')}
                >
                    <MaterialIcons name="facebook" size={24} color="#3b5998" />
                    <Text style={styles.optionText}>Facebook</Text>
                </TouchableOpacity>

                {/* Threads */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => openLink('https://www.threads.net')}
                >
                    <MaterialIcons name="forum" size={24} color="#0A7E56" />
                    <Text style={styles.optionText}>Threads</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal for Language Selection */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={languageModalVisible}
                onRequestClose={() => setLanguageModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>

                        {/* Language Options */}
                        {['English', 'Spanish', 'French', 'German', 'Hindi'].map((language) => (
                            <TouchableOpacity
                                key={language}
                                style={styles.languageOption}
                                onPress={() => changeLanguage(language)}
                            >
                                <Text
                                    style={selectedLanguage === language ? styles.selectedLanguage : styles.languageText}
                                >
                                    {language}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setLanguageModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#075E54', // WhatsApp green header color
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between', // Space out the sections
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    profileImageWrapper: {
        padding: 5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#075E54',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileStatus: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    editButton: {
        padding: 8,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#000',
    },
    socialMediaHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    languageOption: {
        paddingVertical: 10,
    },
    languageText: {
        fontSize: 16,
        color: '#000',
    },
    selectedLanguage: {
        fontSize: 16,
        color: '#075E54',
        fontWeight: 'bold',
    },
    modalButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#075E54',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SettingScreen;
