import React, {useEffect, useState} from 'react';

import {View, FlatList, StyleSheet, Image} from 'react-native';

import {JobCard} from '../components/JobCard';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {LoadingModal} from '../components/loadingModal';
import {Header} from '../components/Header';
import {JobData} from '../interfaces/JobInterface';
import {AuthContext} from '../context/authContext';

export const HomeScreen = () => {
  const [list, setList] = useState<JobData[]>([]);
  const {getDirection, jobs, loading, filterJobs} = useContext(AppContext);

  useEffect(() => {
    // setList(jobs);
    definedRender();
  }, [filterJobs]);

  //Choose if we are to show all jobs or filter jobs
  const definedRender = () => {
    setList(jobs);

    if (filterJobs.length > 0) {
      setList(filterJobs);
    }
  };

  return (
    <BackgroundWhite>
      <Header />

      <View style={styles.listContainer}>
        <FlatList
          data={list}
          onScroll={e => getDirection(e.nativeEvent.contentOffset.y)}
          keyExtractor={item => item.title}
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
