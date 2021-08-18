import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {BackgroundImage} from '../components/BackgroundImage';
import {ListHeader} from '../components/ListHeader';
import {CategoriesList} from '../components/CategoriesList';
import {JobCard} from '../components/JobCard';
import {ScrollView} from 'react-native-gesture-handler';

export const HomeScreen = () => {
  return (
    <BackgroundImage>
      <ScrollView>
        {/* <ListHeader /> */}
        <CategoriesList />
        <View
          style={{
            flex: 1,
            padding: 12,
          }}>
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};
