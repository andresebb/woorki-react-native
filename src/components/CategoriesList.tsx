import React from 'react';
import {View, FlatList} from 'react-native';
import {ChefLogo} from './ChefLogo';

export const CategoriesList = () => {
  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 8, 9]}
        keyExtractor={item => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 10,
              marginVertical: 8,
              padding: 8,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ChefLogo />
          </View>
        )}
      />
    </View>
  );
};
