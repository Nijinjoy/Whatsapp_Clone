import React, { useCallback, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Text,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import HeaderComponent from "../components/HeaderComponent";

const ChatScreen = ({ navigation }) => {
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "Hi there!",
            type: "received",
            timestamp: "10:00 AM",
        },
        {
            id: "2",
            text: "Hello!",
            type: "sent",
            timestamp: "10:01 AM",
        },
    ]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedTime = `${hours % 12 || 12}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;
        return formattedTime;
    };

    const sendMessage = useCallback(() => {
        if (messageText.trim() !== "") {
            const timestamp = getCurrentTime();
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: `${prevMessages.length + 1}`,
                    text: messageText,
                    type: "sent",
                    timestamp,
                },
            ]);
            setMessageText("");
        }
    }, [messageText]);

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.type === "sent" ? styles.sentContainer : styles.receivedContainer,
            ]}
        >
            <View
                style={[
                    styles.messageBubble,
                    item.type === "sent" ? styles.sentBubble : styles.receivedBubble,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent title="Chat Name" onBackPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={100}
            >
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.chatList}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="plus" size={24} color={colors.blue} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textbox}
                        value={messageText}
                        placeholder="Type a message"
                        onChangeText={(text) => setMessageText(text)}
                        onSubmitEditing={sendMessage}
                    />
                    {messageText === "" ? (
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="camera-alt" size={24} color={colors.blue} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                                style={[styles.iconButton, styles.sendButton]}
                            onPress={sendMessage}
                        >
                                <Feather name="send" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGrey,
    },
    screen: {
        flex: 1,
    },
    chatList: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        maxHeight: "70%",
    },
    messageContainer: {
        marginVertical: 5,
    },
    sentContainer: {
        alignItems: "flex-end",
    },
    receivedContainer: {
        alignItems: "flex-start",
    },
    messageBubble: {
        maxWidth: "75%",
        padding: 10,
        borderRadius: 10,
    },
    sentBubble: {
        backgroundColor: colors.blue,
        borderBottomRightRadius: 0,
    },
    receivedBubble: {
        backgroundColor: 'orange',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        fontSize: 16,
        color: "black",
    },
    timestamp: {
        fontSize: 12,
        color: "gray",
        marginTop: 3,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: colors.lightGrey,
    },
    textbox: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.lightGrey,
        marginHorizontal: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    iconButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    sendButton: {
        backgroundColor: colors.blue,
    },
});

export default ChatScreen;
