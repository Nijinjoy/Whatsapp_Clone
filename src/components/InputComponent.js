import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import vector icons

const InputComponent = ({
    label,                // Input label text
    placeholder,          // Placeholder text
    value,                // Value for the input
    onChangeText,         // Handler for input changes
    secureTextEntry,      // For password input
    keyboardType = "default",
    errorMessage,         // Error message to display
    iconName,             // Icon name for the field
    style,                // Additional styles for the input
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputWrapper}>
                {iconName && <Icon name={iconName} size={20} color="#666" style={styles.icon} />}
                <TextInput
                    style={[styles.input, style]}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    );
};

export default InputComponent;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "black",
    },
    error: {
        marginTop: 4,
        color: "red",
        fontSize: 14,
    },
});
