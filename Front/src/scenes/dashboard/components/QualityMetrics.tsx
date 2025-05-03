import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetQualityMetricsQuery } from '@/state/api';
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
import VerifiedIcon from '@mui/icons-material/Verified';

const QualityMetrics = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetQualityMetricsQuery(undefined, {
    pollingInterval: 3000
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '1rem',
          border: '1px solid #10b981',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
          <Typography sx={{ color: '#fff', mb: 1 }}>
            {label}
          </Typography>
          {payload.map((item: any, index: number) => (
            <Typography key={index} sx={{ color: item.color }}>
              {item.name}: {item.value}%
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
        title="Control de Calidad"
        subtitle="Análisis de defectos y material"
        icon={<VerifiedIcon />}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Indicadores numéricos */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 2,
            p: 2
          }}>
            <Box sx={{
              bgcolor: 'rgba(16, 185, 129, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Tasa de Defectos</Typography>
              <Typography variant="h5" color="#10b981">
                {data?.defectRate || 0}%
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Material Utilizado</Typography>
              <Typography variant="h5" color="#818cf8">
                {data?.materialUsage || 0}kg
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(239, 68, 68, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">Desperdicio</Typography>
              <Typography variant="h5" color="#ef4444">
                {data?.wastedMaterial || 0}kg
              </Typography>
            </Box>
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Gráfico de defectos por turno */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={data?.defectsByShift || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="shift" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="defectRate" 
                    name="Tasa de Defectos" 
                    fill="#ef4444" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Gráfico de material usado vs desperdiciado */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={data?.materialUsageHistory || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="used" 
                    name="Material Usado" 
                    stroke="#818cf8" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wasted" 
                    name="Material Desperdiciado" 
                    stroke="#ef4444" 
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

export default QualityMetrics;
