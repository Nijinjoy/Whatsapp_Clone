import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { database } from "../utils/firebaseHelper";
import { ref, onValue, push, set, remove } from "firebase/database";

const ChatlistScreen = ({ navigation }) => {
    const [chatData, setChatData] = useState([]);

    useEffect(() => {
        const chatListRef = ref(database, "chats/");
        const unsubscribe = onValue(chatListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const chatsArray = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].name,
                    avatar: data[key].avatar,
                    lastMessage: data[key].lastMessage || "No messages yet",
                    lastMessageTime: data[key].lastMessageTime || 0,
                }));
                chatsArray.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

                setChatData(chatsArray);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChatNavigation = (chat) => {
        navigation.navigate("ChatScreen", {
            chatId: chat.id,
            chatName: chat.name
        }, { animationEnabled: false });

    };

    const createNewChat = () => {
        const newChatRef = push(ref(database, "chats/"));
        const newChat = {
            name: "New Chat",
            lastMessage: "",
            avatar: "https://i.pravatar.cc/150?img=5",
            messages: [],
        };
        set(newChatRef, newChat);
        navigation.navigate("ChatScreen", { chatId: newChatRef.key, chatName: newChat.name });
    };

    const formatDateTime = (timestamp) => {
        if (!timestamp) return "No messages yet";
        const correctedTimestamp = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp;
        const date = new Date(correctedTimestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-GB");
        }
    };

    const deleteChat = (chatId) => {
        Alert.alert(
            "Delete Chat",
            "Are you sure you want to permanently delete this chat?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        remove(ref(database, `chats/${chatId}`)) // Delete from Firebase
                            .then(() => console.log("Chat deleted successfully"))
                            .catch((error) => console.error("Error deleting chat:", error));
                    },
                },
            ]
        );
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#075E54" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chats</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <MaterialIcons name="search" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="more-vert" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={() => handleChatNavigation(item)}
                        onLongPress={() => deleteChat(item.id)}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={styles.chatInfo}>
                            <Text style={styles.chatName}>{item.name}</Text>
                            <Text style={styles.chatMessage} numberOfLines={1}>
                                {item.lastMessage || "No messages yet"}
                            </Text>
                        </View>
                        <Text style={styles.chatTime}>{formatDateTime(item.lastMessageTime)}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.newChatButton} onPress={createNewChat}>
                <MaterialIcons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECE5DD",
    },
    header: {
        height: 80,
        backgroundColor: "#075E54",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    headerIcons: {
        flexDirection: "row",
    },
    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    chatInfo: {
        flex: 1,
        marginLeft: 15,
    },
    chatName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    chatMessage: {
        fontSize: 14,
        color: "#666",
    },
    newChatButton: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "#25D366",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    chatTime: {
        fontSize: 12,
        color: "#666",
        alignSelf: "flex-end",
    },

});

export default ChatlistScreen;
