import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  screen: string;
}

export const NextButton = ({screen}: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        marginBottom: 28,
        alignItems: 'flex-end',
      }}
      onPress={() => navigation.navigate(screen)}>
      <Text
        style={{
          backgroundColor: '#2bc48a',
          paddingVertical: 12,
          borderRadius: 12,
          paddingHorizontal: 24,
          color: 'white',
          fontWeight: 'bold',
          fontSize: 18,
        }}>
        Next
      </Text>
    </TouchableOpacity>
  );
};
