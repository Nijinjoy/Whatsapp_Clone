import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/ChatScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CallScreen from '../screens/CallScreen';
import ChatlistScreen from '../screens/ChatlistScreen';
import { SafeAreaView, Text } from 'react-native';
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Chatlist') {
                        iconName = 'chat';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'CallScreen') {
                        iconName = 'phone-in-talk';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Chatlist" component={ChatlistScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
            <Tab.Screen name="CallScreen" component={CallScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isSplashDone, setIsSplashDone] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
            try {
                const token = await AsyncStorage.getItem('idToken');
                if (token) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
            setIsSplashDone(true);
        }, 5000); 
    }, []);
    if (!isSplashDone) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn === null ? (
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                ) : isLoggedIn === false ? (
                        <>
                            <Stack.Screen
                                name="RegisterScreen"
                            component={RegisterScreen}
                            options={{ title: 'Register', headerShown: false }}
                        />
                            <Stack.Screen
                                name="LoginScreen"
                                component={LoginScreen}
                                options={{ title: 'Login', headerShown: false }}
                            />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Tabs"
                            component={BottomTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                            options={{
                                title: 'Chat',
                                headerStyle: { backgroundColor: '#6200ee' },
                                headerTintColor: '#fff',
                                headerTitleStyle: { fontWeight: 'bold' },
                            }}
                        />
                        <Stack.Screen
                            name="SettingScreen"
                            component={SettingScreen}
                            options={{
                                title: 'Settings',
                                headerStyle: { backgroundColor: '#6200ee' },
                                headerTintColor: '#fff',
                                headerTitleStyle: { fontWeight: 'bold' },
                            }}
                        />
                        <Stack.Screen
                            name="ChatlistScreen"
                            component={ChatlistScreen}
                            options={{
                                title: 'Chatlist',
                                headerStyle: { backgroundColor: '#6200ee' },
                                headerTintColor: '#fff',
                                headerTitleStyle: { fontWeight: 'bold' },
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
