import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import {RootStackParams} from '../navigation/Tab1';
import {OneBackArrow} from '../components/OneBackArrow';
import {BackgroundWhite} from '../components/BackgroundWhite';
import MapView, {Marker} from 'react-native-maps';
import {TouchableOpacity} from 'react-native';
import {AppContext} from '../context/appContext';

const screemHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'JobDetailScreen'> {}

export const JobDetailScreen = ({route, navigation}: Props) => {
  const job = route.params;
  const {selectChat} = useContext(AppContext);

  return (
    <ScrollView style={styles.flex1}>
      <BackgroundWhite>
        <View style={styles.flex1}>
          <OneBackArrow navigation={navigation} />
          <View style={styles.imageContainer}>
            <Image
              source={{uri: `${job.image}`}}
              style={{
                height: '100%',
                width: '100%',
                borderTopLeftRadius: 40,
                borderBottomRightRadius: 30,
              }}
            />
            <View style={styles.imageShadow}></View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{job.title}</Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 12,
              flex: 1,
              marginBottom: 50,
            }}>
            {/* Description */}
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{job.description}</Text>
            {/* Salary */}
            <Text style={styles.salary}>Hourly salary:</Text>
            <Text style={styles.salaryNumber}>{job.hour}</Text>

            {/* Contact */}
            <View style={styles.contactContainer}>
              <View style={styles.contactInfo}>
                {job.user.photoURL ? (
                  <Image
                    source={{uri: `${job.user.photoURL}`}}
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 12,
                      borderRadius: 24,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../assets/avatar.png')}
                    style={{
                      height: 50,
                      width: 50,
                      marginRight: 12,
                    }}
                  />
                )}

                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#1B1B1B',
                    }}>
                    {job.user.displayName}
                  </Text>
                  <Text
                    style={{
                      color: '#858585',
                      fontWeight: 'bold',
                    }}>
                    Human Resources
                  </Text>
                </View>
              </View>

              <View style={styles.contactInfo}>
                <View
                  style={{
                    ...styles.contactLogo,
                    marginRight: 14,
                  }}>
                  <Icon name="call-outline" size={20} color="white" />
                </View>

                <TouchableOpacity
                  onPress={() => selectChat(job.user)}
                  style={styles.contactLogo}>
                  <Icon name="mail-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: 200,
                width: '100%',
                backgroundColor: '#FEFEFE',
              }}>
              <MapView
                style={{
                  flex: 1,
                }}
                liteMode
                initialRegion={{
                  latitude: job.coordinate.latitude,
                  longitude: job.coordinate.longitude,
                  latitudeDelta: 0.1864195044303443,
                  longitudeDelta: 0.1840142817690068,
                }}>
                <Marker coordinate={job.coordinate} />
              </MapView>
            </View>
          </View>
        </View>
      </BackgroundWhite>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: screemHeight * 0.3,
  },
  imageShadow: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    zIndex: 500,
    top: 0,
    bottom: -34,
    right: 0,
    left: 0,
    borderBottomRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  titleContainer: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9999,
    bottom: -15,
    right: 0,
    left: 0,
  },
  title: {
    color: 'white',
    backgroundColor: '#2bc48a',
    padding: 12,
    borderRadius: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    bottom: -8,
    fontSize: 18,
  },
  descriptionTitle: {
    marginTop: 46,
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 2,
    color: '#1B1B1B',
  },
  description: {
    color: '#858585',
  },
  salary: {
    marginVertical: 10,
    fontSize: 20,
    letterSpacing: 2,
    color: '#1B1B1B',
  },
  salaryNumber: {
    fontWeight: 'bold',
    color: '#858585',
  },
  contactContainer: {
    marginTop: 16,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLogo: {
    backgroundColor: '#2bc48a',
    padding: 12,
    borderRadius: 12,
  },
});
