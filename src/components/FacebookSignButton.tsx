import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View, Text} from 'react-native';

import {SignButtonStyle} from '../theme/SignButtonTheme';

export const FacebookSignButton = () => {
  return (
    <TouchableOpacity
      style={{...SignButtonStyle.buttonContainer, backgroundColor: '#3182CE'}}>
      <View>
        <View style={SignButtonStyle.textContainer}>
          <Icon name="logo-facebook" size={26} color="white" />
          <Text style={{...SignButtonStyle.text, color: 'white'}}>
            Sign Up with Facebook
          </Text>
          <View />
        </View>
      </View>
    </TouchableOpacity>
  );
};
