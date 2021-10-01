import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {BackgroundWhite} from '../components/BackgroundWhite';
import SmallLogo from '../components/SmallLogo';

export const CreateJobScreen2 = () => {
  return (
    <BackgroundWhite>
      <View style={styles.containerScreenTitle}>
        <SmallLogo />
        <Text style={styles.screenTitle}>New Job</Text>
      </View>

      <View style={{flex: 1, padding: 24}}>
        <Text>
          Move around the map and press in the zone that is located the place of
          the work
        </Text>
        <MapView
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: 33.005028,
            longitude: -96.824821,
            latitudeDelta: 0.1864195044303443,
            longitudeDelta: 0.1840142817690068,
          }}></MapView>
        <TouchableOpacity
          style={{
            marginBottom: 28,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              backgroundColor: '#2bc48a',
              paddingHorizontal: 24,
              marginTop: 24,
              paddingVertical: 12,
              borderRadius: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  containerScreenTitle: {
    alignItems: 'center',
    marginTop: 24,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 12,
    color: '#2bc48a',
    fontWeight: 'bold',
  },
});
