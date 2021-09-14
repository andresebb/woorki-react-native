import React, {useState} from 'react';
import MapView, {LatLng, MapEvent, Marker} from 'react-native-maps';

interface Mark {
  latitude: number;
  longitude: number;
}

export const Map = () => {
  const [Markers, setMarkers] = useState<Mark[]>([]);

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

  return (
    <MapView
      style={{
        flex: 1,
      }}
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
      {Markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          // title={marker.title}
          // description={marker.description}
        />
      ))}

      {/* <Marker
        // image={require('../assets/custom-marker.png')}
        coordinate={{
          latitude: 33.02780410065642,
          longitude: -96.83049704879522,
        }}
        title="Este es el titulo"
        description="Soy la descripcion"
      /> */}
    </MapView>
  );
};
