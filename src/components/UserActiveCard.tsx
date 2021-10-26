import React from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {User} from '../interfaces/UserInterface';

interface Props {
  user: User;
  navigation: any;
}

export const UserActiveCard = ({user, navigation}: Props) => {
  // console.log(user);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserMessageScreen', user)}
      style={styles.container}>
      <Image
        source={require('../assets/avatar.png')}
        style={{
          width: 60,
          height: 60,
          borderRadius: 48,
        }}
      />
      <View style={styles.infoSide}>
        <View style={styles.topSide}>
          <Text style={styles.name}>{user.displayName}</Text>
          {user.isOnline ? (
            <View style={styles.greencircle} />
          ) : (
            <View style={styles.redcircle} />
          )}
        </View>
        <Text
          style={{
            opacity: 0.5,
          }}>
          This was the last message that you have...
        </Text>
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
