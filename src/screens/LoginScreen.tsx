import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {BackArrow} from '../components/BackArrow';
import {TextInput} from 'react-native-gesture-handler';
import {ButtonSign} from '../components/ButtonSign';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/WelcomeNavigator';
import {FacebookSignButton} from '../components/FacebookSignButton';
import {GoogleSignButton} from '../components/GoogleSignButton';
import {AlreadyLog} from '../components/AlreadyLog';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  return (
    <ImageBackground
      source={require('../assets/portada.png')}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/woorki-no-bg.png')}
              style={{
                width: 300,
                height: 50,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              opacity: 0.9,
              flex: 1,
              borderTopLeftRadius: 42,
              borderTopRightRadius: 42,
              paddingHorizontal: 24,
              justifyContent: 'space-between',
            }}>
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View
                style={{
                  position: 'relative',
                }}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  // underlineColorAndroid="white"
                  style={styles.inputField}
                  selectionColor="black"
                  keyboardType="email-address"
                  // onChangeText={value => onChange(value, 'email')}
                  // value={email}
                  // onSubmitEditing={onRegister}
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
                  // onChangeText={value => onChange(value, 'password')}
                  // value={password}
                  // onSubmitEditing={onRegister}
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
                  onPress={() => console.log()}>
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
              />
            </View>
          </View>
          <BackArrow navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    position: 'relative',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 150,
    marginBottom: 64,
  },

  // Form Container

  formContainer: {
    flex: 1,
    marginTop: 18,
    // position: 'relative',
    // justifyContent: 'space-between',
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
    alignItems: 'center',
    backgroundColor: '#2bc48a',
    borderRadius: 12,
    shadowColor: '#000',
    marginVertical: 24,
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
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
