import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

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
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.wrapper, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: errorMessage
                            ? "red"
                            : isFocused
                                ? "#007BFF" // Blue border on focus
                                : "#ccc",
                        backgroundColor: isFocused ? "#f9f9f9" : "#fff", // Light background on focus
                    },
                ]}
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
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

export default React.memo(InputField);

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 6,
        color: "#333",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#000",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
});
