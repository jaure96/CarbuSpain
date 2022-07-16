import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label: string;
  filterKey: string;
  onValueChange?: (value: number, filterKey: string) => void;
  defaultPriceLimit: number;
};

const PetrolFilter = ({
  label,
  filterKey,
  defaultPriceLimit,
  onValueChange,
}: Props) => {
  const [price, setPrice] = useState(`${defaultPriceLimit}`);

  const handleUpdatePrice = useCallback((value: string) => {
    let newPrice = value;
    if (newPrice.includes('.')) {
      newPrice = newPrice.replace('.', ',');
    }
    if (newPrice.startsWith(',')) {
      newPrice = newPrice.replace(',', '');
    }
    if ((newPrice.match(/,/g) || []).length > 1) {
      newPrice = newPrice.slice(0, -1);
    }
    setPrice(newPrice);
  }, []);

  const handleBlur = useCallback(() => {
    if (price.endsWith(',')) {
      setPrice(price.replace(',', ''));
    }
    if (price.length === 0) {
      setPrice('0');
    }
  }, [price]);

  useEffect(() => {
    const numericValue = Number(price.replace(',', '.'));
    if (onValueChange != null && !isNaN(numericValue)) {
      onValueChange(numericValue, filterKey);
    }
  }, [filterKey, onValueChange, price]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleUpdatePrice}
          value={price}
          keyboardType="numeric"
          maxLength={5}
          onBlur={handleBlur}
        />
        <Text style={{ ...styles.label, ...styles.euroLabel }}> €</Text>
      </View>
    </View>
  );
};

export default PetrolFilter;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    flex: 3,
    fontSize: 15,
    fontWeight: '600',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
  },
  input: {
    flex: 2,
    height: 40,
    padding: 10,
  },
  euroLabel: {
    flex: 1,
  },
});
