import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const chatData = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '12:30 PM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'Let’s catch up tomorrow.',
        time: '11:45 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://via.placeholder.com/50',
    },
];

const ChatlistScreen = ({ navigation }) => {
    const handleChatNavigation = (chat) => {
        navigation.navigate('ChatScreen', { chat });
    };

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => handleChatNavigation(item)}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* StatusBar */}
            <StatusBar backgroundColor="#075E54" barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <MaterialIcons name="search" size={24} color="#fff" style={styles.icon} />
                    <MaterialIcons name="more-vert" size={24} color="#fff" />
                </View>
            </View>

            {/* Chat List */}
            <FlatList
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={renderChatItem}
                contentContainerStyle={styles.chatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        backgroundColor: '#075E54',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 0, // No extra padding needed as StatusBar handles the top space
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    chatList: {
        paddingVertical: 10,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    chatMessage: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },
    chatTime: {
        fontSize: 12,
        color: '#888',
    },
});

export default ChatlistScreen;
