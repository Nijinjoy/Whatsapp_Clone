import React, { useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

const chatData = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '12:30 PM',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'Let’s catch up tomorrow.',
        time: '11:45 AM',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '3',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '4',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: '5',
        name: 'Alex Johnson',
        lastMessage: 'Got it. Thanks!',
        time: '10:15 AM',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
];

const ChatlistScreen = ({ navigation }) => {
    const swipeableRefs = useRef({});

    const handleChatNavigation = (chat) => {
        navigation.navigate('ChatScreen', { chat });
    };

    const renderRightActions = (progress, dragX, item) => {
        const scale = dragX.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0.8],
            extrapolate: 'clamp',
        });

        const opacity = dragX.interpolate({
            inputRange: [-150, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.actionsContainer}>
                <Animated.View style={{ transform: [{ scale }], opacity }}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEdit(item)}
                    >
                        <MaterialIcons name="edit" size={24} color="#fff" />
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale }], opacity }}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDelete(item.id)}
                    >
                        <MaterialIcons name="delete" size={24} color="#fff" />
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    const handleEdit = (item) => {
        alert(`Editing chat: ${item.name}`);
    };

    const handleDelete = (id) => {
        alert(`Deleting chat with ID: ${id}`);
    };

    const renderChatItem = ({ item }) => (
        <Swipeable
            ref={(ref) => (swipeableRefs.current[item.id] = ref)}
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
            onSwipeableWillOpen={() => {
                Object.keys(swipeableRefs.current).forEach((key) => {
                    if (key !== item.id && swipeableRefs.current[key]) {
                        swipeableRefs.current[key].close();
                    }
                });
            }}
            friction={2}
            overshootFriction={8} 
        >
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
        </Swipeable>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#075E54" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <MaterialIcons name="search" size={24} color="#fff" style={styles.icon} />
                    <MaterialIcons name="more-vert" size={24} color="#fff" />
                </View>
            </View>
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
        paddingTop: 0,
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
        paddingVertical: 0,
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
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: '100%',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    actionText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
    },
});

export default ChatlistScreen;
