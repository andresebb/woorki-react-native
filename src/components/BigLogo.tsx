import React from 'react';
import {StyleSheet, Image, View, StyleProp, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const BigLogo = ({style = {}}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <Image
        source={require('../assets/woorki-no-bg.png')}
        style={{
          width: 300,
          height: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
});
