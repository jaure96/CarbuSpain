import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';
import PetrolContext from '../context/PetrolContext';
import { PetrolDataKeys } from '../types/Petrol';
import Location from '../types/Location';

const Map = () => {
  const mapViewRef = useRef<MapView>();
  const { hasLocation, initialPosition, userLocation, getCurrentLocation } =
    useLocation();
  const [region, setRegion] = useState<Location>(initialPosition);
  const [delta, setDelta] = useState({
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const {
    filteredData: { ListaEESSPrecio: gasStations },
  } = useContext(PetrolContext);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude },
    });
  };

  useEffect(() => {
    if (hasLocation) {
      setDelta({ latitudeDelta: 0.015, longitudeDelta: 0.0121 });
      setRegion(userLocation);
    }
  }, [userLocation, hasLocation]);

  return (
    <>
      <Fab iconName="ios-locate" style={styles.fab} onPress={centerPosition} />
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        toolbarEnabled={false}
        loadingEnabled={true}
        showsBuildings={false}
        loadingIndicatorColor={'tomato'}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton={false}
        region={{
          ...region,
          ...delta,
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
