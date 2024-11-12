import {StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useCurrentLocation} from '@FoodMamaApplication';

export const LocationScreen = () => {
  const {location} = useCurrentLocation();

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapContainer}
      initialRegion={{
        latitude: location?.latitude ?? 0.0,
        longitude: location?.longitude ?? 0.0,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      {location?.latitude && location?.latitude && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={location?.area ?? 'Location'}
          description="Your current location"
        />
      )}
    </MapView>
  );
};
const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});
