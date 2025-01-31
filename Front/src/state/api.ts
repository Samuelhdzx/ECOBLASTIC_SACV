import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['SensorData', 'Users'],
  endpoints: (builder) => ({
    getSensorData: builder.query({
      query: () => ({
          url: '/api/data_sensors',
          method: 'GET',
          credentials: 'include'
      }),
      providesTags: ['SensorData']
  }),
  
    addSensorData: builder.mutation({
      query: (data) => ({
        url: '/api/data_sensors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SensorData']
    }),
    getAllUsers: builder.query({
      query: () => '/api/users',
      providesTags: ['Users']
    })
  })
});

export const { 
  useGetSensorDataQuery, 
  useAddSensorDataMutation,
  useGetAllUsersQuery 
} = api;



//  //Mongo db 
//  Username: hernandezbarriossamuel
//  password: eco_07
// IP: 189.234.144.161/32

//"kpi/kpis = sensor/sensors"
//Kpis = Sensors