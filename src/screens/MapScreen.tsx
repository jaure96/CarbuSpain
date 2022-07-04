import React, { useCallback } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import { RootStackParams } from '../routes/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'MapScreen'> {}

const MapScreen = ({ navigation }: Props) => {
  const handleMarkerClick = useCallback(
    (gasStationData: { [key: string]: string }) =>
      navigation.navigate('InfoScreen', gasStationData),
    [navigation]
  );

  return (
    <View style={styles.mainContainer}>
      <Map onMarkerClick={handleMarkerClick} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
