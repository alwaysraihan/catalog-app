import {
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {formatDate} from '@FoodMamaApplication';

const {CurrentTimeModule} = NativeModules;
export const CurrentTimeView = () => {
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
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{currentTime}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  timeContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  timeText: {
    color: 'white',
    fontSize: 16,
  },
});
