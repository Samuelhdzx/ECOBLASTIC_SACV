import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main", 
    tagTypes: ["Sensors"],
    endpoints: (build) => ({
        getSensorData: build.query({
            query: () => "api/data_sensors/", 
            providesTags: ["Sensors"],
        })
    })
 })

 export const { useGetSensorDataQuery } = api;


//  //Mongo db 
//  Username: hernandezbarriossamuel
//  password: eco_07
// IP: 189.234.144.161/32

//"kpi/kpis = sensor/sensors"
//Kpis = Sensors