import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {RootStackParams} from '../navigation/WelcomeNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {LogoSvg} from '../components/LogoSvg';

import {BackgroundImage} from '../components/BackgroundImage';
import {BackArrow} from '../components/BackArrow';
import {Points} from '../components/Points';
import {RegisterForm} from '../components/RegisterForm';
import {AlreadyLog} from '../components/AlreadyLog';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  return (
    <BackgroundImage>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <LogoSvg />
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Points />

          {/* Form Start */}
          <RegisterForm />

          {/* Already Log */}
          <AlreadyLog
            title1="Do you already hace an account ?"
            title2="Sign In"
            screen="LoginScreen"
            color="white"
            navigation={navigation}
          />

          {/* Go back */}
          <BackArrow navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 24,
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 24,
    letterSpacing: 8,
    marginBottom: 20,
    marginTop: 36,
  },
});
