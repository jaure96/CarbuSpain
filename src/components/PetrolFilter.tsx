import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label: string;
  onValueChange?: (value: number) => void;
  defaultPriceLimit?: number;
};

const PetrolFilter = ({
  label,
  defaultPriceLimit = 3,
  onValueChange,
}: Props) => {
  const [price, setPrice] = useState(`${defaultPriceLimit}`);

  const handleUpdatePrice = useCallback(
    (value: string) => {
      setPrice(value);
      if (onValueChange != null) {
        onValueChange(Number(price));
      }
    },
    [onValueChange, price]
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleUpdatePrice}
          value={price}
          placeholder="Precio maximo"
          keyboardType="numeric"
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
