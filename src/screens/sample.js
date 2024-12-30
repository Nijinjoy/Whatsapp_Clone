import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { logo } from '../assets/images';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
    const logoPosition = useRef(new Animated.Value(0)).current;
    const letterAnimations = Array.from({ length: 8 }, () => useRef(new Animated.Value(0)).current);

    useEffect(() => {
        Animated.timing(logoPosition, {
            toValue: -(width / 10),
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.stagger(
                150,
                letterAnimations.map((anim) =>
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    })
                )
            ).start();
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
            <View style={styles.animationRow}>
                <Animated.View
                    style={[
                        styles.logoContainer,
                        { transform: [{ translateX: logoPosition }] },
                    ]}
                >
                    <Image source={logo} style={styles.logo} />
                </Animated.View>
                {Array.from('BuzzChat').map((letter, index) => (
                    <Animated.Text
                        key={index}
                        style={[
                            styles.text,
                            { opacity: letterAnimations[index] },
                        ]}
                    >
                        {letter}
                    </Animated.Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4a90e2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        tintColor: 'white',
    },
    textContainer: {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 40,
    },
});

export default SplashScreen;
