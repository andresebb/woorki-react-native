import React from 'react';
import {useContext} from 'react';
import {StyleSheet, View, Platform, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useForm} from '../hooks/useForm';
import {AlreadyLog} from './AlreadyLog';
import {AuthContext} from '../context/AuthContext';

interface Props {
  navigation: any;
}

export const RegisterForm = ({navigation}: Props) => {
  const {signUpFirebase} = useContext(AuthContext);

  const {email, password, firstName, lastName, onChange} = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    signUpFirebase({firstName, lastName, email, password});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* Name Inputs */}
          <View style={styles.doubleInputContainer}>
            <View
              style={{
                position: 'relative',
                width: '44%',
              }}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="rgba(0,0,0,0.4)"
                // underlineColorAndroid="white"
                style={styles.inputField}
                selectionColor="black"
                onChangeText={value => onChange(value, 'firstName')}
                value={firstName}
                onSubmitEditing={onRegister}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 13,
                  left: 4,
                }}>
                <Icon name="person-outline" size={20} color="gray" />
              </View>
            </View>

            <View
              style={{
                position: 'relative',
                width: '44%',
              }}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="rgba(0,0,0,0.4)"
                // underlineColorAndroid="white"
                style={styles.inputField}
                selectionColor="black"
                onChangeText={value => onChange(value, 'lastName')}
                value={lastName}
                onSubmitEditing={onRegister}
                autoCapitalize="words"
                autoCorrect={false}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 13,
                  left: 4,
                }}>
                <Icon name="person-outline" size={20} color="gray" />
              </View>
            </View>
          </View>

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
              onChangeText={value => onChange(value, 'email')}
              value={email}
              onSubmitEditing={onRegister}
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
              style={styles.inputField}
              selectionColor="black"
              onChangeText={value => onChange(value, 'password')}
              value={password}
              onSubmitEditing={onRegister}
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
        </View>

        {/* Policy Terms */}
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              letterSpacing: 2,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            By creating an account, you agree to our {'\n'}
            Conditions of Use nad Privacy Notice.
          </Text>

          {/* Continue */}
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonContainer}
              onPress={() => onRegister()}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Already Log */}
          <AlreadyLog
            title1="Do you already hace an account ?"
            title2="Sign In"
            screen="LoginScreen"
            color="white"
            navigation={navigation}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    position: 'relative',
    justifyContent: 'space-between',
  },

  formContainer: {
    marginBottom: 34,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    fontSize: 16,
    paddingLeft: 36,
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#2bc48a',
    borderRadius: 12,
    shadowColor: '#000',
    marginBottom: 24,
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
});
