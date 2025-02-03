import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { MaterialIcons } from '@expo/vector-icons';

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const SettingScreen = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState(null);

    useEffect(() => {
      registerForPushNotificationsAsync();
  }, []);

    // Function to register for notifications
    async function registerForPushNotificationsAsync() {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert('Permission required', 'Please enable notifications in settings.');
                return;
            }

            // Get Expo Push Token
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            setExpoPushToken(token);
            console.log('Expo Push Token:', token);
        } else {
            Alert.alert('Must use physical device for notifications');
        }
    }

    // Function to send a test notification
    async function sendTestNotification() {
        if (!expoPushToken) {
            Alert.alert('No Token', 'Expo Push Token not available. Enable notifications first.');
            return;
        }

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Test Notification',
            body: 'This is a test push notification!',
            data: { screen: 'HomeScreen' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
        body: JSON.stringify(message),
    });

      Alert.alert('Notification Sent', 'Check your device for the notification.');
  }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Settings</Text>

          {/* Notification Toggle */}
          <View style={styles.settingItem}>
              <Text style={styles.settingText}>Enable Notifications</Text>
              <Switch
                  value={isEnabled}
                  onValueChange={(value) => {
                      setIsEnabled(value);
                      if (value) registerForPushNotificationsAsync();
                  }}
              />
          </View>

          {/* Send Test Notification Button */}
          <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
              <Text style={styles.buttonText}>Send Test Notification</Text>
          </TouchableOpacity>
      </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingText: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
