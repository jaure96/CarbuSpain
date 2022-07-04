import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import InfoScreen from '../screens/InfoScreen';

export type RootStackParams = {
  MapScreen: undefined;
  InfoScreen: { [key: string]: string };
};

const Stack = createStackNavigator<RootStackParams>();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        headerShown: true,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="MapScreen"
        options={{ headerShown: false }}
        component={MapScreen}
      />
      <Stack.Screen name="InfoScreen" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
