import React, { useContext, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PetrolFilter from '../components/PetrolFilter';
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
            <Text style={styles.filterBlockTitle}>Distancia (km)</Text>
            <View style={styles.filter}>
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
          <View style={styles.row}>
            <Text style={styles.filterBlockTitle}>Carburantes</Text>
            <View style={styles.filter}>
              <PetrolFilter label="Gasoleo A" />
              <PetrolFilter label="Gasoleo B" />
              <PetrolFilter label="Gasoleo Premium" />
              <PetrolFilter label="Gasolina 95 E10" />
              <PetrolFilter label="Gasolina 95 E5" />
              <PetrolFilter label="Gasolina 98 E10" />
              <PetrolFilter label="Gasolina 98 E5" />
              <PetrolFilter label="Hidrogeno" />
              <PetrolFilter label="Gases licuados del petróleo" />
              <PetrolFilter label="Gas Natural Licuado" />
              <PetrolFilter label="Gas Natural Comprimido" />
              <PetrolFilter label="Biodiesel" />
              <PetrolFilter label="Bioetanol" />
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
  filter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  slider: {
    color: 'tomato',
  },
  filterBlockTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.7)',
    marginBottom: 5,
  },
});
