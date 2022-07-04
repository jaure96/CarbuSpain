import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from '../screens/SettingsScreen';
import { StyleSheet } from 'react-native';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
