import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  addProduct,
  useAppDispatch,
  useGetProductDetailsQuery,
  localStorage,
  addToHistory,
} from '@FoodMamaApplication';

type ProductDetailsRouteProp = RouteProp<
  HomeStackParamList,
  'ProductDetailsScreen'
>;

export const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {productId} = route.params;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const [cachedProduct, setCachedProduct] = useState<Product | null>(null);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  // Check for cached product data if error occurs
  useEffect(() => {
    if (error && !product) {
      const storedProduct = localStorage.getString('products');
      if (storedProduct) {
        const isExisting = JSON.parse(storedProduct).find(
          (item: Product) => item.id === productId,
        );
        if (isExisting) {
          setCachedProduct(isExisting);
        }
      }
    } else if (product) {
      // Cache product data on successful fetch
      localStorage.set(`product_${productId}`, JSON.stringify(product));
    }
  }, [error, product, productId]);
  const displayProduct = product || cachedProduct;
  useEffect(() => {
    if (displayProduct) {
      dispatch(addToHistory(displayProduct));
    }
  }, [dispatch, displayProduct]);
  const handleAddToCart = () => {
    if (product) {
      dispatch(addProduct({...product, quantity}));
      Alert.alert('Success', 'Product added to cart successfully');
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  if (error && !displayProduct) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading product details</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {displayProduct && (
          <>
            <Image
              source={{uri: displayProduct.image}}
              style={styles.productImage}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>{displayProduct.title}</Text>
            <Text style={styles.price}>${displayProduct.price}</Text>
            <Text style={styles.description}>{displayProduct.description}</Text>

            <View style={styles.cartActionsContainer}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={handleDecrease}
                  style={styles.iconButton}>
                  <Icon name="remove-circle-outline" size={30} color="#555" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={handleIncrease}
                  style={styles.iconButton}>
                  <Icon name="add-circle-outline" size={30} color="#555" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleAddToCart}
                style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
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
    marginVertical: 10,
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 6,
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
  cartActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
