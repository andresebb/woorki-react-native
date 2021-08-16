import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/WelcomeNavigator';

import {EmailSignButton} from '../components/EmailSignButton';
import {GoogleSignButton} from '../components/GoogleSignButton';
import {FacebookSignButton} from '../components/FacebookSignButton';
import {AlreadyLog} from '../components/AlreadyLog';
import {BackgroundImage} from '../components/BackgroundImage';

interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

export const WelcomeScreen = ({navigation}: Props) => {
  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/woorki-no-bg.png')}
            style={{
              width: 300,
              height: 50,
              marginTop: 200,
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <EmailSignButton navigation={navigation} />
          <FacebookSignButton />
          <GoogleSignButton />
        </View>
      </View>

      {/* Alredy log text */}
      <AlreadyLog
        title1="Do you already hace an account ?"
        title2="Sign In"
        screen="LoginScreen"
        color="white"
        navigation={navigation}
      />
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
