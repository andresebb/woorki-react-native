import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const HomeScreen = () => {
  const navigator = useNavigation();

  return (
    <View>
      <Text>Soy la Home Screen</Text>
      <Button
        title="Navegalo Bebe"
        onPress={() => navigator.navigate('DetailScreen')}
      />
    </View>
  );
};
