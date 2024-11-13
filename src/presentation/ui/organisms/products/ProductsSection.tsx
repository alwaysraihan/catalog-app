import {StyleSheet, View} from 'react-native';
import {useGetProductsQuery, localStorage} from '@FoodMamaApplication';
import {ProductCard, ProductCardSkeleton, ProductListHeader} from '@FoodMamaUi';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';

export const ProductsSection = () => {
  const [asc, setAsc] = useState(true);
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({limit: 10, sort: asc ? 'asc' : 'desc'});
  useEffect(() => {
    refetch();
  }, [asc, refetch]);
  const previousProducts = localStorage.getString('products');

  if (isError && previousProducts) {
    const parsedProducts = previousProducts
      ? (JSON.parse(previousProducts) as Product[])
      : [];
    return (
      <FlashList
        ListHeaderComponent={<ProductListHeader asc={asc} setAsc={setAsc} />}
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
        ListHeaderComponent={<ProductListHeader asc={asc} setAsc={setAsc} />}
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
      ListHeaderComponent={<ProductListHeader asc={asc} setAsc={setAsc} />}
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
