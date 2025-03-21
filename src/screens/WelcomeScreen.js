import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { welcome } from '../assets/images';

const slides = [
    {
        id: 1,
        image: welcome,
        title: "Welcome to ChatApp",
        description: "Stay connected with friends and family with fast and secure messaging.",
    },
    {
        id: 2,
        image: welcome,
        title: "Instant Messaging",
        description: "Send text, voice, and media messages instantly.",
    },
    {
        id: 3,
        image: welcome,
        title: "Secure Conversations",
        description: "Your chats are end-to-end encrypted for privacy and security.",
    },
];

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = React.useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => navigation.replace('RegisterScreen')}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Swiper
                ref={swiperRef}
                loop={false}
                onIndexChanged={(index) => setCurrentIndex(index)}
                activeDotColor="#0073e6"
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {slides.map((slide, index) => (
                    <View key={slide.id} style={styles.container}>
                        <Image source={slide.image} style={styles.image} resizeMode="contain" />
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.description}>{slide.description}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (index === slides.length - 1) {
                                    navigation.replace('LoginScreen');
                                } else {
                                    swiperRef.current.scrollBy(1);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>
                                {index === slides.length - 1 ? "Get Started" : "Next"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0073e6',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    dot: {
        backgroundColor: '#ccc',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#0073e6',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    skipButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    skipText: {
        fontSize: 16,
        color: '#0073e6',
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
