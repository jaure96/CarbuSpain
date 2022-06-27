import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/routes/TabNavigator';
import PetrolProvider from './src/provider/PetrolProvider';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <PetrolProvider>{children}</PetrolProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <TabNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
