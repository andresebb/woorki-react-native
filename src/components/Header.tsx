import React, {useContext, useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {AppContext} from '../context/appContext';
import {useNavigation} from '@react-navigation/native';
import {useLocation} from '../hooks/useLocation';
import {SearchInput} from './SearchInput';
import {AuthContext} from '../context/authContext';

export const Header = () => {
  const navigation = useNavigation();
  const {currentUser} = useContext(AuthContext);
  const {city} = useLocation();
  const [term, setTerm] = useState('');
  const {opacity, translate, filterJobByName, resetFilterJobs} =
    useContext(AppContext);

  //Usedebounced
  useEffect(() => {
    if (term.length > 0) filterJobByName(term);
    if (term.length === 0) resetFilterJobs();
  }, [term]);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.locationContainer}>
        <View style={styles.location}>
          <Icon name="location" size={30} color="#2bc48a" />
          <Text style={styles.locationText}>{city}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {currentUser?.photoURL ? (
            <Image
              source={{uri: currentUser.photoURL}}
              style={{
                width: 48,
                height: 48,
                marginVertical: 4,
                borderRadius: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/avatar.png')}
              style={{
                width: 48,
                height: 48,
                marginVertical: 4,
                borderRadius: 24,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          ...styles.container,
          opacity,
          transform: [
            {
              translateY: translate,
            },
          ],
        }}>
        <SearchInput onDebounce={value => setTerm(value)} />
        <TouchableOpacity onPress={() => console.log('hola')}>
          <Icon
            style={styles.filter}
            name="filter-outline"
            size={30}
            color="#B5B5B5"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 6,
    marginTop: 0,
  },

  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'white',
    // paddingVertical: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  filter: {
    marginRight: 10,
  },
});
