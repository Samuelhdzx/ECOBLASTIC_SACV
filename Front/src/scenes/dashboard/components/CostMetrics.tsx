import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetCostMetricsQuery } from '@/state/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const CostMetrics = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetCostMetricsQuery(undefined, {
    pollingInterval: 3000
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '1rem',
          border: '1px solid #06d6a0',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
          <Typography sx={{ color: '#fff', mb: 1 }}>
            {label}
          </Typography>
          {payload.map((item: any, index: number) => (
            <Typography key={index} sx={{ color: item.color }}>
              {`${item.name}: $${item.value.toFixed(2)}`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <DashboardBox gridArea={gridArea}>
      <BoxHeader
        title="Análisis de Costos"
        subtitle="Costos de producción y materiales"
        icon={<MonetizationOnIcon />}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* KPIs de Costos */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 2,
            p: 2
          }}>
            <Box sx={{
              bgcolor: 'rgba(6, 214, 160, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Costo por Pieza</Typography>
              <Typography variant="h5" color="#06d6a0">
                ${data?.costPerPiece.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(239, 71, 111, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Costo Desperdicio</Typography>
              <Typography variant="h5" color="#ef476f">
                ${data?.wasteCost.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(255, 209, 102, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Ahorro Total</Typography>
              <Typography variant="h5" color="#ffd166">
                ${data?.totalSavings.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Costos por material */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={data?.costsByMaterial || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="material" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="materialCost" 
                    name="Costo Material" 
                    fill="#06d6a0" 
                  />
                  <Bar 
                    dataKey="wasteCost" 
                    name="Costo Desperdicio" 
                    fill="#ef476f" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Tendencia de reducción de costos */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={data?.costReductionTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="costPerPiece" 
                    name="Costo por Pieza" 
                    stroke="#06d6a0" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    name="Ahorro" 
                    stroke="#ffd166" 
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

export default CostMetrics;
