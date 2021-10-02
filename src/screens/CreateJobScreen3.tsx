import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {CreateJobImage} from '../components/CreateJobImage';
import {OneBackArrow} from '../components/OneBackArrow';
import {RootStackParams} from '../navigation/Tab2';

interface Props extends StackScreenProps<RootStackParams, 'CreateJobScreen3'> {}

export const CreateJobScreen3 = ({navigation}: Props) => {
  return (
    <BackgroundWhite>
      <View
        style={{
          flex: 1,
          padding: 12,
        }}>
        <CreateJobImage />
        <OneBackArrow navigation={navigation} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                letterSpacing: 1.5,
                marginVertical: 12,
                textAlign: 'left',
              }}>
              Add a picture
            </Text>
            <Text
              style={{
                marginBottom: 24,
              }}>
              With a picture you have more posibilities to get views
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#2bc48a',
              borderRadius: 300,
              padding: 60,
            }}>
            <Image
              source={require('../assets/man.png')}
              style={{
                width: 80,
                height: 80,
              }}
            />
            <View
              style={{
                borderWidth: 1,
                backgroundColor: 'white',
                height: 50,
                width: 50,
                position: 'absolute',
                bottom: 30,
                right: 10,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="add-outline" size={40} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#2bc48a',
              width: '100%',
              paddingVertical: 20,
              borderRadius: 12,
              marginTop: 80,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22,
                color: 'white',
                fontWeight: 'bold',
              }}>
              Create Job
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWhite>
  );
};
