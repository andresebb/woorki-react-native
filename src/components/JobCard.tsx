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

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobDetailScreen', job)}
      style={{...styles.cardContainer, marginTop: first}}>
      <Image
        source={require('../assets/construction.png')}
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
            <Text style={styles.description}>{job.description}</Text>
          </View>
          <Icon name="heart-outline" size={24} color="#B5B5B5" />
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.infoText}>
              <Icon name="location-outline" size={20} color="#2bc48a" />
              <Text style={{marginLeft: 6, color: '#858585'}}>
                {job.location}
              </Text>
            </View>
            <View style={styles.infoText}>
              <Icon name="card-outline" size={20} color="#2bc48a" />
              <Text style={{color: '#858585', marginLeft: 6}}>${job.hour}</Text>
            </View>
          </View>
          <View style={styles.contactContainer}>
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
          </View>
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
    justifyContent: 'space-between',
    position: 'relative',
    marginTop: 42,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#1B1B1B',
    fontWeight: '700',
  },
  description: {
    color: '#858585',
    fontSize: 12,
    marginVertical: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
