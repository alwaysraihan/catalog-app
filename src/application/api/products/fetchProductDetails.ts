import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@FoodMamaApplication';

const productDetailsFetchApi = createApi({
  reducerPath: 'productDetailsFetchApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getProductDetails: builder.query<Product, number>({
      query: productId => `products/${productId}`,
    }),
  }),
});

const {useGetProductDetailsQuery} = productDetailsFetchApi;

export {productDetailsFetchApi, useGetProductDetailsQuery};
