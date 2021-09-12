import React from 'react';
import {Text, View, Animated} from 'react-native';
import SmallLogo from '../components/SmallLogo';
import {useAnimation} from '../hooks/useAnimation';

export const LoadingModal = () => {
  const {loadingLoop, scaleLoading} = useAnimation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999999,
        backgroundColor: '#B5B5B5',
        opacity: 0.8,
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            transform: [{rotate: loadingLoop(), scale: scaleLoading()}],
          }}>
          <SmallLogo />
        </Animated.View>
        <Text
          style={{
            textAlign: 'center',
            color: '#2bc48a',
            marginTop: 14,
            fontWeight: 'bold',
          }}>
          Loading
        </Text>
      </View>
    </View>
  );
};
