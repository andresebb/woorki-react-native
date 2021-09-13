import React from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';

import {RootStackParams} from '../navigation/WelcomeNavigator';
import {EmailSignButton} from '../components/EmailSignButton';
import {GoogleSignButton} from '../components/GoogleSignButton';
import {FacebookSignButton} from '../components/FacebookSignButton';
import {AlreadyLog} from '../components/AlreadyLog';
import {BackgroundImage} from '../components/BackgroundImage';
import {BigLogo} from '../components/BigLogo';

interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen = ({navigation}: Props) => {
  return (
    <BackgroundImage>
      <View style={styles.container}>
        <BigLogo
          style={{
            alignItems: 'center',
            marginTop: 200,
          }}
        />
        <View style={styles.buttonsContainer}>
          <EmailSignButton navigation={navigation} />
          <FacebookSignButton />
          <GoogleSignButton />

          {/* Alredy log text */}
          <AlreadyLog
            title1="Do you already have an account ?"
            title2="Sign In"
            screen="LoginScreen"
            color="white"
            navigation={navigation}
          />
        </View>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 14,
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
