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
}

export interface TemperatureData {
  temperature: number;
  injectionTime: number;
  createdAt: string;
}

export interface ProductivityMetrics {
  totalPieces: number;
  hourlyProduction: Array<{ hour: string; pieces: number }>;
  cycleProduction: Array<{ cycle: string; time: number }>;
  averageCycleTime: number;
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
  tagTypes: ['SensorData'],
  endpoints: (builder) => ({
    getSensorData: builder.query({
      query: () => ({
        url: '/api/data_sensors',
        method: 'GET',
        credentials: 'include'
      }),
      transformResponse: (response: any) => {
        console.log('Raw sensor data:', response);
        return Array.isArray(response) ? response : [];
      },
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
      query: () => 'api/sensors',
      providesTags: ['SensorData']
    }),

    getProductivityMetrics: builder.query<ProductivityMetrics, void>({
      query: () => ({
        url: '/api/metrics/productivity',
        method: 'GET',
        credentials: 'include'
      }),
      transformResponse: (response: any) => {
        return {
          totalPieces: response.totalPieces || 0,
          hourlyProduction: response.hourlyProduction || [],
          cycleProduction: response.cycleProduction || [],
          averageCycleTime: response.averageCycleTime || 0
        };
      }
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
  useGetProductivityMetricsQuery
} = api;
