import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import ChatScreen from '../screens/ChatScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CallScreen from '../screens/CallScreen';
import ChatlistScreen from '../screens/ChatlistScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = ({ setIsLoggedIn }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                const icons = {
                    Chats: 'chat',
                    Settings: 'settings',
                    Profile: 'person',
                    Calls: 'phone-in-talk',
                };
                return <MaterialIcons name={icons[route.name]} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: {
                height: 65,
                paddingTop: 5,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: 'white',
            },
            tabBarLabelStyle: { fontSize: 12 },
            keyboardHidesTabBar: true,
        })}
    >
        <Tab.Screen name="Chats" component={ChatlistScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
        <Tab.Screen name="Calls" component={CallScreen} />
        <Tab.Screen name="Profile">
            {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
    </Tab.Navigator>
);

const AuthStack = ({ setIsLoggedIn }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RegisterScreen">
            {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="WelcomeScreen">
            {(props) => <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="PhoneAuthScreen">
            {(props) => <PhoneAuthScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
    </Stack.Navigator>
);

const MainAppStack = ({ setIsLoggedIn }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabs">
            {(props) => <BottomTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
);

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // `null` means checking for token
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                setIsLoggedIn(!!userToken); // If token exists, set `true`; otherwise, `false`
            } catch (error) {
                console.error("Error checking user token:", error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // Stop loading after token check
            }
        };

        checkLoginStatus();
    }, []);

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="green" />
    //         </View>
    //     );
    // }

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainAppStack setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
        </NavigationContainer>
    );
};


export default Routes;
