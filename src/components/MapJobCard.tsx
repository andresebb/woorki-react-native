import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {JobData} from '../interfaces/JobInterface';
import {useNavigation} from '@react-navigation/native';

interface Job {
  job: JobData;
  index: number;
}

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.9;

export const MapJobCard = ({job, index}: Job) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('JobDetailScreen', job)}>
      <View style={styles.card} key={index}>
        <Image
          source={{uri: job.image}}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>
            {job.title}
          </Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {job.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
});
