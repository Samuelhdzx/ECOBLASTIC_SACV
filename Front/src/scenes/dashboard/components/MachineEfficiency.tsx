import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetMachineEfficiencyQuery } from '@/state/api';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const MachineEfficiency = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetMachineEfficiencyQuery(undefined, {
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
              {`${item.name}: ${item.value}${item.unit || ''}`}
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
        title="Eficiencia de Máquina"
        subtitle="Análisis de temperatura y tiempos"
        icon={<PrecisionManufacturingIcon />}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Stats Cards */}
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
              <Typography variant="body2" color="text.secondary">
                Tiempo Operativo
              </Typography>
              <Typography variant="h6" sx={{ color: '#06d6a0' }}>
                {data?.effectiveOperationTime || 0}h
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(239, 71, 111, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                Excesos Temperatura
              </Typography>
              <Typography variant="h6" sx={{ color: '#ef476f' }}>
                {data?.temperatureExceededCount || 0}
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: 'rgba(251, 191, 36, 0.1)',
              p: 2,
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                Tiempo Fuera Rango
              </Typography>
              <Typography variant="h6" sx={{ color: '#fbbf24' }}>
                {data?.temperatureExceededTime || 0}min
              </Typography>
            </Box>
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Variabilidad de temperatura */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={data?.temperatureVariability || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine y={data?.optimalTemperature} stroke="#06d6a0" label="Óptima" />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ef476f" 
                    name="Temperatura" 
                    unit="°C"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Tiempos de enfriamiento */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={data?.coolingTimes || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="time" 
                    fill="#3a86ff" 
                    name="T. Enfriamiento" 
                    unit="min"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      )}
    </DashboardBox>
  );
};

export default MachineEfficiency;
