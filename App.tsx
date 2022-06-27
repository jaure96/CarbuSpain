import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import PetrolProvider from './src/provider/PetrolProvider';
import PermissionsProvider from './src/provider/PermissionsProvider';
import Navigator from './src/routes/StackNavigator';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <PermissionsProvider>
      <PetrolProvider>{children}</PetrolProvider>
    </PermissionsProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
