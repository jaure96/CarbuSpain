import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      loadingEnabled={true}
      loadingIndicatorColor={'tomato'}
      style={styles.map}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
