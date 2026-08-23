import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setEndpointState } from '../store/slices/endpointSlice';
import { CHECK_ENDPOINT_QUERY, DOCUMENTATION_QUERY } from '../dto/constants';
import { resetResult } from '../store/slices/resultSlice';
import { GetGraphQLDataQueryParams, GetSchemaQueryParams } from '../dto/types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    checkEndpoint: builder.query<string, GetSchemaQueryParams>({
      query: ({ url }) => ({
        url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: 'IntrospectionQuery',
          variables: {},
          query: CHECK_ENDPOINT_QUERY,
        }),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setEndpointState({ isLoading: true, isValid: false }));
        try {
          await queryFulfilled;
          dispatch(setEndpointState({ isLoading: false, isValid: true }));
          dispatch(resetResult());
        } catch {
          dispatch(setEndpointState({ isLoading: false, isValid: false }));
        }
      },
    }),
    getSchema: builder.query<string, GetSchemaQueryParams>({
      query: ({ url }) => ({
        url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: 'IntrospectionQuery',
          variables: {},
          query: DOCUMENTATION_QUERY,
        }),
      }),
    }),
    getGraphQLData: builder.query<string, GetGraphQLDataQueryParams>({
      query: ({ url, operationName, query, variables, headers }) => ({
        url,
        method: 'post',
        headers: Object.assign(
          {
            'Content-Type': 'application/json',
          },
          headers
        ),
        body: JSON.stringify({
          operationName: operationName || null,
          variables: variables || {},
          query,
        }),
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setEndpointState({ isLoading: true }));
        try {
          await queryFulfilled;
          dispatch(setEndpointState({ isLoading: false }));
        } catch {
          dispatch(setEndpointState({ isLoading: false }));
        }
      },
    }),
  }),
});

export const {
  useGetSchemaQuery,
  useGetGraphQLDataQuery,
  useCheckEndpointQuery,
  useLazyGetSchemaQuery,
  useLazyGetGraphQLDataQuery,
  useLazyCheckEndpointQuery,
} = api;

export default api;
