import {StyleSheet, View} from 'react-native';
import {useGetProductsQuery} from '@FoodMamaApplication';
import {ProductCard} from '@FoodMamaUi';
import {FlashList} from '@shopify/flash-list';
import React from 'react';

export const ProductsSection = () => {
  const {data: products = [], isLoading, error} = useGetProductsQuery(10);

  return (
    <FlashList
      data={products}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <ProductCard product={item} />
        </View>
      )}
      estimatedItemSize={150}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // padding: 8,
    flex: 1,
  },
});
