import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent = ({
    title,
    leftIcon = "arrow-back", // Default left icon
    onLeftPress,
    rightIcon = "settings", // Default right icon
    onRightPress
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Left Icon */}
            <TouchableOpacity onPress={onLeftPress || (() => navigation.goBack())} style={styles.iconContainer}>
                <MaterialIcons name={leftIcon} size={24} color="white" />
            </TouchableOpacity>

            {/* Title in Center */}
            <Text style={styles.title}>{title}</Text>

            {/* Right Icon */}
            <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
                <MaterialIcons name={rightIcon} size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#075E54', // WhatsApp-like header color
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1, // Centering title properly
    },
    iconContainer: {
        padding: 5,
    },
});
