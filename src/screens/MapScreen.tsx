import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';

const MapScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Map />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
});
