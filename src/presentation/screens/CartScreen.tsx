import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  colors,
  RootState,
  updateQuantity,
  useAppDispatch,
} from '@FoodMamaApplication';
import {FlashList} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/Ionicons';

interface Cart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartScreen = () => {
  const {items} = useSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();

  const renderItem = ({item}: {item: Cart}) => {
    const handleIncrease = () =>
      dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}));
    const handleDecrease = () =>
      dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}));
    return (
      <View style={styles.cartItem}>
        <View style={styles.titleConainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              disabled={item.quantity === 1}
              onPress={handleDecrease}>
              <Icon name="remove-circle-outline" size={30} color="#555" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity.toFixed(2)}</Text>
            <TouchableOpacity onPress={handleIncrease}>
              <Icon name="add-circle-outline" size={30} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      <FlashList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        estimatedItemSize={100}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  titleConainer: {
    flexGrow: 1,
  },
  productName: {
    fontSize: 18,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  quantity: {
    fontSize: 14,
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
    flexShrink: 0,
  },
});
