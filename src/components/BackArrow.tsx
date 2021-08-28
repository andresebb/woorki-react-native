import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

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
