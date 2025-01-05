import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch,
    TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState('Light'); // 'Light', 'Dark', 'Custom'
    const [editProfile, setEditProfile] = useState(false); // Toggle profile editing mode
    const [profileInfo, setProfileInfo] = useState({
        name: 'John Doe',
        phone: '+1 234 567 890',
        about: 'Hey there! I am a tech enthusiast.',
    });

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const changeTheme = (theme) => {
        setSelectedTheme(theme);
    };

    const handleEditProfile = () => {
        setEditProfile(!editProfile);
    };

    const handleProfileChange = (field, value) => {
        setProfileInfo({ ...profileInfo, [field]: value });
    };

    return (
      <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Profile</Text>
          </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Picture and Name */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=10' }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileDetails}>
                        {editProfile ? (
                            <TextInput
                                style={styles.profileInput}
                                value={profileInfo.name}
                                onChangeText={(text) => handleProfileChange('name', text)}
                            />
                        ) : (
                            <Text style={styles.profileName}>{profileInfo.name}</Text>
                        )}
                        {editProfile ? (
                            <TextInput
                                style={styles.profileInput}
                                value={profileInfo.phone}
                                onChangeText={(text) => handleProfileChange('phone', text)}
                            />
                        ) : (
                            <Text style={styles.profilePhone}>{profileInfo.phone}</Text>
                        )}
                    </View>
                    <TouchableOpacity style={styles.editPictureButton}>
                        <MaterialIcons name="photo-camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Actions Section */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.actionItem}>
                        <MaterialIcons name="edit" size={24} color="#075E54" />
                        <Text style={styles.actionText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <MaterialIcons name="lock" size={24} color="#075E54" />
                        <Text style={styles.actionText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <MaterialIcons name="language" size={24} color="#075E54" />
                        <Text style={styles.actionText}>Change Language</Text>
                    </TouchableOpacity>
                </View>

                {/* Notification Toggle */}
                <View style={styles.notificationSection}>
                    <Text style={styles.notificationText}>Enable Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        thumbColor={notificationsEnabled ? '#075E54' : '#f4f4f4'}
                        trackColor={{ false: '#ccc', true: '#81c784' }}
                    />
                </View>

                {/* Profile Theme Selector */}
                <View style={styles.themeSection}>
                    <Text style={styles.themeLabel}>Profile Theme</Text>
                    <View style={styles.themeOptions}>
                        {['Light', 'Dark', 'Custom'].map((theme) => (
                            <TouchableOpacity
                                key={theme}
                                style={[
                                    styles.themeButton,
                                    selectedTheme === theme && styles.activeThemeButton,
                                ]}
                                onPress={() => changeTheme(theme)}
                            >
                                <Text
                                    style={[
                                        styles.themeText,
                                        selectedTheme === theme && styles.activeThemeText,
                                    ]}
                                >
                                    {theme}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* About Section */}
                <View style={styles.aboutSection}>
                    <Text style={styles.aboutLabel}>About</Text>
                    {editProfile ? (
                        <TextInput
                            style={styles.aboutInput}
                            value={profileInfo.about}
                            onChangeText={(text) => handleProfileChange('about', text)}
                        />
                    ) : (
                        <Text style={styles.aboutText}>{profileInfo.about}</Text>
                    )}
                    <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                        <MaterialIcons name="edit" size={20} color="#075E54" />
                    </TouchableOpacity>
                </View>

                {/* Contact List */}
                <View style={styles.contactsSection}>
                    <Text style={styles.contactsLabel}>Your Contacts</Text>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>Jane Smith</Text>
                        <Text style={styles.contactPhone}>+1 234 567 891</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>Alice Johnson</Text>
                        <Text style={styles.contactPhone}>+1 234 567 892</Text>
                    </View>
                </View>
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
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#075E54',
    },
    profileDetails: {
        flex: 1,
        marginLeft: 15,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    profilePhone: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    profileInput: {
        fontSize: 16,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    editPictureButton: {
        backgroundColor: '#075E54',
        padding: 8,
        borderRadius: 20,
    },
    actionsSection: {
        marginVertical: 20,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    actionText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#000',
    },
    notificationSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    themeSection: {
        marginVertical: 20,
    },
    themeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    themeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    themeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeThemeButton: {
        backgroundColor: '#075E54',
    },
    themeText: {
        fontSize: 14,
        color: '#666',
    },
    activeThemeText: {
        color: '#fff',
    },
    aboutSection: {
        marginVertical: 20,
    },
    aboutLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    aboutText: {
        fontSize: 16,
        color: '#666',
    },
    aboutInput: {
        fontSize: 16,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#075E54',
        padding: 8,
        borderRadius: 5,
    },
    contactsSection: {
        marginVertical: 20,
    },
    contactsLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    contactName: {
        fontSize: 16,
        color: '#000',
    },
    contactPhone: {
        fontSize: 14,
        color: '#666',
    },
});

export default ProfileScreen;
