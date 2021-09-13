import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {AppContext} from '../context/AppContext';

export const Header = () => {
  const {opacity, translate} = useContext(AppContext);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        marginHorizontal: 12,
        marginTop: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
      }}>
      <View style={styles.locationContainer}>
        <View style={styles.location}>
          <Icon name="location" size={30} color="#2bc48a" />
          <Text style={styles.locationText}>Dallas Tx</Text>
        </View>
        <Image
          source={require('../assets/avatar.png')}
          style={{
            width: 48,
            height: 48,
            marginVertical: 4,
          }}
        />
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
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Find a job"
            placeholderTextColor="#B5B5B5"
            style={styles.inputField}
            selectionColor="black"
            // onChangeText={value => onChange(value, 'email')}
            // value={email}
            // onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.logoLeftContainer}>
            <Icon name="search-outline" size={20} color="#B5B5B5" />
          </View>
        </View>
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
  inputContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    marginRight: 60,
  },
  logoLeftContainer: {
    position: 'absolute',
    top: 14,
    left: 6,
  },
  inputField: {
    color: '#1B1B1B',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 36,
    paddingLeft: 46,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  filter: {
    marginRight: 10,
  },
});
