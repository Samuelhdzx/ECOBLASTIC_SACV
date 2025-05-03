import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetProductivityMetricsQuery } from '@/state/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';

const ProductivityMetrics = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetProductivityMetricsQuery(undefined, {
    pollingInterval: 3000
  });

  const hourlyData = data?.hourlyProduction || [];
  const cycleData = data?.cycleProduction || [];

  return (
    <DashboardBox gridArea={gridArea}>
      <BoxHeader
        title="Productividad"
        subtitle="Piezas producidas y tiempo de ciclo"
        icon={<AssessmentIcon />}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Indicadores numéricos */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            p: 2,
            gap: 2 
          }}>
            <Box sx={{
              bgcolor: 'rgba(58, 134, 255, 0.1)',
              p: 2,
              borderRadius: 2,
              flex: 1
            }}>
              <Typography variant="h6">Total Piezas</Typography>
              <Typography variant="h4">{data?.totalPieces || 0}</Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(20, 184, 166, 0.1)',
              p: 2,
              borderRadius: 2,
              flex: 1
            }}>
              <Typography variant="h6">Tiempo Promedio</Typography>
              <Typography variant="h4">{data?.averageCycleTime || 0}s</Typography>
            </Box>
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Gráfico de barras: Producción por hora */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pieces" fill="#3a86ff" name="Piezas/Hora" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Gráfico de línea: Tiempo de ciclo */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={cycleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cycle" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#14b8a6" 
                    name="Tiempo/Ciclo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      )}
    </DashboardBox>
  );
};

export default ProductivityMetrics;
