import {useEffect, useCallback, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {setLocation} from '@FoodMamaApplication';
import {AppDispatch, RootState} from '@FoodMamaApplication';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geocoder from 'react-native-geocoding';

// Initialize Geocoder with your API key
Geocoder.init('AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk');

export const useCurrentLocation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.location.location);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      Alert.alert('Permission denied', 'Location access is required.');
      return;
    }

    setLoading(true);
    Geolocation.getCurrentPosition(
      async position => {
        try {
          const {latitude, longitude} = position.coords;
          const response = await Geocoder.from(latitude, longitude);

          const filteredAddressComponents =
            response.results[0].address_components.filter(
              component =>
                !component.types.includes('administrative_area_level_1') &&
                !component.types.includes('country'),
            );

          const area = filteredAddressComponents
            .map(component => component.long_name)
            .join(', ');

          dispatch(setLocation({latitude, longitude, area}));
        } catch (err) {
          console.error('Geocoding error:', err);
          // If geocoding fails, still save the coordinates
          dispatch(
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              area: 'Unknown location',
            }),
          );
        } finally {
          setLoading(false);
        }
      },
      err => {
        setError(err.message);
        setLoading(false);
        console.error('Location error:', err.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch, requestLocationPermission]);

  useEffect(() => {
    if (!location) {
      getCurrentLocation();
    }
  }, [location, getCurrentLocation]);

  return {location, loading, error};
};