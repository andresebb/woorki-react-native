import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {CreateJobImage} from '../components/CreateJobImage';
import {OneBackArrow} from '../components/OneBackArrow';
import {RootStackParams} from '../navigation/Tab2';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {LoadingModal} from '../components/loadingModal';

interface Props extends StackScreenProps<RootStackParams, 'CreateJobScreen3'> {}

export const CreateJobScreen3 = ({navigation}: Props) => {
  const [imageUri, setImageUri] = useState('');
  const {uploadImageStorage, sendJobToFirebase, loading} =
    useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
        uploadImageStorage(resp.assets?.[0].uri);
      },
    );
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets?.[0].uri) return;
        setImageUri(resp.assets?.[0].uri);
        setShowModal(false);
        uploadImageStorage(resp.assets?.[0].uri);
      },
    );
  };

  return (
    <BackgroundWhite>
      <CreateJobImage />
      <OneBackArrow navigation={navigation} />
      <View style={{flex: 1, alignItems: 'center', padding: 12}}>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Add a picture</Text>
          <Text>With a picture you have more posibilities to get views</Text>
        </View>
        <View style={styles.pictureContainer}>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.picture}>
            {imageUri.length > 0 ? (
              <Image
                source={{uri: imageUri}}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <Icon name="add-outline" size={80} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={sendJobToFirebase} style={styles.boton}>
            <Text style={styles.buttonText}>Create job</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <LoadingModal />}

      {showModal && (
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          style={{...styles.modalContainer}}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              onPress={takePhoto}
              style={{
                ...styles.modalButtonContainer,
                backgroundColor: '#007FFF',
              }}>
              <Text style={styles.modalButtonText}>TAKE PICTURE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhotoFromGallery}
              style={styles.modalButtonContainer}>
              <Text style={styles.modalButtonText}>GALLERY</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginVertical: 12,
    textAlign: 'left',
  },
  pictureContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  picture: {
    borderColor: 'black',
    borderWidth: 1,
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3000,
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '100%',
    flex: 2,
    justifyContent: 'center',
  },
  boton: {
    backgroundColor: '#2bc48a',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 14,
    // width: '40%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },

  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 64,
    borderRadius: 12,
  },
  modalButtonContainer: {
    backgroundColor: '#2bc48a',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginVertical: 12,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
