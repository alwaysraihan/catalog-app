import {StyleSheet, View} from 'react-native';
import {useGetProductsQuery, localStorage} from '@FoodMamaApplication';
import {ProductCard, ProductCardSkeleton, ProductListHeader} from '@FoodMamaUi';
import {FlashList} from '@shopify/flash-list';
import React from 'react';

export const ProductsSection = () => {
  const {data: products = [], isLoading, isError} = useGetProductsQuery(10);
  const previousProducts = localStorage.getString('products');

  if (isError && previousProducts) {
    const parsedProducts = previousProducts
      ? (JSON.parse(previousProducts) as Product[])
      : [];
    return (
      <FlashList
        ListHeaderComponent={ProductListHeader}
        data={parsedProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <ProductCard product={item} />
          </View>
        )}
        estimatedItemSize={330}
      />
    );
  }
  if (isLoading || isError) {
    return (
      <FlashList
        ListHeaderComponent={ProductListHeader}
        data={[1, 2, 3, 4]}
        keyExtractor={item => item.toString()}
        numColumns={2}
        renderItem={() => (
          <View style={styles.itemContainer}>
            <ProductCardSkeleton />
          </View>
        )}
        estimatedItemSize={330}
      />
    );
  }
  return (
    <FlashList
      ListHeaderComponent={ProductListHeader}
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
