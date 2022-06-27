import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({ iconName, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.button}
      >
        <Icon name={iconName} color="#d3d3d3" size={34} />
      </TouchableOpacity>
    </View>
  );
};

export default Fab;

const styles = StyleSheet.create({
  button: {
    zIndex: 999,
    height: 50,
    width: 50,
    backgroundColor: 'tomato',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.27,
    shadowRadius: 6,
    elevation: 6,
  },
});
