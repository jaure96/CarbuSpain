import React, { useLayoutEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../routes/StackNavigator';
import { PetrolDataKeys } from '../types/Petrol';
import PetrolPrice from '../components/PetrolPrice';
import BasicMiniMap from '../components/BasicMiniMap';

interface Props extends StackScreenProps<RootStackParams, 'InfoScreen'> {}

const InfoScreen = ({ navigation, route }: Props) => {
  const gasStationData = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: gasStationData[PetrolDataKeys.sign],
      headerStyle: styles.header,
      headerBackgroundContainerStyle: styles.headerBackgroundContainerStyle,
      headerTitleContainerStyle: styles.headerTitleStyle,
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        <View style={styles.directionContainer}>
          <Text style={styles.titleLabel}>{PetrolDataKeys.direction}</Text>
          <View style={styles.subContainer}>
            <Text>{gasStationData[PetrolDataKeys.cp]}</Text>
            <Text>{gasStationData[PetrolDataKeys.direction]}</Text>
            <Text>{gasStationData[PetrolDataKeys.location]}</Text>
            <Text>{gasStationData[PetrolDataKeys.province]}</Text>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.titleLabel}>{PetrolDataKeys.schedule}</Text>
          <View style={styles.subContainer}>
            <Text>{gasStationData[PetrolDataKeys.schedule]}</Text>
          </View>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.titleLabel}>Precios de carburantes</Text>
          <View style={styles.subContainer}>
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_biodiesel]}
              label={PetrolDataKeys.price_biodiesel}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_bioetanol]}
              label={PetrolDataKeys.price_bioetanol}
            />
            <PetrolPrice
              price={
                gasStationData[PetrolDataKeys.price_compressed_natural_gas]
              }
              label={PetrolDataKeys.price_compressed_natural_gas}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_liquefied_natural_gas]}
              label={PetrolDataKeys.price_liquefied_natural_gas}
            />
            <PetrolPrice
              price={
                gasStationData[PetrolDataKeys.price_liquefied_petroleum_gas]
              }
              label={PetrolDataKeys.price_liquefied_petroleum_gas}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_a]}
              label={PetrolDataKeys.price_gasoil_a}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_b]}
              label={PetrolDataKeys.price_gasoil_b}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_premiun]}
              label={PetrolDataKeys.price_gasoil_premiun}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_95_e10]}
              label={PetrolDataKeys.price_gasoil_95_e10}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_95_e5]}
              label={PetrolDataKeys.price_gasoil_95_e5}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_95_e5_premiun]}
              label={PetrolDataKeys.price_gasoil_95_e5_premiun}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_98_e10]}
              label={PetrolDataKeys.price_gasoil_98_e10}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_gasoil_98_e5]}
              label={PetrolDataKeys.price_gasoil_98_e5}
            />
            <PetrolPrice
              price={gasStationData[PetrolDataKeys.price_hydrogen]}
              label={PetrolDataKeys.price_hydrogen}
            />
          </View>
        </View>
        <View style={styles.mapContainer}>
          <BasicMiniMap
            latitude={parseFloat(
              gasStationData[PetrolDataKeys.lat].replace(',', '.')
            )}
            longitude={parseFloat(
              gasStationData[PetrolDataKeys.long].replace(',', '.')
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'tomato',
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
  },
  headerBackgroundContainerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    marginTop: -30,
  },
  scrollableContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 30,
  },
  subContainer: {
    paddingLeft: 10,
  },
  titleLabel: {
    fontFamily: ' Tahoma, Geneva, sans-serif',
    fontSize: 17,
    fontWeight: 'bold',
  },
  directionContainer: {},
  scheduleContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  },
  mapContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
