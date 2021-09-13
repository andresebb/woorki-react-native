import React from 'react';

import {TouchableOpacity, View, Text, Image} from 'react-native';

import {SignButtonStyle} from '../theme/SignButtonTheme';

export const GoogleSignButton = () => {
  return (
    <TouchableOpacity
      style={{...SignButtonStyle.buttonContainer, backgroundColor: '#EBF8FF'}}>
      <View>
        <View style={SignButtonStyle.textContainer}>
          <Image
            source={require('../assets/googleIcon.png')}
            style={{
              width: 26,
              height: 26,
            }}
          />
          <Text style={{...SignButtonStyle.text, color: 'black'}}>
            Sign Up with Google
          </Text>
          <View />
        </View>
      </View>
    </TouchableOpacity>
  );
};
