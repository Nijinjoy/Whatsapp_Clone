import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Menu, Divider, Provider, IconButton } from 'react-native-paper';
import HeaderComponent from '../components/HeaderComponent';

const SettingScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <HeaderComponent
                    title="Settings"
                    leftIcon="menu"
                    onLeftPress={() => console.log('Left icon pressed!')}
                    rightIcon="more-vert"
                    onRightPress={openMenu} // Open Menu
                />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>SettingScreen Content</Text>
                </View>

                {/* Popover Menu */}
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <IconButton
                            icon="dots-vertical"
                            size={24}
                            onPress={openMenu}
                            style={{ position: 'absolute', top: 50, right: 20 }}
                        />
                    }
                >
                    <Menu.Item onPress={() => alert('Profile Clicked')} title="Profile" />
                    <Divider />
                    <Menu.Item onPress={() => alert('Settings Clicked')} title="Settings" />
                    <Divider />
                    <Menu.Item onPress={() => alert('Logout Clicked')} title="Logout" />
                </Menu>
            </View>
        </Provider>
    );
};

export default SettingScreen;
