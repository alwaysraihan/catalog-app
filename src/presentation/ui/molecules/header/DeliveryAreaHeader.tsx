import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FTypography} from '../../atoms';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, useCurrentLocation} from '@FoodMamaApplication';
import {useNavigation} from '@react-navigation/native';

export const DeliveryAreaHeader = () => {
  const navigation = useNavigation();
  const {location} = useCurrentLocation();
  return (
    <View style={styles.container}>
      {/* left side  */}
      <View style={styles.leftContainer}>
        <FTypography variant="h4" style={styles.title}>
          Deliver To
        </FTypography>
        <FTypography
          variant="regular"
          style={styles.subTitle}
          numberOfLines={1}>
          {location?.area || 'Dhaka, Bangladesh'}
        </FTypography>
      </View>
      {/* right side  */}
      {/* @ts-ignore  */}
      <TouchableOpacity style={styles.rightContainer} onPress={() => {navigation.navigate('Location')}}>
        <FTypography variant="regular" style={styles.changeArea}>
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
    backgroundColor: colors.primary,
  },
  leftContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontWeight: '500',
    color: 'white',
  },
  subTitle: {
    color: 'white',
  },
  changeArea: {
    color: 'white',
    marginRight: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
});
