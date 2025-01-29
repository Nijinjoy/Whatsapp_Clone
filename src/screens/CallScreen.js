import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    Alert,
    Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';

const CallScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const [contacts, setContacts] = useState([]); // State to store device contacts
    const [modalY] = useState(new Animated.Value(300)); // Animation for modal sliding up

    const [callData, setCallData] = useState([
        {
            id: '1',
            name: 'John Doe',
            type: 'incoming',
            time: 'Yesterday, 4:30 PM',
            avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: '2',
            name: 'Jane Smith',
            type: 'outgoing',
            time: 'Today, 10:15 AM',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            type: 'missed',
            time: 'Today, 7:45 AM',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        {
            id: '4',
            name: 'Alice Brown',
            type: 'incoming',
            time: 'Today, 8:15 AM',
            avatar: 'https://i.pravatar.cc/150?img=4',
        },
    ]); // Sample call data

    // Fetch contacts from device
    const fetchContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });
            setContacts(data); // Store fetched contacts
        } else {
            Alert.alert('Permission Denied', 'We need access to your contacts');
        }
    };

    // Call fetchContacts when the modal is shown
    useEffect(() => {
        if (isModalVisible) {
            fetchContacts();
            // Animate modal sliding up from the bottom
            Animated.spring(modalY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        } else {
            // Animate modal sliding down when closed
            Animated.spring(modalY, {
                toValue: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isModalVisible]);

    // Filtered Call Data
    const filteredData = callData.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesFilter =
            filter === 'All' || item.type.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Render Call Item
    const renderCallItem = ({ item }) => (
        <TouchableOpacity style={styles.callItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.callDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.callInfo}>
                    <MaterialIcons
                        name={
                            item.type === 'incoming'
                                ? 'call-received'
                                : item.type === 'outgoing'
                                    ? 'call-made'
                                    : 'call-missed'
                        }
                        size={18}
                        color={item.type === 'missed' ? '#d32f2f' : '#075E54'}
                    />
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <MaterialIcons name="call" size={24} color="#075E54" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Static Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Calls</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <MaterialIcons name="group-add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={20} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search calls"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                {['All', 'Missed', 'Incoming', 'Outgoing'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setFilter(tab)}
                        style={[
                            styles.filterTab,
                            filter === tab && styles.activeFilterTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                filter === tab && styles.activeFilterText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Call List */}
            <FlatList
                data={filteredData}
                renderItem={renderCallItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.callList}
            />

            {/* Modal to View Contacts */}
            <Modal
                visible={isModalVisible}
                animationType="none" // Disable default animation
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <Animated.View
                    style={[styles.modalOverlay, { transform: [{ translateY: modalY }] }]}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <MaterialIcons name="close" size={30} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Your Contacts</Text>

                        <FlatList
                            data={contacts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.contactItem}>
                                    <Text style={styles.contactName}>{item.name}</Text>
                                    {item.phoneNumbers?.[0]?.number && (
                                        <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                </Animated.View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#075E54',
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingLeft: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    filterTab: {
        padding: 10,
    },
    activeFilterTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#075E54',
    },
    filterText: {
        fontSize: 16,
    },
    activeFilterText: {
        color: '#075E54',
    },
    callList: {
        paddingBottom: 20,
    },
    callItem: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    callDetails: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    callInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        marginLeft: 5,
        color: '#999',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // Position at the bottom
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '60%',
        backgroundColor: '#fff',
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#075E54',
        borderRadius: 25,
        padding: 8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    contactItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    contactName: {
        fontSize: 18,
        color: '#333',
    },
    contactNumber: {
        fontSize: 16,
        color: '#666',
    },
});

export default CallScreen;

