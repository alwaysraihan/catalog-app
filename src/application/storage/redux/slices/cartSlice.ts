import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {localStorage} from '@FoodMamaApplication';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: Product[];
}

const loadCartFromStorage = (): CartState => {
  const storedCart = localStorage.getString('cart');
  return storedCart ? JSON.parse(storedCart) : {items: []};
};

const initialState: CartState = loadCartFromStorage();

const saveCartToStorage = (state: CartState) => {
  localStorage.set('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>,
    ) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        product.price = action.payload.quantity * product.price;
      }
      saveCartToStorage(state);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state);
    },
  },
});

export const {addProduct, updateQuantity, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
