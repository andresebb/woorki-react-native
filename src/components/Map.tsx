import React, {useState, useRef, useEffect} from 'react';

import MapView, {Callout, LatLng, MapEvent, Marker} from 'react-native-maps';
import {
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  Platform,
  _ScrollView,
  TextInput,
} from 'react-native';

import {markers} from './mapData';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {moveMaptoTheJob, onMarkerPress} from '../helpers/MapHelpers';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {MapJobCard} from './MapJobCard';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

interface Mark {
  latitude: number;
  longitude: number;
}

export const Map = () => {
  const {jobs} = useContext(AppContext);

  const initialState = {
    markers,
    categories: [
      {
        name: 'Hotels',
      },
      {
        name: 'Construcctions',
      },
      {
        name: 'Kitchen',
      },
      {
        name: 'Landscaping',
      },
      {
        name: 'Painting',
      },
    ],
    region: {
      latitude: 33.080410065642,
      longitude: -96.83049704879522,
      latitudeDelta: 0.1864195044303443,
      longitudeDelta: 0.1840142817690068,
    },
  };

  const [state, setstate] = useState(initialState);

  const _map = useRef(null);
  const _scrollView = useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      //Value is the card Width.
      //We get the index so we know what job we are going to move to.
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

      if (index >= jobs.length) {
        index = jobs.length - 1;
      }

      if (index <= 0) {
        index = 0;
      }

      moveMaptoTheJob(jobs, index, _map, mapIndex);
    });
  });

  //Scale Marker
  const scaleMarker = jobs.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  return (
    <>
      <MapView
        style={{
          flex: 1,
        }}
        ref={_map}
        showsUserLocation
        // onLongPress={coordinate => getCordenadas(coordinate)}
        initialRegion={{
          latitude: 33.005121,
          longitude: -96.825859,
          latitudeDelta: 0.1864195044303443,
          longitudeDelta: 0.1840142817690068,
        }}>
        {/* Markers */}
        {jobs.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: scaleMarker[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={e =>
                onMarkerPress(
                  e,
                  _scrollView,
                  CARD_WIDTH,
                  SPACING_FOR_CARD_INSET,
                )
              }>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/pointer.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      {/* SEARCH */}
      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
        />
        <Icon name="ios-search" size={20} />
      </View> */}

      {/* HORIZONTAL CATEGORIES */}
      {/* <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {state.categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem}>
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/*CARD LIST ANIMATION SCROLL */}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={{
          // backgroundColor: 'red',
          position: 'absolute',
          bottom: 30,
          paddingVertical: 12,
          paddingRight: 30,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {jobs.map((marker, index) => (
          <MapJobCard key={index} job={marker} index={index} />
        ))}
      </Animated.ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
