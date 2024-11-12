import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useCurrentLocation} from '@FoodMamaApplication';

export const LocationScreen = () => {
  const {location} = useCurrentLocation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
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
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
