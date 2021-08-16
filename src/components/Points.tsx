import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Points = () => {
  return (
    <View
      style={{
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 300,
      }}>
      <View style={styles.elevatePointContainer}>
        <View style={styles.elevetePoint} />
      </View>
      <View style={styles.emptyPoint} />
      <View style={styles.emptyPoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  elevatePointContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#060017',
    borderWidth: 2,
    borderColor: '#2bc48a',
    marginRight: 8,
  },
  elevetePoint: {
    height: 22,
    width: 22,
    borderRadius: 22,
    backgroundColor: '#2BC48A',
  },
  emptyPoint: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#AEAEAE',
    marginRight: 8,
  },
});
