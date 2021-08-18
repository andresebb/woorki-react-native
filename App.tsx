import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomNavigator} from './src/navigation/BottomNavigator';
import {WelcomeNavigator} from './src/navigation/WelcomeNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigator />
      {/* <WelcomeNavigator /> */}
    </NavigationContainer>
  );
}
