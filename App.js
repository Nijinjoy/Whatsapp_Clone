import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/navigation/Routes'


const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
