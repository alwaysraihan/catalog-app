import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FTypography} from '../../atoms';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DeliveryAreaHeader = () => {
  return (
    <View style={styles.container}>
      {/* left side  */}
      <View>
        <FTypography variant="h4" style={styles.title}>Deliver To</FTypography>
        <FTypography variant="regular" style={styles.subTitle}>
          Aftab Nagor Dhaka
        </FTypography>
      </View>
      {/* right side  */}
      <TouchableOpacity style={styles.rightCotanier}>
        <FTypography variant="regular" style={styles.subTitle}>
          Change Area
        </FTypography>
        <MaterialIcons name="map-marker" color={'white'} size={18} />
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    backgroundColor: 'red',
  },
  title: {fontWeight: '500', color: 'white'},
  subTitle: {color: 'white'},
  rightCotanier: {flexDirection: 'row', alignItems: 'center'},
});
