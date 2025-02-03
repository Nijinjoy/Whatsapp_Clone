import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = "default",
    errorMessage,
    style,
    onFocus,
    onBlur,
    iconName,
    iconSize = 24, // Default icon size
    iconColor = "#888", // Default icon color
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.wrapper, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                {
                    borderColor: errorMessage
                        ? "red"
                        : isFocused
                            ? "#007BFF"
                            : "#ccc",
                    backgroundColor: isFocused ? "#f9f9f9" : "#fff",
                },
            ]}>
                {iconName && (
                    <Icon name={iconName} size={iconSize} color={isFocused ? "#007BFF" : iconColor} style={styles.icon} />
                )}
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus && onFocus();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur && onBlur();
                    }}
                />
            </View>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

export default React.memo(InputField);

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1, 
        fontSize: 16,
        color: "#000",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
});
