import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {CreateJobImage} from '../components/CreateJobImage';
import {OneBackArrow} from '../components/OneBackArrow';
import {RootStackParams} from '../navigation/Tab2';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

interface Props extends StackScreenProps<RootStackParams, 'CreateJobScreen3'> {}

export const CreateJobScreen3 = ({navigation}: Props) => {
  const [imageUri, setImageUri] = useState('');
  const {uploadImageStorage} = useContext(AppContext);

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets?.[0].uri) return;
        setImageUri(resp.assets?.[0].uri);
        uploadImageStorage(resp.assets?.[0].uri);
      },
    );
  };

  return (
    <BackgroundWhite>
      <View
        style={{
          flex: 1,
          padding: 12,
        }}>
        <CreateJobImage />
        <OneBackArrow navigation={navigation} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                letterSpacing: 1.5,
                marginVertical: 12,
                textAlign: 'left',
              }}>
              Add a picture
            </Text>
            <Text
              style={{
                marginBottom: 24,
              }}>
              With a picture you have more posibilities to get views
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'grey',
              width: 220,
              height: 220,
              borderRadius: 3000,
              overflow: 'hidden',
            }}>
            {imageUri.length > 0 ? (
              <Image
                source={{uri: imageUri}}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Image
                source={require('../assets/man.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            )}

            {/* <View
              style={{
                borderWidth: 1,
                backgroundColor: 'white',
                height: 50,
                width: 50,
                position: 'absolute',
                bottom: 30,
                right: 0,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="add-outline" size={40} />
            </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.buttonText} onPress={takePhotoFromGallery}>
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.buttonText}>Take phote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#2bc48a',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 14,
    width: '40%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
