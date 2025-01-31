import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const SettingScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
          {
              _id: 1,
              text: 'Welcome to the chat!',
              createdAt: new Date(),
              user: {
                  _id: 2,
                  name: 'Support',
                  avatar: 'https://placeimg.com/140/140/any',
              },
          },
      ]);
  }, []);

    const onSend = useCallback((newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SettingScreen;
