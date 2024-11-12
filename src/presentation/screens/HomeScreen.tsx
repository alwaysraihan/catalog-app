import React from 'react';
import {

  StatusBar,
  StyleSheet,

} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CurrentTimeView, DeliveryAreaHeader, HomeSlider, ProductsSection} from '@FoodMamaUi';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'red'} />
      <DeliveryAreaHeader />
      <HomeSlider />
      <ProductsSection />
      <CurrentTimeView/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  timeContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
});
