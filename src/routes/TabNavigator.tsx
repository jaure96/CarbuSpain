import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../screens/SettingsScreen';
import { StyleSheet } from 'react-native';
import StackNavigator from './StackNavigator';
import PetrolContext from '../context/PetrolContext';
import ReqStatus from '../types/ReqStatus';
import LoadingScreen from '../screens/LoadingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { retrieveData, filtersFetched, status } = useContext(PetrolContext);

  useEffect(() => {
    if (filtersFetched) {
      retrieveData();
    }
  }, [filtersFetched]);

  if (status === ReqStatus.pending) {
    return <LoadingScreen />;
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'Mapa') {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          } else if (route.name === 'Filtros') {
            iconName = focused ? 'ios-options' : 'ios-options-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Mapa" component={StackNavigator} />
      <Tab.Screen name="Filtros" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
  },
});
