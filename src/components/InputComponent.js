import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, StyleSheet, Text, Animated } from "react-native";

const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = "default",
    style,
    errorMessage,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedLabelPosition, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: "absolute",
        left: 10,
        top: animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [13, -8],
        }),
        fontSize: animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: isFocused ? "#007BFF" : "#aaa",
        backgroundColor: "#fff",
        paddingHorizontal: 0,
    };

    return (
        <View style={styles.wrapper}>
            <View
                style={[
                    styles.container,
                    style,
                    { borderColor: errorMessage ? "red" : isFocused ? "#007BFF" : "#ccc" },
                ]}
            >
                <Animated.Text style={labelStyle}>{label}</Animated.Text>
                <TextInput
                    style={styles.input}
                    placeholder={isFocused ? "" : placeholder}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    textAlignVertical="center"
                />
            </View>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 12,
    },
    container: {
        position: "relative",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    input: {
        height: 50,
        fontSize: 16,
        color: "black",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4, 
    },
});
