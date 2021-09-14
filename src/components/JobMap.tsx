import React from 'react';
import {Callout} from 'react-native-maps';
import {Text, View, Image} from 'react-native';

export const JobMap = () => {
  return (
    <Callout tooltip>
      <View
        style={{
          backgroundColor: 'white',
          width: 150,
          alignItems: 'center',
        }}>
        <Text>Hyatt Regency</Text>
        <Text>
          <Image
            source={{
              uri: 'https://www.oninstaffing.com/wp-content/uploads/2019/09/hotel_housekeeper_job.jpg',
            }}
            style={{
              width: 150,
              height: 150,
              backgroundColor: 'red',
            }}
          />
        </Text>
        <Text>We need a housekepping Asap</Text>
      </View>
    </Callout>
  );
};
