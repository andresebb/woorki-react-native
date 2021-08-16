import React from 'react';
import {ImageBackground} from 'react-native';

export const BackgroundImage = ({children}: any) => {
  return (
    <ImageBackground
      source={require('../assets/portada.png')}
      style={{
        width: '100%',
        height: '100%',
      }}>
      {children}
    </ImageBackground>
  );
};
