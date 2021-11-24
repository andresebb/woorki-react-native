import React, {useEffect, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {AppContext} from '../context/AppContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Tab4';
import {UserActiveCard} from '../components/UserActiveCard';
import {FlatList} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'MessagesScreen'> {}

export const MessagesScreen = ({navigation}: Props) => {
  const {chatsActives} = useContext(AppContext);

  return (
    <BackgroundWhite>
      {chatsActives.length > 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Chat Actives</Text>
          <FlatList
            data={chatsActives}
            keyExtractor={user => user.uid}
            showsVerticalScrollIndicator={false}
            renderItem={({item}: any) => {
              return (
                <UserActiveCard
                  key={item.uid}
                  user={item}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.newConversationContainer}>
          <Text style={styles.newConversationText}>
            Start a new conversation
          </Text>
        </View>
      )}
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  newConversationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newConversationText: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.5,
    letterSpacing: 1.5,
  },
});
