import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {productFetchApi} from '@FoodMamaApplication';
import {setupListeners} from '@reduxjs/toolkit/query';
import locationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    [productFetchApi.reducerPath]: productFetchApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productFetchApi.middleware),
});

// Enables refetching on focus/reconnect
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
