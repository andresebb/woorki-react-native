import React from 'react';
import {ImageBackground} from 'react-native';

export const BackgroundWhite = ({children}: any) => {
  return (
    <ImageBackground
      source={require('../assets/backgroundWhite.png')}
      style={{
        width: '100%',
        height: '100%',
      }}>
      {children}
    </ImageBackground>
  );
};
