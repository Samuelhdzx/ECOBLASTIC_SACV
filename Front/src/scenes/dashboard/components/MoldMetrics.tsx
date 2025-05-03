import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetMoldMetricsQuery } from '@/state/api';
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
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const MoldMetrics = ({ gridArea }: { gridArea: string }) => {
  const { data, isLoading } = useGetMoldMetricsQuery(undefined, {
    pollingInterval: 3000
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '1rem',
          border: '1px solid #818cf8',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
          <Typography sx={{ color: '#fff', mb: 1 }}>
            {`Molde: ${label}`}
          </Typography>
          {payload.map((item: any, index: number) => (
            <Typography key={index} sx={{ color: item.color }}>
              {`${item.name}: ${item.value}`}
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
        title="Análisis de Moldes"
        subtitle="Rendimiento y eficiencia"
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
            {data?.moldStats.map((mold: any) => (
              <Box key={mold.id} sx={{
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                p: 2,
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ color: '#818cf8' }}>
                  {mold.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Eficiencia: {mold.efficiency}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Piezas: {mold.totalPieces}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Gráficos */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2, p: 2 }}>
            {/* Producción por molde */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <BarChart data={data?.productionByMold || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="goodPieces" 
                    name="Piezas Buenas" 
                    fill="#818cf8" 
                    stackId="a"
                  />
                  <Bar 
                    dataKey="defectivePieces" 
                    name="Piezas Defectuosas" 
                    fill="#ef4444" 
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Eficiencia por molde */}
            <Box sx={{ flex: 1, height: '300px' }}>
              <ResponsiveContainer>
                <LineChart data={data?.efficiencyHistory || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    name="Eficiencia" 
                    stroke="#818cf8" 
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

export default MoldMetrics;
