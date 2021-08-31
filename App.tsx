import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigator} from './src/navigation/BottomNavigator';
import {WelcomeNavigator} from './src/navigation/WelcomeNavigator';
import {AuthContext, AuthProvider} from './src/context/AuthContext';
import {useEffect} from 'react';
import {ChooseNavigator} from './src/navigation/ChooseNavigator';

const AppState = ({children}: any) => {
  return <AuthProvider>{children}</AuthProvider>;
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
