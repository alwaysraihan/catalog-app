import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CurrentTimeView,
  DeliveryAreaHeader,
  HomeSlider,
  ProductsSection,
} from '@FoodMamaUi';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'red'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <DeliveryAreaHeader />
        <HomeSlider />
        <ProductsSection />
        <CurrentTimeView />
      </ScrollView>
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
