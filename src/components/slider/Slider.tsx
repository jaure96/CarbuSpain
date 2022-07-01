import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomLabel from './CustomLabel';

type Props = {
  width: number;
  values: number[];
  minVal: number;
  maxVal: number;
  step?: number;
  valueSuffix?: string;
  disableScroll: () => void;
  enableScroll: () => void;
  onValuesChange: (values: number[]) => void;
};

const Slider = ({
  values,
  width,
  minVal,
  maxVal,
  step = 1,
  valueSuffix = '',
  disableScroll,
  enableScroll,
  onValuesChange,
}: Props) => {
  const handleValuesChangeFinish = (vals: number[]) => {
    enableScroll();
    onValuesChange(vals);
  };

  return (
    <MultiSlider
      values={values}
      step={step}
      min={minVal}
      max={maxVal}
      valueSuffix={valueSuffix}
      onValuesChangeStart={disableScroll}
      onValuesChangeFinish={handleValuesChangeFinish}
      minMarkerOverlapDistance={2}
      sliderLength={width}
      allowOverlap={false}
      snapped
      enableLabel={true}
      customLabel={CustomLabel}
      selectedStyle={{ backgroundColor: 'tomato' }}
      markerStyle={{ backgroundColor: 'tomato' }}
    />
  );
};

export default Slider;
