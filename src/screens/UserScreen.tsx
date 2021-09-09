import React from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {BackgroundImage} from '../components/BackgroundImage';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const screemWidth = Dimensions.get('screen').width;

export const UserScreen = () => {
  const alignImageProfile = screemWidth / 2;

  console.log(alignImageProfile);

  return (
    <ScrollView>
      <BackgroundWhite>
        <View style={styles.container}>
          <View style={styles.rectangule}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
            <Text style={styles.profileText}>Profile</Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/avatar.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <Text style={styles.userName}>Brian Occoner</Text>

          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon color="#b5b5b5" size={34} name="person-outline" />
              <Text style={styles.optionTitle}>Profile Settings</Text>
            </View>
            <Icon color="#b5b5b5" size={34} name="chevron-forward-outline" />
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon color="#b5b5b5" size={34} name="build-outline" />
              <Text style={styles.optionTitle}>Work Profile</Text>
            </View>
            <Icon color="#b5b5b5" size={34} name="chevron-forward-outline" />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon color="#b5b5b5" size={34} name="lock-open-outline" />
              <Text style={styles.optionTitle}>Security Settings</Text>
            </View>
            <Icon color="#b5b5b5" size={34} name="chevron-forward-outline" />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon color="#b5b5b5" size={34} name="warning-outline" />
              <Text style={styles.optionTitle}>Danger Zone</Text>
            </View>
            <Icon color="#b5b5b5" size={34} name="chevron-forward-outline" />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon color="#b5b5b5" size={34} name="warning-outline" />
              <Text style={styles.optionTitle}>Sign Out</Text>
            </View>
            <Icon color="#b5b5b5" size={34} name="chevron-forward-outline" />
          </View>
        </View>
      </BackgroundWhite>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
  rectangule: {
    width: '100%',
    // backgroundColor: '#ffff',
    borderColor: '#2bc48a',
    borderWidth: 2,
    height: 200,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 12,
  },
  circle1: {
    width: 160,
    height: 120,
    borderTopRightRadius: 112,
    backgroundColor: '#2bc48a',
    position: 'absolute',
    bottom: -10,
    left: -20,
  },
  circle2: {
    width: 80,
    height: 80,
    borderRadius: 44,
    backgroundColor: '#2bc48a',
    position: 'absolute',
    top: -38,
    left: '50%',
  },
  circle3: {
    width: 80,
    height: 80,
    borderRadius: 44,
    backgroundColor: '#2bc48a',
    position: 'absolute',
    bottom: -34,
    right: 0,
  },
  profileText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    letterSpacing: 1.5,
    color: '#858585',
  },
  profileImageContainer: {
    marginTop: -50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 38,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  userName: {
    marginVertical: 16,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  optionContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 24,
    padding: 8,
    borderColor: '#858585',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    backgroundColor: 'white',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    marginLeft: 18,
    fontSize: 16,
    color: '#B5B5B5',
  },
});
