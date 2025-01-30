import React, { useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../utils/notificationService';

export default function App() {
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync();

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification Received:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification Clicked:', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Test Notification 📢',
                body: 'This is a test push notification!',
                data: { test: 'data' },
            },
            trigger: { seconds: 5 },
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Push Notifications in Expo</Text>
            <Button title="Send Test Notification" onPress={sendTestNotification} />
        </View>
    );
}
