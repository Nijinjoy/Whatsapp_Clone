import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logo } from '../assets/images';

const SplashScreen = ({ setIsLoggedIn }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const checkUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user token:', error);
                setIsLoggedIn(false);
            }
        };
        checkUserToken();
    }, []);


    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
            </Animated.View>
            <Text style={styles.appName}>WanderChat</Text>
            <Text style={styles.tagline}>Connect. Chat. Explore.</Text>
            <View style={styles.progressBarContainer}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004D40',
    },
    logo: {
        width: 110,
        height: 120,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold', 
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Poppins-Regular',
        marginBottom: 20,
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 50,
        width: '40%',
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
});

export default SplashScreen;
