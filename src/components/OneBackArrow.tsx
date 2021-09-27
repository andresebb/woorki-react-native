import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View} from 'react-native';

interface Props {
  navigation: any;
}

export const OneBackArrow = ({navigation}: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 35,
        height: 35,
        position: 'absolute',
        zIndex: 99999,
        top: 20,
        left: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Icon name="chevron-back-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};
