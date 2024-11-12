import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DeliveryAreaHeader, HomeSlider} from '@FoodMamaUi';
import {formatDate} from '@FoodMamaApplication';

const {CurrentTimeModule} = NativeModules;

export const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(CurrentTimeModule);
    const subscription = eventEmitter.addListener('onTimeUpdate', event => {
      console.log('Received timestamp:', event.timestamp);
      const localTime = formatDate(event.timestamp);
      setCurrentTime(localTime);
    });

    CurrentTimeModule.startTimeUpdate();
    return () => {
      subscription.remove();
      CurrentTimeModule.stopTimeUpdate();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'red'} />
      <DeliveryAreaHeader />
      <HomeSlider />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{currentTime}</Text>
      </View>
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
