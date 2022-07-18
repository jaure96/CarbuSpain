import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { PermissionsContext } from '../context/PermissionsContext ';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();
const Navigator = () => {
  const {
    locationEnabled,
    permissions: { locationStatus },
  } = useContext(PermissionsContext);

  console.log({ locationStatus, locationEnabled });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {locationStatus === 'granted' && locationEnabled ? (
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={LoadingScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
