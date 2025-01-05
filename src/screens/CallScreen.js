import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CallScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All'); // 'All', 'Missed', 'Incoming', 'Outgoing'

    // Sample call data
    const callData = [
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
    ];

    // Filtered Data
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
                        color={
                            item.type === 'missed' ? '#d32f2f' : '#075E54'
                        }
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
                <TouchableOpacity>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#075E54',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#000',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    filterTab: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeFilterTab: {
        backgroundColor: '#075E54',
    },
    filterText: {
        fontSize: 14,
        color: '#666',
    },
    activeFilterText: {
        color: '#fff',
    },
    callList: {
        paddingHorizontal: 10,
    },
    callItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    callDetails: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    callInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    time: {
        fontSize: 14,
        color: '#666',
        marginLeft: 5,
    },
});

export default CallScreen;
