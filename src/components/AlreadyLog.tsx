import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface Props {
  screen: string;
  title1: string;
  title2: string;
  color: string;
  navigation: any;
}

export const AlreadyLog = ({
  title1,
  title2,
  screen,
  color,
  navigation,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
      }}>
      <Text
        style={{
          color,
          textAlign: 'center',
          // marginBottom: 24,
          marginRight: 8,
        }}>
        {title1}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(`${screen}`)}>
        <Text
          style={{
            color: '#2bc48a',
            fontWeight: 'bold',
          }}>
          {title2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
