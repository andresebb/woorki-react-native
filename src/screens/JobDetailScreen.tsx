import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Image, StyleSheet} from 'react-native';
import {RootStackParams} from '../navigation/Tab1';
import  Icon from 'react-native-vector-icons/Ionicons';
import { Map } from '../components/Map';
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
              style={styles.title}>
              Construction Worker
            </Text>
          </View>
        </View>

        {/* Description */}
        <Text style={{
          marginTop: 46,
          marginBottom: 10,
          fontSize: 20,
          letterSpacing: 2,
          color: "#1B1B1B",
        }}>Description</Text>
        <Text style={{
          color: "#858585",
        }}>
          We are looking for a construct ion worker because right now we need more staff so if you are interested jus give me a call and we can startg the process
        </Text>
        {/* Salary */}
        <Text style={{
          marginVertical: 10,
          fontSize: 20,
          letterSpacing: 2,
          color: "#1B1B1B",
        }}>Hourly salary:</Text>
        <Text style={{
          fontWeight: "bold",
          color: "#858585"
        }}>$15.00 / $20.00</Text>
        
        {/* Sponsor */}
        <View style={{
          marginTop: 16,
          marginBottom: 28,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Image
                source={require('../assets/avatar.png')}
                style={{
                  height: 50,
                  width: 50,
                  marginRight: 12
                }}
              />
              <View>
                <Text style={{
                  fontSize: 18,
                  color: "#1B1B1B"
                }}>Brian Oconner</Text>
                <Text style={{
                  color: "#858585",
                  fontWeight: "bold"
                }}>Human Resources</Text>
              </View>
            </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center"
              }}>
            <View style={{
              backgroundColor: "#2bc48a",
              padding: 12,
              borderRadius: 12,
              marginRight: 14,
            }}>
              <Icon name="call-outline" size={20} color="white"/>
            </View>

            <View style={{
              backgroundColor: "#2bc48a",
              padding: 12,
              borderRadius: 12
            }}>
              <Icon name="mail-outline" size={20} color="white"/>
            </View>
          </View>
        </View>
        
        <Map  />
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
    bottom: -34,
    right: 0,
    left: 0,
    borderBottomRightRadius: 60,
  },
  title: {
    color: 'white',
    backgroundColor: '#2bc48a',
    padding: 12,
    borderRadius: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    bottom: -8,
    fontSize: 18,
  }
});
