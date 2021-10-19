import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {JobData} from '../interfaces/JobInterface';

interface Props {
  job: JobData;
  first: number;
}

export const JobCard = ({job, first}: Props) => {
  const navigation = useNavigation();

  const reduceDescription = (description: string) => {
    let shortDescription = description.slice(0, 60);

    if (shortDescription.length < description.length) {
      return `${shortDescription}...`;
    } else {
      return `${shortDescription}.`;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetailScreen', job)}
      style={{...styles.cardContainer, marginTop: first}}>
      <Image
        onLoad={() => <Text>Loading...</Text>}
        source={{
          uri: `${job.image}`,
        }}
        style={{
          width: 125,
          height: '100%',
          borderRadius: 100,
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={styles.employer}>Hyatt Regency</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('gola')}>
            <View
              style={{
                padding: 2,
              }}>
              <Icon name="heart-outline" size={24} color="#B5B5B5" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          {reduceDescription(job.description)}
        </Text>

        <View style={styles.bottomContainer}>
          {/* <View> */}
          <View style={styles.infoText}>
            <Icon name="location-outline" size={20} color="#2bc48a" />
            <Text style={{marginLeft: 6, color: '#858585'}}>{job.city}</Text>
          </View>
          <View style={styles.infoText}>
            <Icon name="card-outline" size={20} color="#2bc48a" />
            <Text style={{color: '#858585', marginLeft: 6}}>${job.hour}</Text>
          </View>
          {/* </View> */}
          {/* <View style={styles.contactContainer}>
            <Icon
              style={{paddingHorizontal: 5}}
              name="mail-outline"
              size={24}
              color="#B5B5B5"
            />
            <Icon
              style={{paddingHorizontal: 5}}
              name="call-outline"
              size={24}
              color="#B5B5B5"
            />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    position: 'relative',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  employer: {
    fontSize: 12,
    color: '#858585',
    fontWeight: '700',
    margin: 0,
  },
  title: {
    fontSize: 16,
    color: '#1B1B1B',
    fontWeight: '700',
    margin: 0,
  },
  description: {
    color: '#858585',
    fontSize: 12,
    marginBottom: 8,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  infoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
