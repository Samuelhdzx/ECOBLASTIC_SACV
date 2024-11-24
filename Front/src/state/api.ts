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
  endpoints: (builder) => ({
    getSensorData: builder.query({
      query: () => '/api/data_sensors'
    })
  })
});


 export const { useGetSensorDataQuery } = api;


//  //Mongo db 
//  Username: hernandezbarriossamuel
//  password: eco_07
// IP: 189.234.144.161/32

//"kpi/kpis = sensor/sensors"
//Kpis = Sensors