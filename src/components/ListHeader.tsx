import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import SmallLogo from './SmallLogo';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const ListHeader = () => {
  return (
    <View style={styles.container}>
      <SmallLogo />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Find a job"
          placeholderTextColor="white"
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
          <Icon name="search-outline" size={24} color="white" />
        </View>
        <View style={styles.logoRightContainer}>
          <Icon name="filter-outline" size={24} color="white" />
        </View>
      </View>
      <Image
        source={require('../assets/avatar.png')}
        style={{
          width: 48,
          height: 48,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  logoLeftContainer: {
    position: 'absolute',
    top: 12,
    left: 6,
  },
  logoRightContainer: {
    position: 'absolute',
    top: 12,
    right: 6,
  },
  inputField: {
    color: 'black',
    backgroundColor: '#172051',
    borderRadius: 12,
    fontSize: 16,
    // flex: 1,
    textAlign: 'center',
    paddingHorizontal: 36,
  },
});
