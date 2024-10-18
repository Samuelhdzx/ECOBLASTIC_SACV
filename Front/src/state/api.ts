import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main", 
    tagTypes: [],
    endpoints: (build) => ({
        getSensorData: build.query<void, void>({
            query: () => "sensor/sensors/", 
            providesTags: ["Sensors"]
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