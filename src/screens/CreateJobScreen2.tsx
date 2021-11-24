import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {OneBackArrow} from '../components/OneBackArrow';
import SmallLogo from '../components/SmallLogo';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParams} from '../navigation/Tab2';
import {CreateJobImage} from '../components/CreateJobImage';
import {NextButton} from '../components/NextButton';
import {AppContext} from '../context/AppContext';

interface Props extends StackScreenProps<RootStackParams, 'CreateJobScreen2'> {}

export const CreateJobScreen2 = ({navigation}: Props) => {
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });

  const {updateNewOfferJob} = useContext(AppContext);

  const getCordenadas = (coordenadas: MapEvent<{}>) => {
    const {latitude, longitude} = coordenadas.nativeEvent.coordinate;

    setMarker({
      latitude,
      longitude,
    });

    updateNewOfferJob('coordinate', {
      latitude,
      longitude,
    });
  };

  return (
    <BackgroundWhite>
      <View style={styles.container}>
        <CreateJobImage />
        <OneBackArrow navigation={navigation} />
        <Text style={styles.text}>
          Move around the map and do a long press on the exact point where the
          work place is located.
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            showsUserLocation
            onLongPress={e => getCordenadas(e)}
            initialRegion={{
              latitude: 33.005028,
              longitude: -96.824821,
              latitudeDelta: 0.1864195044303443,
              longitudeDelta: 0.1840142817690068,
            }}>
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          </MapView>
        </View>
        <NextButton screen="CreateJobScreen3" />
      </View>
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
  text: {
    marginVertical: 12,
  },
  mapContainer: {
    flex: 1,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
