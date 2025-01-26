import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderComponent = ({ title, onBackPress }) => {
    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                <MaterialIcons name="arrow-back" size={24} color="#fff" onPress={onBackPress} />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View style={styles.headerIcons}>
                <MaterialIcons name="search" size={24} color="#fff" style={styles.icon} />
                <MaterialIcons name="more-vert" size={24} color="#fff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#075E54',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10, // Add some space between the icon and the title
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
});

export default HeaderComponent;

