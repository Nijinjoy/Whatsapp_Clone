import React, { useCallback, useState } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/Colors";
import { wallpaper } from "../assets/images";
import HeaderComponent from "../components/HeaderComponent";

const ChatScreen = ({ navigation }) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = useCallback(() => {
        setMessageText("");
    }, [messageText]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Attach HeaderComponent directly below the status bar */}
            <HeaderComponent title="Chat Name" onBackPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={100}
            >
                <ImageBackground source={wallpaper} style={styles.backgroundImage} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textbox}
                        value={messageText}
                        placeholder="Enter your message"
                        onChangeText={(text) => setMessageText(text)}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Pressed!")}>
                        <Feather name="plus" size={24} color={colors.blue} />
                    </TouchableOpacity>
                    {messageText === "" ? (
                        <TouchableOpacity style={styles.mediaButton} onPress={() => console.log("Pressed!")}>
                            <Feather name="camera" size={24} color={colors.blue} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                                style={[styles.mediaButton, styles.sendButton]}
                            onPress={sendMessage}
                        >
                            <Feather name="send" size={20} color={"white"} />
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
        backgroundColor: 'white',
    },
    screen: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: -5,
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
    },
    textbox: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: colors.lightGrey,
        marginHorizontal: 15,
        paddingHorizontal: 12,
        fontSize: 16,
        textAlignVertical: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    mediaButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
        borderRadius: 45,
    },
    sendButton: {
        backgroundColor: colors.blue,
        borderRadius: 50,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ChatScreen;
