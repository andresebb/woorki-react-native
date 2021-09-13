import React from 'react';

import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {ChefLogo} from './logos/ChefLogo';
import {CleanLogo} from './logos/CleanLogo';
import {GardenerLogo} from './logos/GardenerLogo';
import {PainterLogo} from './logos/PainterLogo';
import {WaiterLogo} from './logos/WaiterLogo';
import {ConstructionLogo} from './logos/ConstructionLogo';

const categories = [
  {
    name: 'Chef',
    image: <ChefLogo />,
  },
  {
    name: 'Waiter',
    image: <WaiterLogo />,
  },
  {
    name: 'Clean',
    image: <CleanLogo />,
  },
  {
    name: 'Garden',
    image: <GardenerLogo />,
  },
  {
    name: 'Painter',
    image: <PainterLogo />,
  },
  {
    name: 'Contruction',
    image: <ConstructionLogo />,
  },
];

export const CategoriesList = () => {
  return (
    <View>
      <Text
        style={{
          color: 'white',
          margin: 10,
          fontWeight: '700',
          fontSize: 18,
        }}>
        Most popular categories:
      </Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <View style={styles.imageContainer}>{item.image}</View>
            <Text
              style={{
                color: 'white',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
