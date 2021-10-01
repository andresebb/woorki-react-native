import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

import {BackgroundWhite} from '../components/BackgroundWhite';
import SmallLogo from '../components/SmallLogo';
import MapView from 'react-native-maps';
import {CreateJob1} from '../components/CreateJob1';
import {useNavigation} from '@react-navigation/native';

export const CreateJobScreen = () => {
  const navigation = useNavigation();

  return (
    <BackgroundWhite>
      <View style={styles.containerScreenTitle}>
        <SmallLogo />
        <Text style={styles.screenTitle}>New Job</Text>
      </View>
      <ScrollView
        style={{
          padding: 12,
        }}>
        <CreateJob1 />
        <TouchableOpacity
          style={{
            marginBottom: 28,
            alignItems: 'flex-end',
          }}
          onPress={() => navigation.navigate('CreateJobScreen2')}>
          <Text
            style={{
              backgroundColor: '#2bc48a',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundWhite>
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
    marginBottom: 12,
    color: '#2bc48a',
    fontWeight: 'bold',
  },
});
