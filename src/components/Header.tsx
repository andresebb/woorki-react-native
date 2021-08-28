import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';

export const Header = () => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        paddingVertical: 14,
        marginHorizontal: 14,
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
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Find a job"
            placeholderTextColor="#B5B5B5"
            // underlineColorAndroid="white"
            style={styles.inputField}
            selectionColor="black"
            // onChangeText={value => onChange(value, 'email')}
            // value={email}
            // onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.logoLeftContainer}>
            <Icon name="search-outline" size={24} color="#B5B5B5" />
          </View>
        </View>
        <Icon
          style={styles.filter}
          name="filter-outline"
          size={30}
          color="#B5B5B5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
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
    top: 12,
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
  },
  filter: {},
});
