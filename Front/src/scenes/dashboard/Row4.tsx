// scenes/dashboard/Row4.tsx
import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  ReferenceArea
} from 'recharts';
import { useGetSensorDataQuery } from '@/state/api';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltipCurrent: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          color: '#fff',
          border: '1px solid #FBBF24',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          fontSize: '0.875rem',
          maxWidth: '200px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: '600', mb: '0.5rem', color: '#FBBF24' }}>
          Corriente
        </Typography>
        <Typography variant="body2">
          Valor: <strong>{payload[0].value.toFixed(2)} A</strong>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', opacity: 0.7, mt: '0.25rem' }}>
          {payload[0].payload.dateFormatted || ''}
        </Typography>
      </Box>
    );
  }
  return null;
};

const Row4 = () => {
  const { data, isLoading } = useGetSensorDataQuery(undefined, { pollingInterval: 3000 });
  const { palette } = useTheme();

  // Regiones de referencia para alertas visuales de corriente
  const normalRange = { start: 0, end: 8, color: 'rgba(16, 185, 129, 0.1)' }; // Verde
  const warningRange = { start: 8, end: 12, color: 'rgba(251, 191, 36, 0.1)' }; // Amarillo
  const alertRange = { start: 12, end: 20, color: 'rgba(239, 68, 68, 0.1)' }; // Rojo

  // Ejemplo de cálculo: Corriente = (potentiometerEnergy.used + injectorEnergy.used) / 10
  const currentData = data
    ? data.map(record => ({
        ...record,
        current: (record.potentiometerEnergy.used + record.injectorEnergy.used) / 10,
        dateFormatted: new Date(record.date).toLocaleString('es-ES', { 
          day: '2-digit', 
          month: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      }))
    : [];

  // Calcular estadísticas de corriente
  const calculateStats = () => {
    if (!currentData || currentData.length === 0) return { avg: 0, min: 0, max: 0 };
    
    const values = currentData.map(item => item.current);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return { avg, min, max };
  };

  const currentStats = calculateStats();
  
  // Determinar estado de corriente para alerta visual
  const getCurrentStatus = (value: number) => {
    if (value >= alertRange.start) return { text: 'Alto', color: '#ef4444' };
    if (value >= warningRange.start) return { text: 'Precaución', color: '#f59e0b' };
    return { text: 'Normal', color: '#10b981' };
  };
  
  const currentStatus = currentData.length > 0 
    ? getCurrentStatus(currentData[currentData.length - 1].current)
    : { text: 'N/A', color: palette.grey[500] };

  return (
    <DashboardBox gridArea="f">
      <BoxHeader 
        title="Sensor de Corriente" 
        subtitle="Monitoreo en amperios" 
        icon={<BoltIcon />} 
        sideText={currentStatus.text}
      />
      
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
          <CircularProgress size={40} sx={{ color: '#FBBF24' }} />
        </Box>
      ) : (
        <>
          <Box sx={{ padding: '0 1rem', display: 'flex', justifyContent: 'space-around', mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'rgba(251, 191, 36, 0.1)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              minWidth: '80px',
            }}>
              <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Min</Typography>
              <Typography variant="h6" sx={{ color: '#FBBF24', fontWeight: 'bold' }}>
                {currentStats.min.toFixed(1)}A
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'rgba(251, 191, 36, 0.15)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              minWidth: '80px',
            }}>
              <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Promedio</Typography>
              <Typography variant="h6" sx={{ color: '#FBBF24', fontWeight: 'bold' }}>
                {currentStats.avg.toFixed(1)}A
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'rgba(251, 191, 36, 0.1)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              minWidth: '80px',
            }}>
              <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Max</Typography>
              <Typography variant="h6" sx={{ color: '#FBBF24', fontWeight: 'bold' }}>
                {currentStats.max.toFixed(1)}A
              </Typography>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height="65%">
            <LineChart data={currentData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="dateFormatted" 
                stroke="#E5E5E5" 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              />
              <YAxis 
                stroke="#E5E5E5" 
                label={{ value: 'A', angle: -90, position: 'insideLeft', fill: '#E5E5E5', fontSize: 12 }} 
                tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                tick={{ fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltipCurrent />} />
              
              {/* Áreas de referencia para mostrar las zonas de alerta */}
              <ReferenceArea y1={normalRange.start} y2={normalRange.end} fill={normalRange.color} fillOpacity={0.5} />
              <ReferenceArea y1={warningRange.start} y2={warningRange.end} fill={warningRange.color} fillOpacity={0.5} />
              <ReferenceArea y1={alertRange.start} y2={alertRange.end} fill={alertRange.color} fillOpacity={0.5} />
              
              <Line
                type="monotone"
                dataKey="current"
                stroke="#FBBF24"
                strokeWidth={2}
                dot={{ r: 2, fill: '#FBBF24' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
              <Legend formatter={() => 'Corriente (A)'} wrapperStyle={{ color: '#E5E5E5', fontSize: '0.85rem' }} />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Leyenda de zonas */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }}></Box>
              <Typography variant="caption" sx={{ color: '#E5E5E5' }}>Normal</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f59e0b' }}></Box>
              <Typography variant="caption" sx={{ color: '#E5E5E5' }}>Precaución</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ef4444' }}></Box>
              <Typography variant="caption" sx={{ color: '#E5E5E5' }}>Alto</Typography>
            </Box>
          </Box>
        </>
      )}
    </DashboardBox>
  );
};

export default Row4;