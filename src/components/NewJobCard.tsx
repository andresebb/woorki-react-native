import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

export const NewJobCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/warehouse.png')}
        resizeMode="repeat"
        style={{
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Text>New</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#172051',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    // borderColor: 'white',
    marginVertical: 12,
  },
});
