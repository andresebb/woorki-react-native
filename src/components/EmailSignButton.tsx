import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View, Text} from 'react-native';

import {SignButtonStyle} from '../theme/SignButtonTheme';

interface Props {
  navigation: any;
}

export const EmailSignButton = ({navigation}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RegisterScreen')}
      activeOpacity={0.8}
      style={{...SignButtonStyle.buttonContainer, backgroundColor: '#fefefe'}}>
      <View>
        <View style={SignButtonStyle.textContainer}>
          <Icon name="mail-outline" size={26} color="black" />
          <Text style={{...SignButtonStyle.text, color: 'black'}}>
            Sign Up with Email
          </Text>
          <View />
        </View>
      </View>
    </TouchableOpacity>
  );
};
