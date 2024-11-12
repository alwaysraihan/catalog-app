import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const ProductListHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
});
