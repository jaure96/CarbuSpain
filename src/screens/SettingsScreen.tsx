import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PetrolFilter from '../components/PetrolFilter';
import Slider from '../components/slider';
import PetrolContext from '../context/PetrolContext';

const SettingsScreen = () => {
  const { width } = Dimensions.get('window');
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { filters, setFilters } = useContext(PetrolContext);

  const handlePriceFilterChange = useCallback(
    (value: number, filterKey: string) => {
      if (value !== filters[filterKey]) {
        setFilters({ ...filters, [filterKey]: value });
      }
    },
    [filters, setFilters]
  );

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
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_a}
                filterKey={'price_gasoil_a'}
                onValueChange={handlePriceFilterChange}
                label="Gasoleo A"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_b}
                filterKey={'price_gasoil_b'}
                onValueChange={handlePriceFilterChange}
                label="Gasoleo B"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_premiun}
                filterKey={'price_gasoil_premiun'}
                onValueChange={handlePriceFilterChange}
                label="Gasoleo Premium"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_95_e10}
                filterKey={'price_gasoil_95_e10'}
                onValueChange={handlePriceFilterChange}
                label="Gasolina 95 E10"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_95_e5}
                filterKey={'price_gasoil_95_e5'}
                onValueChange={handlePriceFilterChange}
                label="Gasolina 95 E5"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_95_e5_premiun}
                filterKey={'price_gasoil_95_e5_premiun'}
                onValueChange={handlePriceFilterChange}
                label="Gasolina 95 E5 Premium"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_98_e10}
                filterKey={'price_gasoil_98_e10'}
                onValueChange={handlePriceFilterChange}
                label="Gasolina 98 E10"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_gasoil_98_e5}
                filterKey={'price_gasoil_98_e5'}
                onValueChange={handlePriceFilterChange}
                label="Gasolina 98 E5"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_hydrogen}
                filterKey={'price_hydrogen'}
                onValueChange={handlePriceFilterChange}
                label="Hidrogeno"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_liquefied_petroleum_gas}
                filterKey={'price_liquefied_petroleum_gas'}
                onValueChange={handlePriceFilterChange}
                label="Gases licuados del petróleo"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_liquefied_natural_gas}
                filterKey={'price_liquefied_natural_gas'}
                onValueChange={handlePriceFilterChange}
                label="Gas Natural Licuado"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_compressed_natural_gas}
                filterKey={'price_compressed_natural_gas'}
                onValueChange={handlePriceFilterChange}
                label="Gas Natural Comprimido"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_biodiesel}
                filterKey={'price_biodiesel'}
                onValueChange={handlePriceFilterChange}
                label="Biodiesel"
              />
              <PetrolFilter
                defaultPriceLimit={filters.price_bioetanol}
                filterKey={'price_bioetanol'}
                onValueChange={handlePriceFilterChange}
                label="Bioetanol"
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
