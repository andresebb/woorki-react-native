import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {ChooseNavigator} from './src/navigation/ChooseNavigator';
import {AppProvider} from './src/context/AppContext';

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <AppProvider>{children}</AppProvider>
    </AuthProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <ChooseNavigator />
      </AppState>
    </NavigationContainer>
  );
}
