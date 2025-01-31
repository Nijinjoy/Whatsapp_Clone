import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { NavigationContainer } from '@react-navigation/native';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = ({ setIsLoggedIn }) => {
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
                tabBarActiveTintColor: 'green',
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
            <Tab.Screen
                name="ChatlistScreen"
                component={ChatlistScreen}
                options={{ tabBarLabel: 'Chats' }}
            />
            <Tab.Screen name="Settings" component={SettingScreen} />
            <Tab.Screen name="Calls" component={CallScreen} />
            <Tab.Screen name="Profile">
                {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

// Main Routes Component
const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSplashDone, setIsSplashDone] = useState(false);

    // Check login status on app load
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('idToken');
                if (token) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
            setTimeout(() => {
                setIsSplashDone(true);
            }, 2000); // Simulate a 2-second splash screen
        };
        checkLoginStatus();
    }, []);

    // Show SplashScreen until it's done
    if (!isSplashDone) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="RegisterScreen"
                            options={{ headerShown: false }}
                        >
                            {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="LoginScreen"
                            options={{ headerShown: false }}
                        >
                            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="PhoneAuthScreen"
                            options={{ headerShown: false }}
                        >
                            {(props) => <PhoneAuthScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                            <Stack.Screen
                                name="BottomTabs"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <BottomTabs {...props} setIsLoggedIn={setIsLoggedIn} />
                                )}
                            </Stack.Screen>
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
