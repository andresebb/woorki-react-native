import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useForm} from '../hooks/useForm';
import {AuthContext} from '../context/authContext';

interface Props {
  showModal: any;
}

export const ForgotPasswordModal = ({showModal}: Props) => {
  const {email, onChange} = useForm({
    email: '',
  });

  const {resetUserPassword} = useContext(AuthContext);

  return (
    <View
      style={{
        position: 'absolute',
        // flex: 1,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(), showModal(false);
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              padding: 12,
              borderRadius: 20,
              paddingVertical: 30,
            }}>
            <View
              style={{
                position: 'relative',
                // marginTop: 50,
              }}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(0,0,0,0.4)"
                style={styles.inputField}
                selectionColor="black"
                // keyboardType="email-address"
                onChangeText={value => onChange(value, 'email')}
                value={email}
                // onSubmitEditing={onLogin}
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
            <TouchableOpacity onPress={() => resetUserPassword(email)}>
              <Text
                style={{
                  textAlign: 'center',
                  backgroundColor: '#2bc48a',
                  padding: 12,
                  color: 'white',
                  fontSize: 16,
                  borderRadius: 12,
                }}>
                Send password Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    fontSize: 16,
    paddingLeft: 36,
    marginBottom: 24,
    borderWidth: 1,
  },
});
