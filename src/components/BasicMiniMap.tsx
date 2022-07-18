import React, { useState } from 'react';
import { Dimensions, Linking, Platform, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
  latitude: number;
  longitude: number;
  color: string;
}
const BasicMiniMap = ({ latitude, longitude, color }: Props) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const { width } = Dimensions.get('window');

  const onDirectionButton = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url as string);
  };
  return (
    <MapView
      style={{ ...styles.mapView, width: width * 0.8 }}
      cacheEnabled={true}
      loadingEnabled={true}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00221,
      }}
      loadingIndicatorColor={'tomato'}
      toolbarEnabled={false}
      onMapReady={() => setIsMapReady(true)}
      onPress={onDirectionButton}
    >
      {isMapReady && (
        <Marker coordinate={{ latitude, longitude }} pinColor={color} />
      )}
    </MapView>
  );
};

export default BasicMiniMap;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    minHeight: 200,
  },
  activitiIndicator: {
    marginVertical: 20,
  },
});
