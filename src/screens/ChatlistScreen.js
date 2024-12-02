import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatlistScreen = ({ navigation }) => {
    const handleChatNavigation = () => {
        navigation.navigate('ChatScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat List</Text>
            <TouchableOpacity onPress={handleChatNavigation} style={styles.chatButton}>
                <Text style={styles.chatButtonText}>Go to Chat Screen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chatButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatlistScreen;
