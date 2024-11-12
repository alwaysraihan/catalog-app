import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const ProductCardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.imageSkeleton} />
        <View style={styles.contentContainer}>
          <View style={styles.titleSkeleton} />
          <View style={styles.priceSkeleton} />
          <View style={styles.ratingSkeleton} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    padding: 12,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  imageSkeleton: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  contentContainer: {
    marginTop: 12,
  },
  titleSkeleton: {
    width: '80%',
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  priceSkeleton: {
    width: '40%',
    height: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  ratingSkeleton: {
    width: '60%',
    height: 20,
    borderRadius: 4,
  },
});
