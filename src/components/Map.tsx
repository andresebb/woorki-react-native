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
} from 'react-native';
import {JobMap} from './JobMap';
import {markers} from './mapData';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.9;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

interface Mark {
  latitude: number;
  longitude: number;
}

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

export const Map = () => {
  const [Markers, setMarkers] = useState<Mark[]>([]);

  const [state, setstate] = useState(initialState);

  const getCordenadas = (coordenadas: MapEvent<{}>) => {
    const {latitude, longitude} = coordenadas.nativeEvent.coordinate;

    setMarkers([
      ...Markers,
      {
        latitude,
        longitude,
      },
    ]);
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = state.markers.map((marker, index) => {
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

  const onMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  return (
    <>
      <MapView
        style={{
          flex: 1,
        }}
        ref={_map}
        showsUserLocation
        onLongPress={coordinate => getCordenadas(coordinate)}
        // onMarkerPress={() => console.log('quetalco amifo')}
        initialRegion={{
          latitude: 33.005121,
          longitude: -96.825859,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* Show all Locations */}
        {/* {Markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          // title={marker.title}
          // description={marker.description}
        />
      ))} */}

        {/* Marcadores */}
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}>
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

        {/* <Marker
        coordinate={{
          latitude: 33.080410065642,
          longitude: -96.83049704879522,
        }}
        title="Este es el titulo"
        description="Soy la descripcion">
        <JobMap />
      </Marker>
      <Marker
        coordinate={{
          latitude: 33.12780410065642,
          longitude: -96.83049704879522,
        }}
        title="Este es el titulo"
        description="Soy la descripcion">
        <JobMap />
      </Marker>
      <Marker
        coordinate={{
          latitude: 33.0580410065642,
          longitude: -96.85049704879522,
        }}
        title="Este es el titulo"
        description="Soy la descripcion">
        <JobMap />
      </Marker> */}
      </MapView>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex: 1, padding: 0}}
        />
        <Icon name="ios-search" size={20} />
      </View>

      {/* HORIZONTAL CATEGORIES */}
      <ScrollView
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
      </ScrollView>

      {/* ANIMATION SCROLL */}

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
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{uri: marker.image}}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
          </View>
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
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
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
