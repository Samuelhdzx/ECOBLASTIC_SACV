import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetOperatorMetricsQuery } from '@/state/api';
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
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const OperatorMetrics = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetOperatorMetricsQuery(undefined, {
    pollingInterval: 3000
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '1rem',
          border: '1px solid #14b8a6',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
          <Typography sx={{ color: '#fff' }}>
            Operario: {label}
          </Typography>
          {payload.map((item: any, index: number) => (
            <Typography key={index} sx={{ color: item.color }}>
              {item.name}: {item.value}
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
        title="Análisis de Operarios"
        subtitle="Rendimiento y productividad"
        icon={<PersonIcon />}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Top Operarios */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            p: 2, 
            overflowX: 'auto'
          }}>
            {data?.topOperators?.map((operator: any) => (
              <Box key={operator.id} sx={{
                bgcolor: 'rgba(20, 184, 166, 0.1)',
                p: 2,
                borderRadius: 2,
                minWidth: '200px',
                textAlign: 'center'
              }}>
                <Avatar sx={{ 
                  width: 56, 
                  height: 56, 
                  margin: '0 auto 1rem',
                  bgcolor: '#14b8a6'
                }}>
                  {operator.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">{operator.name}</Typography>
                <Typography color="textSecondary">
                  {operator.piecesProduced} piezas
                </Typography>
                <Typography color="textSecondary">
                  {operator.efficiency}% eficiencia
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Producción por operario */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={data?.productionByOperator || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="piecesProduced" 
                    name="Piezas Producidas" 
                    fill="#14b8a6" 
                  />
                  <Bar 
                    dataKey="defectivePieces" 
                    name="Piezas Defectuosas" 
                    fill="#ef4444" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Tiempo de respuesta */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={data?.responseTimeHistory || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    name="Tiempo de Respuesta" 
                    stroke="#14b8a6" 
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

export default OperatorMetrics;
