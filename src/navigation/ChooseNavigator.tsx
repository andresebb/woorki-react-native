import React from 'react';
import {useContext, useState} from 'react';
import {Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {BottomNavigator} from './BottomNavigator';
import {WelcomeNavigator} from './WelcomeNavigator';

export const ChooseNavigator = () => {
  const {status} = useContext(AuthContext);

  if (status.status !== 'authenticated') {
    return <WelcomeNavigator />;
  } else {
    return <BottomNavigator />;
  }
};
