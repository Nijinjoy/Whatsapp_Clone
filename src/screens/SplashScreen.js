import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withSpring,
    runOnJS,
} from "react-native-reanimated";
import logo from '../assets/images/logo/logo.png'

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
    const ballY = useSharedValue(-100);
    const ballScale = useSharedValue(1);
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        ballY.value = withTiming(height / 2 - 50, { duration: 1000 }, () => {
            ballScale.value = withSequence(
                withSpring(2, { stiffness: 150 }),
                withSpring(1),
                withSpring(2),
                withSpring(1, {}, () => {
                    ballScale.value = withTiming(50, { duration: 1000 }, () => {
                        runOnJS(setShowLogo)(true);
                    });
                })
            );
        });
    }, []);

    const ballStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: ballY.value },
            { translateX: width / 2 - 50 },
            { scale: ballScale.value },
        ],
    }));

    return (
        <View style={styles.container}>
            {!showLogo ? (
                <Animated.View style={[styles.ball, ballStyle]} />
            ) : (
                <View style={styles.logoContainer}>
                    <Image source={logo} tintColor='white' />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    ball: {
        width: 100,
        height: 100,
        backgroundColor: "blue",
        borderRadius: 50,
        position: "absolute",
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
    },
    logoText: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
    },
});

export default SplashScreen;
