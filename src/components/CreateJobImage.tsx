import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SmallLogo from './SmallLogo';

export const CreateJobImage = () => {
  return (
    <View style={styles.containerScreenTitle}>
      <SmallLogo />
      <Text style={styles.screenTitle}>New Job</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScreenTitle: {
    alignItems: 'center',
    marginTop: 24,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#2bc48a',
    fontWeight: 'bold',
  },
});
