import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/context/AuthContext';
import {ChooseNavigator} from './src/navigation/ChooseNavigator';
import {AppProvider} from './src/context/AppContext';

import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]); // Ignore log notification by message
LogBox.ignoreLogs([
  'If you want to use Reanimated 2 then go through our installation steps ',
]); // Ignore log notification by message

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
