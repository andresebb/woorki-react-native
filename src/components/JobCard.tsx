import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const JobCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../assets/warehouse.png')}
        style={{
          width: 125,
          height: '100%',
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>Warehouse Worker</Text>
            <Text style={styles.description}>
              We need a forklift driver as soon as possible
            </Text>
          </View>
          <Icon name="heart-outline" size={24} color="white" />
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <View style={styles.infoText}>
              <Icon name="location-outline" size={20} color="white" />
              <Text style={{color: 'white'}}>Dallas Tx</Text>
            </View>
            <View style={styles.infoText}>
              <Icon name="card-outline" size={20} color="white" />
              <Text style={{color: 'white'}}>$15.00</Text>
            </View>
          </View>
          <View style={styles.contactContainer}>
            <Icon
              style={{paddingHorizontal: 5}}
              name="mail-outline"
              size={24}
              color="white"
            />
            <Icon
              style={{paddingHorizontal: 5}}
              name="call-outline"
              size={24}
              color="white"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#172051',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
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
