import React from 'react';

import {TouchableOpacity, View, Text, Image} from 'react-native';

import {SignButtonStyle} from '../theme/SignButtonTheme';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const GoogleSignButton = () => {
  const {signInwithGoogle} = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={{...SignButtonStyle.buttonContainer, backgroundColor: '#EBF8FF'}}
      onPress={() => signInwithGoogle()}>
      <View>
        <View style={SignButtonStyle.textContainer}>
          <Image
            source={require('../assets/googleIcon.png')}
            style={{
              width: 26,
              height: 26,
            }}
          />
          <Text style={{...SignButtonStyle.text, color: 'black'}}>
            Sign Up with Google
          </Text>
          <View />
        </View>
      </View>
    </TouchableOpacity>
  );
};
