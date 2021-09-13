import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';

interface Props {
  navigation: any;
}

export const BackArrow = ({navigation}: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        left: 14,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
        <Icon name="arrow-back-outline" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};
