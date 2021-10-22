import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {BackgroundWhite} from '../components/BackgroundWhite';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/authContext';
import {AppContext} from '../context/appContext';

export const MessagesScreen = () => {
  const {users} = useContext(AppContext);

  console.log(users);

  return (
    <BackgroundWhite>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            opacity: 0.5,
            letterSpacing: 1.5,
          }}>
          Start a new conversation
        </Text>
      </View>
    </BackgroundWhite>
  );
};
