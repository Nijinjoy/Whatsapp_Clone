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
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'ChatlistScreen') {
                        iconName = 'chat';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'Calls') {
                        iconName = 'phone-in-talk';
                    }
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    height: 65,
                    paddingTop: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen name="ChatlistScreen" component={ChatlistScreen} />
            <Tab.Screen name="Settings" component={SettingScreen} />
            <Tab.Screen name="Calls" component={CallScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isSplashDone, setIsSplashDone] = useState(false); 

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('idToken');
                if (token) {
                    setIsLoggedIn(true); // User is logged in
                } else {
                    setIsLoggedIn(false); // User is not logged in
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
            // Give a slight delay before finishing the splash screen
            setTimeout(() => {
                setIsSplashDone(true); // Finish splash screen after checking the status
            }, 2000); // Adjust this delay to control how long the splash screen stays visible
        };

        checkLoginStatus();
    }, []);

    if (!isSplashDone) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn === false ? (
                    <>
                        <Stack.Screen
                            name="RegisterScreen"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : isLoggedIn === true ? (
                    <Stack.Screen
                        name="Tabs"
                        component={BottomTabs}
                        options={{ headerShown: false }}
                    />
                    ) : (
                        <Stack.Screen
                                name="Splash"
                                component={SplashScreen}
                                options={{ headerShown: false }}
                            />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
