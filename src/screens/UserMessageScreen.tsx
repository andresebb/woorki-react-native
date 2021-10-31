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

interface Props
  extends StackScreenProps<RootStackParams, 'UserMessageScreen'> {}

export const UserMessageScreen = ({route, navigation}: Props) => {
  const user = route.params;

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
          placeholder="Text"
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
          // keyboardType="email-address"
          // onChangeText={value => onChange(value, 'email')}
          // value={email}
          // onSubmitEditing={onLogin}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View
          style={{
            backgroundColor: '#2bc48a',
            justifyContent: 'center',
            marginLeft: 12,
            borderRadius: 24,
            padding: 6,
            paddingVertical: 14,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
            }}>
            Enviar
          </Text>
          <View />
        </View>
      </View>
    </View>
  );
};
