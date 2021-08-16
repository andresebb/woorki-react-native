import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  logo: string;
  bgColor: string;
  image?: boolean | undefined;
  textColor?: string;
  onPress?: () => void;
}

export const ButtonSign = ({
  title,
  logo,
  bgColor,
  textColor,
  image,
  onPress,
}: Props) => {
  return (
    // <TouchableOpacity onPress={() => onPress!()}>
    <View style={{...styles.buttonContainer, backgroundColor: bgColor}}>
      <View style={styles.textContainer}>
        {image ? (
          <Image
            source={require('../assets/googleIcon.png')}
            style={{
              width: 26,
              height: 26,
            }}
          />
        ) : (
          <Icon name={logo} size={26} color={textColor} />
        )}
        <Text style={{...styles.text, color: textColor}}>{title}</Text>
        <View />
      </View>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
