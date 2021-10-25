import React, {useEffect, useContext} from 'react';
import {View, Text, Image} from 'react-native';
import {BackgroundWhite} from '../components/BackgroundWhite';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/authContext';
import {AppContext} from '../context/appContext';

export const MessagesScreen = () => {
  const {chatsActives, allUsers} = useContext(AppContext);

  // useEffect(() => {
  //   const userToAdd = users.filter(data => {
  //     for (let i = 0; i < chatsActives.length; i++) {
  //       if (data.uid === chatsActives[i].uid) return data;
  //     }
  //   });

  // }, []);

  // console.log(chatsActives);

  return (
    <BackgroundWhite>
      {chatsActives.length > 0 ? (
        <View
          style={{
            flex: 1,
          }}>
          {chatsActives.map(user => (
            <View
              key={user.uid}
              style={{
                marginVertical: 10,
                padding: 12,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: 'gray',
                flexDirection: 'row',
              }}>
              <Image
                source={require('../assets/avatar.png')}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 48,
                }}
              />
              <Text>{user.displayName}</Text>
            </View>
          ))}
        </View>
      ) : (
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
      )}
    </BackgroundWhite>
  );
};
