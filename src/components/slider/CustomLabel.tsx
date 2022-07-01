import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LabelProps } from '@ptomasroos/react-native-multi-slider';
import LabelBase from './LabelBase';

const CustomLabel = ({
  oneMarkerValue,
  twoMarkerValue,
  oneMarkerLeftPosition,
  twoMarkerLeftPosition,
  oneMarkerPressed,
  twoMarkerPressed,
}: LabelProps) => {
  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        pressed={oneMarkerPressed}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={twoMarkerValue}
        pressed={twoMarkerPressed}
      />
    </View>
  );
};

export default CustomLabel;

const styles = StyleSheet.create({
  parentView: {
    position: 'relative',
    marginTop: 15,
  },
});
