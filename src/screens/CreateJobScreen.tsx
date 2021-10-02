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
import {NextButton} from '../components/NextButton';
import {OneBackArrow} from '../components/OneBackArrow';
import {CreateJobImage} from '../components/CreateJobImage';

export const CreateJobScreen = () => {
  return (
    <BackgroundWhite>
      <CreateJobImage />
      <ScrollView
        style={{
          padding: 12,
        }}>
        <CreateJob1 />
        <NextButton screen="CreateJobScreen2" />
      </ScrollView>
    </BackgroundWhite>
  );
};
