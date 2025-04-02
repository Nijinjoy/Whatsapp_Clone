import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { logo } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;

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
        ]).start(() => {
            setTimeout(() => {
                navigation.replace('RegisterScreen');
            }, 2000);
        });
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
        backgroundColor: '#1E1E2D', // Main background color (use this everywhere)
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
