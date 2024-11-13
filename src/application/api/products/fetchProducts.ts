import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL,localStorage} from '@FoodMamaApplication';

const productFetchApi = createApi({
  reducerPath: 'productFetchApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getProducts: builder.query<Product[], number>({
      query: (limit = 10) => `products?limit=${limit}`,
      transformResponse: (response: Product[]) => {
        localStorage.set('products', JSON.stringify(response));
        return response;
      },

    }),
  }),
});

const {useGetProductsQuery} = productFetchApi;

export {productFetchApi, useGetProductsQuery};
