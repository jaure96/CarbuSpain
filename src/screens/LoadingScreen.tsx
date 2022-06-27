import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator color={'tomato'} size={50} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
