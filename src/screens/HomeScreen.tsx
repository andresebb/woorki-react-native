import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackgroundImage} from '../components/BackgroundImage';
import {ListHeader} from '../components/ListHeader';
import {ChefLogo} from '../components/ChefLogo';

export const HomeScreen = () => {
  const navigator = useNavigation();

  return (
    <BackgroundImage>
      <ListHeader />

      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => item}
        horizontal
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 14,
              marginHorizontal: 14,
              height: 70,
              borderRadius: 42,
              alignItems: 'center',
            }}>
            <ChefLogo />
          </View>
        )}
      />
    </BackgroundImage>
  );
};
