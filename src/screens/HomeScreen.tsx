import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackgroundImage} from '../components/BackgroundImage';
import {ListHeader} from '../components/ListHeader';
import {ChefLogo} from '../components/ChefLogo';
import {CategoriesList} from '../components/CategoriesList';
import Icon from 'react-native-vector-icons/Ionicons';
import {JobCard} from '../components/JobCard';

export const HomeScreen = () => {
  const navigator = useNavigation();

  return (
    <BackgroundImage>
      <ListHeader />
      <CategoriesList />
      <View
        style={{
          flex: 1,
          padding: 12,
        }}>
        <JobCard />
      </View>
    </BackgroundImage>
  );
};
