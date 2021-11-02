import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Tab4';
import {BackArrow} from '../components/BackArrow';
import {OneBackArrow} from '../components/OneBackArrow';
import Icon from 'react-native-vector-icons/Ionicons';
import {useForm} from '../hooks/useForm';
import firestore from '@react-native-firebase/firestore';

interface Props
  extends StackScreenProps<RootStackParams, 'UserMessageScreen'> {}

export const UserMessageScreen = ({route, navigation}: Props) => {
  const user = route.params;

  const {text, onChange} = useForm({
    text: '',
  });

  const handleSubmit = () => {
    firestore()
      .collection('Mensajesitos')
      .doc('esteeselid')
      .collection('chat')
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
        }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <Image
            source={require('../assets/avatar.png')}
            style={{
              width: 60,
              height: 60,
              borderRadius: 48,
              marginHorizontal: 8,
            }}
          />
          <View
            style={{
              padding: 6,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {user.displayName}
            </Text>
            <Text
              style={{color: 'green', fontWeight: 'bold', letterSpacing: 1.5}}>
              Online
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'orange',
          flex: 12,
        }}>
        <Text>El textp</Text>
      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: 'white',
          padding: 6,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder="Write your message here."
          placeholderTextColor="rgba(0,0,0,0.4)"
          selectionColor="black"
          multiline={true}
          style={{
            flex: 1,
            borderColor: '#B5B5B5',
            borderRadius: 12,
            borderWidth: 1,
            // padding: 24,
          }}
          onChangeText={value => onChange(value, 'text')}
          value={text}
          // onSubmitEditing={onLogin}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#2bc48a',
            justifyContent: 'center',
            marginLeft: 12,
            borderRadius: 24,
            padding: 14,
            paddingVertical: 14,
            alignItems: 'center',
          }}
          onPress={handleSubmit}>
          <Icon name="send-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
