import React, { useContext, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Slider from '../components/slider';
import PetrolContext from '../context/PetrolContext';

const SettingsScreen = () => {
  const { width } = Dimensions.get('window');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { filters, setFilters } = useContext(PetrolContext);
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollableContainer}
        scrollEnabled={scrollEnabled}
      >
        <View style={styles.filtersContainer}>
          <View style={styles.row}>
            <Text>Filtrar por distancia(km):</Text>
            <View style={styles.slidercontainer}>
              <Slider
                width={width * 0.8}
                onValuesChange={(values) =>
                  setFilters({ ...filters, radio: values[0] })
                }
                minVal={1}
                maxVal={100}
                values={[filters.radio]}
                valueSuffix={'km'}
                disableScroll={() => setScrollEnabled(false)}
                enableScroll={() => setScrollEnabled(true)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollableContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  filtersContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'column',
  },
  slidercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    color: 'tomato',
  },
});
