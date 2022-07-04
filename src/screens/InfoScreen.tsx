import React, { useLayoutEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParams } from '../routes/StackNavigator';
import { PetrolDataKeys } from '../types/Petrol';

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
          <Text>{gasStationData[PetrolDataKeys.cp]}</Text>
          <Text>{gasStationData[PetrolDataKeys.direction]}</Text>
          <Text>{gasStationData[PetrolDataKeys.location]}</Text>
          <Text>{gasStationData[PetrolDataKeys.province]}</Text>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.titleLabel}>{PetrolDataKeys.schedule}</Text>
          <Text>{gasStationData[PetrolDataKeys.schedule]}</Text>
        </View>
        <View style={styles.scheduleContainer}>
          <Text style={styles.titleLabel}>Precios de carburantes</Text>
          <Text>{gasStationData[PetrolDataKeys.price_biodiesel]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_bioetanol]}</Text>
          <Text>
            {gasStationData[PetrolDataKeys.price_compressed_natural_gas]}
          </Text>
          <Text>
            {gasStationData[PetrolDataKeys.price_liquefied_natural_gas]}
          </Text>
          <Text>
            {gasStationData[PetrolDataKeys.price_liquefied_petroleum_gas]}
          </Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_a]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_b]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_premiun]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_95_e10]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_95_e5]}</Text>
          <Text>
            {gasStationData[PetrolDataKeys.price_gasoil_95_e5_premiun]}
          </Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_98_e10]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_gasoil_98_e5]}</Text>
          <Text>{gasStationData[PetrolDataKeys.price_hydrogen]}</Text>
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
  titleLabel: {
    fontFamily: ' Tahoma, Geneva, sans-serif',
    fontSize: 17,
    fontWeight: 'bold',
  },
  directionContainer: {},
  scheduleContainer: {
    marginTop: 10,
  },
});
