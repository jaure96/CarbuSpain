import React from 'react';
import { useEffect, useRef } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

interface Props {
  position: number;
  value: number | string;
  pressed: boolean;
}

const width = 30;
const pointerWidth = width * 0.47;
const AnimatedView = Animated.createAnimatedComponent(View);

const LabelBase = ({ position, value, pressed }: Props) => {
  const scaleValue = useRef(new Animated.Value(0.6));
  const cachedPressed = useRef(pressed);

  useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1 : 0.6,
      duration: 200,
      delay: pressed ? 0 : 1000,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return Number.isFinite(position) && Number.isFinite(value) ? (
    <AnimatedView
      style={[
        styles.sliderLabel,
        {
          left: position - width / 2,
          transform: [
            { translateY: width },
            { scale: scaleValue.current },
            { translateY: -width },
          ],
        },
      ]}
    >
      <View style={styles.pointer} />
      <Text style={styles.sliderLabelText}>{value}</Text>
    </AnimatedView>
  ) : null;
};

export default LabelBase;

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: '100%',
    width: width,
    height: width,
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: width,
    borderRadius: width / 2,
    borderWidth: 2,
    borderColor: 'tomato',
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 18,
    color: 'tomato',
  },
  pointer: {
    position: 'absolute',
    bottom: -pointerWidth / 4,
    left: (width - pointerWidth) / 2,
    transform: [{ rotate: '45deg' }],
    width: pointerWidth,
    height: pointerWidth,
    backgroundColor: 'tomato',
  },
});
