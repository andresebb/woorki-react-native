import React, {useState, useEffect, useRef} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API} from '@env';

interface Location {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [hasLocation, sethasLocation] = useState(false);
  const [city, setCity] = useState('Location');

  const [initialLocation, setInitialLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  const watchId = useRef<number>();
  const isMounted = useRef(true);

  //Google APi
  useEffect(() => {
    if (GOOGLE_API) Geocoder.init(GOOGLE_API);
  }, [GOOGLE_API]);

  //Evitar errores, con esto sabremos cuando el componente este o no montado
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) return;

      setInitialLocation(location);
      setUserLocation(location);
      sethasLocation(true);

      getUserCity(location.latitude, location.longitude);
    });
  }, []);

  const getUserCity = (latitude: number, longitude: number) => {
    Geocoder.from(latitude, longitude)
      .then(location => {
        const city = location.results[4].formatted_address;
        const splitCity = city.split(',');
        const newCity = `${splitCity[0]}, ${splitCity[1]}`;
        setCity(newCity);
      })
      .catch(err => console.log(err));
  };

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  return {
    hasLocation,
    initialLocation,
    getCurrentLocation,
    userLocation,
    city,
  };
};
