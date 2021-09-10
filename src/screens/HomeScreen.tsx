import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {JobCard} from '../components/JobCard';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {JobData} from '../interfaces/JobInterface';
import {LoadingScreen} from './LoadingScreen';

export const HomeScreen = () => {
  const {getDirection} = useContext(AppContext);

  //TODO: Hacer render de la data, mira el appContext
  const {jobs, loading} = useContext(AppContext);

  return (
    <BackgroundWhite>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 12,
          marginTop: 90,
        }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <FlatList
            data={jobs}
            onScroll={e => getDirection(e.nativeEvent.contentOffset.y)}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={true}
            renderItem={({item}) => <JobCard job={item} />}
          />
        )}
      </View>
    </BackgroundWhite>
  );
};
