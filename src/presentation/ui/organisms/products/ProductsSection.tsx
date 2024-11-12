import {StyleSheet, View} from 'react-native';
import {useGetProductsQuery} from '@FoodMamaApplication';
import {
  HomeSlider,
  ProductCard,
  ProductCardSkeleton,
  ProductListHeader,
} from '@FoodMamaUi';
import {FlashList} from '@shopify/flash-list';
import React from 'react';

function renderHeader() {
  return (
    <>
      <HomeSlider />
      <ProductListHeader />
    </>
  );
}

export const ProductsSection = () => {
  const {data: products = [], isLoading} = useGetProductsQuery(10);
  if (isLoading) {
    return (
      <FlashList
      ListHeaderComponent={renderHeader}
        data={[1, 2, 3, 4]}
        keyExtractor={item => item.toString()}
        numColumns={2}
        renderItem={() => (
          <View style={styles.itemContainer}>
            <ProductCardSkeleton />
          </View>
        )}
        estimatedItemSize={150}
      />
    );
  }
  return (
    <FlashList
      ListHeaderComponent={renderHeader}
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
