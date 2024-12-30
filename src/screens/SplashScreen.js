import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, StatusBar } from 'react-native';
import { logo } from '../assets/images';

const SplashScreen = () => {
    const animatedValues = Array.from({ length: 8 }, () => useRef(new Animated.Value(0)).current);

    useEffect(() => {
        Animated.stagger(150,
            animatedValues.map((value) =>
                Animated.timing(value, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                })
            )
        ).start();
    }, []);

    const renderAnimatedText = () => {
        const text = "BuzzChat";
        return text.split('').map((letter, index) => {
            const rotateY = animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '0deg'], // 3D rotation
            });

            const opacity = animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // Fade-in
            });

            return (
                <Animated.Text
                    key={index}
                    style={[
                        styles.text,
                        {
                            transform: [{ rotateY }],
                            opacity,
                        },
                    ]}
                >
                    {letter}
                </Animated.Text>
            );
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
            <Image source={logo} style={styles.logo} />
            <View style={styles.textContainer}>{renderAnimatedText()}</View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4a90e2',
    },
    logo: {
        width: 100,
        height: 100,
        // marginBottom: 20,
    },
    textContainer: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 2,
    },
});
