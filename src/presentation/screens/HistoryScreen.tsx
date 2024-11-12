import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {clearHistory, RootState} from '@FoodMamaApplication';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
type HistoryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'History'>,
  NativeStackNavigationProp<HomeStackParamList>
>;
export const HistoryScreen = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const dispatch = useDispatch();
  const viewedProducts = useSelector(
    (state: RootState) => state.history.viewedProducts,
  );

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        //@ts-ignore
        navigation.navigate('HomeStack', {
          screen: 'ProductDetailsScreen',
          params: {productId: item.id},
        })
      }>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Viewing History</Text>
        {viewedProducts.length > 0 && (
          <TouchableOpacity
            onPress={() => dispatch(clearHistory())}
            style={styles.clearButton}>
            <Icon name="trash-outline" size={24} color="#FF6347" />
          </TouchableOpacity>
        )}
      </View>

      {viewedProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="time-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No viewing history</Text>
        </View>
      ) : (
        <FlatList
          data={viewedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    color: '#888',
  },
});
