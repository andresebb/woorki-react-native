import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigator} from './src/navigation/BottomNavigator';
import {WelcomeScreen} from './src/screens/WelcomeScreen';
import {RegisterScreen} from './src/screens/RegisterScreen';
import {NewScreen} from './src/screens/NewScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {WelcomeNavigator} from './src/navigation/WelcomeNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {true ? <WelcomeNavigator /> : <BottomNavigator />}
    </NavigationContainer>
  );
}
