import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Image, StyleSheet} from 'react-native';
import {RootStackParams} from '../navigation/Tab1';
interface Props extends StackScreenProps<RootStackParams, 'JobDetailScreen'> {}

export const JobDetailScreen = ({route}: Props) => {
  // console.log(route.params);

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/construction.png')}
            style={{
              height: '100%',
              width: '100%',
              // borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
          <View style={styles.imageShadow}></View>
          <View
            style={{
              // backgroundColor: 'orange',
              alignItems: 'center',
              position: 'absolute',
              zIndex: 9999,
              bottom: -15,
              right: 0,
              left: 0,
            }}>
            <Text
              style={{
                color: 'white',
                backgroundColor: '#2bc48a',
                padding: 12,
                borderRadius: 16,
                fontWeight: 'bold',
                letterSpacing: 2,
              }}>
              Construction Worker
            </Text>
            <Text>Description</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: '40%',
  },
  imageShadow: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    zIndex: 500,
    top: 0,
    bottom: -26,
    right: 0,
    left: 0,
    borderBottomRightRadius: 60,
  },
});
