import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Icon library, you can replace it with another if needed.

const ButtonComponent = ({
    title,
    onPress,
    iconName,
    isLoading = false,
    disabled = false,
    buttonStyle,
    textStyle,
    iconStyle,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && !disabled && styles.pressed,
                disabled && styles.disabled,
                buttonStyle,
            ]}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <View style={styles.content}>
                    {iconName && <MaterialIcons name={iconName} size={20} color="#fff" style={iconStyle} />}
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 8,
    },
    pressed: {
        opacity: 0.8,
    },
    disabled: {
        backgroundColor: "#9E9E9E",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default ButtonComponent;
