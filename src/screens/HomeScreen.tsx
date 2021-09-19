import React from 'react';

import {View, FlatList, StyleSheet, Image} from 'react-native';

import {JobCard} from '../components/JobCard';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {LoadingModal} from '../components/loadingModal';
import {Header} from '../components/Header';

export const HomeScreen = () => {
  const {getDirection, jobs, loading} = useContext(AppContext);

  return (
    <BackgroundWhite>
      <Header />

      <View style={styles.listContainer}>
        <FlatList
          data={jobs}
          onScroll={e => getDirection(e.nativeEvent.contentOffset.y)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            if (index === 0) {
              return <JobCard job={item} first={125} />;
            } else {
              return <JobCard job={item} first={32} />;
            }
          }}
        />
      </View>
      {loading && <LoadingModal />}
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
