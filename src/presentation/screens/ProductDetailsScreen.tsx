import React from 'react';
import {Text, Image, StyleSheet, ActivityIndicator, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';
import {colors, useGetProductDetailsQuery} from '@FoodMamaApplication';

type ProductDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetailsScreen'
>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {productId} = route.params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading product details</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <>
          <Image source={{uri: product.image}} style={styles.productImage} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.rating}>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#333',
  },
});
