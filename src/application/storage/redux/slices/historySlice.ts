import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
const HISTORY_STORAGE_KEY = 'product_history';

interface HistoryState {
  viewedProducts: Product[];
}

const getInitialState = (): HistoryState => {
  const storedHistory = storage.getString(HISTORY_STORAGE_KEY);
  return {
    viewedProducts: storedHistory ? JSON.parse(storedHistory) : [],
  };
};

const historySlice = createSlice({
  name: 'history',
  initialState: getInitialState(),
  reducers: {
    addToHistory: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      state.viewedProducts = state.viewedProducts.filter(
        item => item.id !== product.id,
      );

      state.viewedProducts.unshift(product);

      state.viewedProducts = state.viewedProducts.slice(0, 20);

      storage.set(HISTORY_STORAGE_KEY, JSON.stringify(state.viewedProducts));
    },
    clearHistory: state => {
      state.viewedProducts = [];
      storage.delete(HISTORY_STORAGE_KEY);
    },
  },
});

export const {addToHistory, clearHistory} = historySlice.actions;
export default historySlice.reducer;
