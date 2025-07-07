import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from '../config/api';

export interface UserRecord {
  _id: string;
  temperature: number;
  polymerUsage: {
    pet: number;
    polypropylene: number;
  };
  efficiency: number;
  status: string;
  createdAt: string;
}

export interface TemperatureData {
  temperature: number;
  injectionTime: number;
  createdAt: string;
}

// Configuración de la URL base según el entorno
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://ecoblastic-sacv.onrender.com';
  }
  return 'http://localhost:1337';
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['SensorData', 'Users', 'Production', 'Inventory', 'Maintenance', 'Quality'],
  endpoints: (builder) => ({
    getSensorData: builder.query({
      query: () => ({
        url: '/data_sensors',
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: ['SensorData']
    }),

    getAllSensorDataForAnalysis: builder.query({
      query: () => ({
        url: '/data_sensors-analysis',
        method: 'GET',
        credentials: 'include'
      }),
      providesTags: ['SensorData']
    }),

    addSensorData: builder.mutation({
      query: (data) => ({
        url: '/data_sensors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SensorData']
    }),

    startMonitoring: builder.mutation({
      query: (data) => ({
        url: '/sensor-data',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SensorData']
    }),

    finalizeMonitoring: builder.mutation({
      query: ({ id, qualityData }) => ({
        url: `/sensor-data/${id}/finalize`,
        method: 'PUT',
        body: qualityData,
      }),
      invalidatesTags: ['SensorData']
    }),

    getActiveMonitoring: builder.query({
      query: () => ({
        url: '/active-monitoring',
        method: 'GET',
      }),
      providesTags: ['SensorData']
    }),

    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users']
    }),

    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users']
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
    }),

    getUserRecords: builder.query<UserRecord[], string>({
      query: (userId) => ({
        url: `/data/user/${userId}`,
        method: 'GET',
      }),
    }),

    getProductionMetrics: builder.query({
      query: () => '/admin/production-metrics',
      providesTags: ['Production']
    }),

    getInventoryLevels: builder.query({
      query: () => '/admin/inventory-levels',
      providesTags: ['Inventory']
    }),

    getQualityMetrics: builder.query({
      query: () => '/admin/quality-metrics',
      providesTags: ['Quality']
    }),

    getMaintenanceSchedule: builder.query({
      query: () => '/admin/maintenance-schedule',
      providesTags: ['Maintenance']
    }),

    updateMachineParams: builder.mutation({
      query: (params) => ({
        url: '/admin/machine-params',
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Production']
    }),

    getTemperatures: builder.query<TemperatureData[], void>({
      query: () => ({
        url: '/sensors',
        method: 'GET',
        credentials: 'include'
      }),
      transformResponse: (response: any) => {
        console.log('Raw response:', response);
        // Transformar los datos al formato esperado
        if (Array.isArray(response)) {
          return response.map(item => ({
            temperature: Number(item.temperature),
            injectionTime: Number(item.injectionTime),
            createdAt: item.timestamp || new Date().toISOString()
          }));
        }
        return [];
      },
      providesTags: ['SensorData']
    })
  })
});

export const {
  useGetSensorDataQuery,
  useGetAllSensorDataForAnalysisQuery,
  useAddSensorDataMutation,
  useStartMonitoringMutation,
  useFinalizeMonitoringMutation,
  useGetActiveMonitoringQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useRegisterUserMutation,
  useGetProductionMetricsQuery,
  useGetInventoryLevelsQuery,
  useGetQualityMetricsQuery,
  useGetMaintenanceScheduleQuery,
  useUpdateMachineParamsMutation,
  useGetUserRecordsQuery,
  useGetTemperaturesQuery
} = api;
