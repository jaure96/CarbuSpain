import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  price: string;
};

const PetrolPrice = ({ label, price }: Props) => {
  return (
    <>
      {price.length !== 0 && (
        <View style={{ ...styles.mainContainer }}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.dots} />
          <Text>{`${price} €`}</Text>
        </View>
      )}
    </>
  );
};

export default PetrolPrice;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  dots: {
    flex: 1,
    height: '100%',
    borderStyle: 'dotted',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    marginHorizontal: 10,
    top: -4,
  },
});
