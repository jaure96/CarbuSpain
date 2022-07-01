import React, { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';
import PetrolContext from '../context/PetrolContext';
import { PetrolDataKeys } from '../types/Petrol';

const Map = () => {
  const mapViewRef = useRef<MapView>();
  const { hasLocation, initialPosition, getCurrentLocation } = useLocation();
  const {
    data: { ListaEESSPrecio: gasStations },
  } = useContext(PetrolContext);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Fab iconName="ios-locate" style={styles.fab} onPress={centerPosition} />
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        toolbarEnabled={false}
        loadingEnabled={true}
        loadingIndicatorColor={'tomato'}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          ...initialPosition,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {gasStations.map((gasStation) => {
          return (
            <Marker
              key={gasStation[PetrolDataKeys.id_eess]}
              coordinate={{
                latitude: parseFloat(
                  gasStation[PetrolDataKeys.lat].replace(',', '.')
                ),
                longitude: parseFloat(
                  gasStation[PetrolDataKeys.long].replace(',', '.')
                ),
              }}
              title={gasStation[PetrolDataKeys.sign]}
            />
          );
        })}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});
