import React from 'react';
import {Text, View} from 'react-native';

export const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
        }}>
        Loading
      </Text>
    </View>
  );
};
