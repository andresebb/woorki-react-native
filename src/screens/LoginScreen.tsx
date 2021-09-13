import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import {BackArrow} from '../components/BackArrow';
import {RootStackParams} from '../navigation/WelcomeNavigator';
import {FacebookSignButton} from '../components/FacebookSignButton';
import {GoogleSignButton} from '../components/GoogleSignButton';
import {AlreadyLog} from '../components/AlreadyLog';
import {BackgroundImage} from '../components/BackgroundImage';
import {BigLogo} from '../components/BigLogo';
import {useForm} from '../hooks/useForm';
import {AuthContext} from '../context/AuthContext';
import {LoadingModal} from '../components/loadingModal';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const {signInFirebase, loading} = useContext(AuthContext);

  const onLogin = () => {
    signInFirebase({email, password});
  };

  return (
    <BackgroundImage>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <BigLogo
            style={{
              alignItems: 'center',
              marginTop: 150,
              marginBottom: 64,
            }}
          />

          <View style={styles.boxContainer}>
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View
                style={{
                  position: 'relative',
                }}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  style={styles.inputField}
                  selectionColor="black"
                  keyboardType="email-address"
                  onChangeText={value => onChange(value, 'email')}
                  value={email}
                  onSubmitEditing={onLogin}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 13,
                    left: 6,
                  }}>
                  <Icon name="mail-outline" size={20} color="gray" />
                </View>
              </View>

              {/* Password Input */}
              <View
                style={{
                  position: 'relative',
                }}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  // underlineColorAndroid="white"
                  style={{...styles.inputField, marginBottom: 12}}
                  selectionColor="black"
                  onChangeText={value => onChange(value, 'password')}
                  value={password}
                  onSubmitEditing={onLogin}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 13,
                    left: 6,
                  }}>
                  <Icon name="lock-closed-outline" size={20} color="gray" />
                </View>
              </View>
              <Text>Forgot Password?</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.button}
                  onPress={() => onLogin()}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={styles.buttonsContainer}>
                <FacebookSignButton />
                <GoogleSignButton />
              </View>
              {/* Already Log */}
              <AlreadyLog
                title1="Don't have and account ?"
                title2="Sign Up"
                screen="RegisterScreen"
                color="black"
                navigation={navigation}
              />
            </View>
          </View>
          <BackArrow navigation={navigation} />
          {loading && <LoadingModal />}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  boxContainer: {
    backgroundColor: 'white',
    opacity: 0.9,
    flex: 1,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    padding: 14,
    justifyContent: 'space-between',
  },

  // Form Container

  formContainer: {
    marginTop: 14,
  },
  inputField: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    fontSize: 16,
    paddingLeft: 36,
    marginBottom: 24,
  },

  buttonContainer: {
    backgroundColor: '#2bc48a',
    borderRadius: 12,
    shadowColor: '#000',
    marginVertical: 24,
    marginBottom: 54,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
