import React, {useState, useContext, useEffect} from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {User} from '../interfaces/UserInterface';
import {AuthContext} from '../context/authContext';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface Props {
  user: User;
  navigation: any;
}

export const UserActiveCard = ({user, navigation}: Props) => {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState<FirebaseFirestoreTypes.DocumentData>();

  const user1Id = currentUser?.uid;
  const user2Id = user.uid;

  //Getting the last message
  useEffect(() => {
    if (user1Id && user2Id) {
      const id =
        user1Id > user2Id ? `${user1Id + user2Id}` : `${user2Id + user1Id}`;

      const unsub = firestore()
        .collection('lastMsg')
        .doc(id)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          setData(data);
        });

      return () => unsub();
    }
  }, [currentUser?.uid]);

  const updateLastMessageRead = () => {
    const id =
      user1Id! > user2Id! ? `${user1Id + user2Id!}` : `${user2Id! + user1Id}`;

    firestore()
      .collection('lastMsg')
      .doc(id)
      .get()
      .then(async snapshot => {
        const dato = await firestore().collection('lastMsg').doc(id).get();
        if (dato.data()!.from !== user1Id) {
          firestore()
            .collection('lastMsg')
            .doc(id)
            .update({
              unread: false,
            })
            .then(() => {
              console.log('Last Msg Updated');
            });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <TouchableOpacity
      onPress={() => [
        navigation.navigate('SendMessageScreen', user),
        updateLastMessageRead(),
      ]}
      style={styles.container}>
      {user.photoURL ? (
        <Image
          source={{uri: `${user.photoURL}`}}
          style={{
            width: 60,
            height: 60,
            borderRadius: 48,
          }}
        />
      ) : (
        <Image
          source={require('../assets/avatar.png')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 48,
          }}
        />
      )}
      <View style={styles.infoSide}>
        <View style={styles.topSide}>
          <Text style={styles.name}>{user.displayName}</Text>
          {user.isOnline ? (
            <View style={styles.greencircle} />
          ) : (
            <View style={styles.redcircle} />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {data?.from === user1Id && (
            <Text
              style={{
                color: 'green',
                fontWeight: 'bold',
                marginRight: 4,
              }}>
              Me:
            </Text>
          )}
          <Text
            style={{
              opacity: 0.5,
            }}>
            {data?.text}
          </Text>

          {data?.from !== user1Id && data?.unread && (
            <Text
              style={{
                backgroundColor: 'red',
                fontSize: 10,
                alignItems: 'center',
                color: 'white',
                borderRadius: 8,
                padding: 2,
                marginLeft: 5,
              }}>
              New
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 18,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  infoSide: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  topSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  greencircle: {
    backgroundColor: 'green',
    height: 8,
    width: 8,
    borderRadius: 8,
  },
  redcircle: {
    backgroundColor: 'red',
    height: 8,
    width: 8,
    borderRadius: 8,
  },
});
