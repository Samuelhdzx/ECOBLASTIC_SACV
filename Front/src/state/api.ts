import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  production: {
    hourlyProduction: number;
    piecesProduced: number;
    defectivePieces: number;
    efficiency: number;
  };
  quality: {
    defectRate: number;
    materialWaste: number;
    qualityRate: number;
  };
  costs: {
    materialCost: number;
    operationalCost: number;
    wasteCost: number;
  };
  machine: {
    cycleTime: number;
    oee: number;
    mtbf: number;
    maintenanceStatus: string;
  };
  operator: {
    id: string;
    name: string;
    responseTime: number;
    productivity: number;
  };
}

export interface TemperatureData {
  temperature: number;
  injectionTime: number;
  createdAt: string;
}

interface DataResponse {
  temperature: number;
  injectionTime: number;
  polymerUsage: {
    pet: number;
    polypropylene: number;
  };
  moldUsage: {
    mold1: number;
    mold2: number;
    mold3: number;
  };
  production: {
    hourlyProduction: number;
    piecesProduced: number;
    defectivePieces: number;
    efficiency: number;
  };
  quality: {
    defectRate: number;
    materialWaste: number;
    qualityRate: number;
  };
  costs: {
    materialCost: number;
    operationalCost: number;
    wasteCost: number;
  };
  createdAt: string;
}

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
  tagTypes: ['SensorData', 'Users', 'Production', 'Inventory', 'Maintenance', 'Quality'],
  endpoints: (builder) => ({
    getSensorData: builder.query<DataResponse[], void>({
      query: () => 'api/data_sensors',
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
    }),

    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/api/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Users']
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
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
      query: () => '/api/production/metrics',
      providesTags: ['Production']
    }),

    getInventoryLevels: builder.query({
      query: () => '/api/inventory/levels',
      providesTags: ['Inventory']
    }),

    getQualityMetrics: builder.query({
      query: () => '/api/quality/metrics',
      providesTags: ['Quality']
    }),

    getMaintenanceSchedule: builder.query({
      query: () => '/api/maintenance/schedule',
      providesTags: ['Maintenance']
    }),

    updateMachineParams: builder.mutation({
      query: (params) => ({
        url: '/api/production/params',
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['Production']
    }),

    getTemperatures: builder.query<TemperatureData[], void>({
      query: () => ({
        url: '/api/sensors', // Cambiar a la misma ruta que usa Row3
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
      // Actualizar cada 3 segundos como en Row3
      pollingInterval: 3000,
      providesTags: ['SensorData']
    }),

    getLatestData: builder.query<DataResponse, void>({
      query: () => 'api/data_sensors/latest'
    }),
  })
});

export const {
  useGetSensorDataQuery,
  useAddSensorDataMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useRegisterUserMutation,
  useGetProductionMetricsQuery,
  useGetInventoryLevelsQuery,
  useGetQualityMetricsQuery,
  useGetMaintenanceScheduleQuery,
  useUpdateMachineParamsMutation,
  useGetUserRecordsQuery,
  useGetTemperaturesQuery,
  useGetLatestDataQuery
} = api;
