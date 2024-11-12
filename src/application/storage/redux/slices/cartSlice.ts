import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProduct, updateQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
