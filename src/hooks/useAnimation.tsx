import react, {useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';

export const useAnimation = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration: number = 100) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  Animated.timing(position, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const loadingLoop = () => {
    Animated.loop(
      Animated.timing(position, {
        toValue: 1,
        duration: 2500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ).start();

    return position.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  };

  const scaleLoading = () => {
    Animated.loop(
      Animated.timing(scale, {
        toValue: 1,
        duration: 2500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ).start();

    return scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  };

  return {
    opacity,
    position,
    fadeIn,
    fadeOut,
    loadingLoop,
    scaleLoading,
  };
};
