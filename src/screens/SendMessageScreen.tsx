import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/Tab4';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../context/appContext';
import Moment from 'react-moment';
import moment from 'moment';
import {AuthContext} from '../context/authContext';

interface Props
  extends StackScreenProps<RootStackParams, 'SendMessageScreen'> {}

export const SendMessageScreen = ({route, navigation}: Props) => {
  const user = route.params;
  const [text, setText] = useState('');
  const {sendMessageToUser, getChatWithUser, chatsWithUser} =
    useContext(AppContext);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    getChatWithUser(user);
  }, []);

  const handleSubmit = async () => {
    await sendMessageToUser(user, text);
    setText('');
  };

  // const dateTo = moment.utcOffset();

  // <View
  //   style={{
  //     // backgroundColor:
  //     //   item.from === currentUser!.uid ? 'green' : 'purple',
  //     flexDirection: 'row',
  //   }}>
  //   <View
  //     style={{
  //       backgroundColor: 'red',
  //       width: '100%',
  //     }}>
  //     <View
  //       style={{
  //         // flex: 1,
  //         flexDirection: 'row',
  //         justifyContent: 'flex-start',
  //       }}>
  //       <Text
  //         style={{
  //           color: 'orange',
  //           backgroundColor: 'blue',
  //           textAlign: 'right',
  //         }}>
  //         {item.text}
  //       </Text>
  //     </View>
  //   </View>
  // </View>;

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.userInfoBox}>
          <Image
            source={require('../assets/avatar.png')}
            style={{
              width: 60,
              height: 60,
              borderRadius: 48,
              marginHorizontal: 8,
            }}
          />
          <View style={styles.userNameBox}>
            <Text style={styles.userName}>{user.displayName}</Text>
            <Text style={styles.userOnline}>Online</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 12,
          backgroundColor: '#f5f5f5',
          marginTop: 12,
          marginHorizontal: 6,
          borderRadius: 12,
        }}>
        <FlatList
          data={chatsWithUser}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent:
                    item.from === currentUser!.uid ? 'flex-end' : 'flex-start',
                  marginVertical: 12,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'right',
                    padding: 12,
                    borderRadius: 6,
                    backgroundColor:
                      item.from === currentUser!.uid ? 'green' : 'purple',
                  }}>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.sendMessageContainer}>
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
          }}
          onChangeText={value => setText(value)}
          value={text}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={handleSubmit}>
          <Icon name="send-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  userInfoBox: {
    flexDirection: 'row',
    flex: 1,
  },
  userNameBox: {
    padding: 6,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  userOnline: {
    color: 'green',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  sendMessageContainer: {
    flex: 2,
    backgroundColor: 'white',
    padding: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendButtonContainer: {
    backgroundColor: '#2bc48a',
    justifyContent: 'center',
    marginLeft: 12,
    borderRadius: 24,
    padding: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
