import React, { useState } from 'react';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigation (Only shown after login)
const BottomTabs = ({ setIsLoggedIn }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                const icons = {
                    ChatlistScreen: 'chat',
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
        <Tab.Screen name="ChatlistScreen" component={ChatlistScreen} options={{ tabBarLabel: 'Chats' }} />
        <Tab.Screen name="Settings" component={SettingScreen} />
        <Tab.Screen name="Calls" component={CallScreen} />
        <Tab.Screen name="Profile">
            {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
    </Tab.Navigator>
);

// Stack Navigation (Initial Screens)
const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
                {!isLoggedIn ? (
                    <>
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
                    </>
                ) : (
                    <>
                            <Stack.Screen name="BottomTabs">
                                {(props) => <BottomTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
                            </Stack.Screen>
                            <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
