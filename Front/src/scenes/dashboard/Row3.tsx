import React, { useEffect, useState } from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import TimerIcon from '@mui/icons-material/Timer';

// Tipos para los datos de los sensores
interface SensorData {
  id?: number;
  timestamp?: string | number;
  temperature?: number;
  injectionTime?: number;
  dateFormatted?: string;
}

// Tooltip personalizado para Temperatura
const CustomTooltipTemp = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const record = payload[0].payload;
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          color: '#fff',
          border: '1px solid #3a86ff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          fontSize: '0.875rem',
          maxWidth: '200px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: '600', mb: '0.25rem', color: '#3a86ff' }}>
          Temperatura
        </Typography>
        <Typography variant="body2">
          Valor: <strong>{payload[0].value?.toFixed(1) || 'N/A'} °C</strong>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', opacity: 0.7, mt: '0.25rem' }}>
          {record.dateFormatted || 'Fecha no disponible'}
        </Typography>
      </Box>
    );
  }
  return null;
};

// Tooltip personalizado para Tiempo de Inyección
const CustomTooltipTime = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const record = payload[0].payload;
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          color: '#fff',
          border: '1px solid #14B8A6',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          fontSize: '0.875rem',
          maxWidth: '200px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: '600', mb: '0.25rem', color: '#14B8A6' }}>
          Tiempo de Inyección
        </Typography>
        <Typography variant="body2">
          Duración: <strong>{payload[0].value?.toFixed(2) || 'N/A'} s</strong>
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.75rem', opacity: 0.7, mt: '0.25rem' }}>
          {record.dateFormatted || 'Fecha no disponible'}
        </Typography>
      </Box>
    );
  }
  return null;
};

const Row3 = () => {
  const [data, setData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();

  // Calcular estadísticas
  const calculateStats = (dataKey: keyof SensorData) => {
    if (!data || data.length === 0) return { avg: 0, min: 0, max: 0 };
    
    const values = data
      .map(item => item[dataKey])
      .filter((value): value is number => value !== undefined && !isNaN(value));

    if (values.length === 0) return { avg: 0, min: 0, max: 0 };

    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return { avg, min, max };
  };

  // Obtener datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:1337/api/sensors');
        
        // Formatear los datos con fechas legibles y asegurar tipos
        const formattedData = response.data.map((record: any) => ({
          ...record,
          temperature: Number(record.temperature),
          injectionTime: Number(record.injectionTime),
          dateFormatted: record.timestamp 
            ? new Date(record.timestamp).toLocaleString('es-ES', { 
                day: '2-digit', 
                month: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
              }) 
            : 'Fecha no disponible'
        }));

        setData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Actualizar cada 3 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  const tempStats = calculateStats('temperature');
  const timeStats = calculateStats('injectionTime');

  // Renderizado condicional si no hay datos
  if (isLoading) {
    return (
      <>
        {['d', 'e'].map(area => (
          <DashboardBox key={area} gridArea={area} sx={{ minHeight: '350px' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%' 
              }}
            >
              <CircularProgress />
            </Box>
          </DashboardBox>
        ))}
      </>
    );
  }

  // Si no hay datos después de cargar
  if (data.length === 0) {
    return (
      <>
        {['d', 'e'].map(area => (
          <DashboardBox key={area} gridArea={area} sx={{ minHeight: '350px' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%' 
              }}
            >
              <Typography variant="body1" color="error">
                No hay datos disponibles
              </Typography>
            </Box>
          </DashboardBox>
        ))}
      </>
    );
  }

  return (
    <>
      {/* Gráfico de Temperatura */}
      <DashboardBox gridArea="d" sx={{ minHeight: '350px' }}>
        <BoxHeader 
          title="Temperatura (°C)" 
          subtitle="Monitoreo en tiempo real" 
          icon={<DeviceThermostatIcon />}
          sideText={`Prom: ${tempStats.avg.toFixed(1)}°C`}
        />
        <Box sx={{ padding: '0 1rem', display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'rgba(58, 134, 255, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            minWidth: '80px',
          }}>
            <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Min</Typography>
            <Typography variant="h6" sx={{ color: palette.primary.main, fontWeight: 'bold' }}>
              {tempStats.min.toFixed(1)}°C
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'rgba(58, 134, 255, 0.15)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            minWidth: '80px',
          }}>
            <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Max</Typography>
            <Typography variant="h6" sx={{ color: palette.primary.main, fontWeight: 'bold' }}>
              {tempStats.max.toFixed(1)}°C
            </Typography>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height="65%" minHeight={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="dateFormatted" 
              stroke="#E5E5E5" 
              tick={{ fontSize: 10 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis 
              stroke="#E5E5E5" 
              label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#E5E5E5', fontSize: 12 }} 
              tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltipTemp />} />
            <ReferenceLine y={tempStats.avg} label="Promedio" stroke="#ff006e" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke={palette.primary.main}
              strokeWidth={2}
              fill="url(#colorTemp)"
              dot={{ r: 2, fill: palette.primary.main }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Legend formatter={() => 'Temperatura'} wrapperStyle={{ color: '#E5E5E5', fontSize: '0.85rem' }} />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Gráfico de Tiempo de Inyección */}
      <DashboardBox gridArea="e" sx={{ minHeight: '350px' }}>
        <BoxHeader 
          title="Tiempo de Inyección (s)" 
          subtitle="Monitoreo en tiempo real" 
          icon={<TimerIcon />}
          sideText={`Prom: ${timeStats.avg.toFixed(2)}s`}
        />
        <Box sx={{ padding: '0 1rem', display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'rgba(20, 184, 166, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            minWidth: '80px',
          }}>
            <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Min</Typography>
            <Typography variant="h6" sx={{ color: palette.secondary.main, fontWeight: 'bold' }}>
              {timeStats.min.toFixed(2)}s
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'rgba(20, 184, 166, 0.15)',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            minWidth: '80px',
          }}>
            <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: '0.7rem' }}>Max</Typography>
            <Typography variant="h6" sx={{ color: palette.secondary.main, fontWeight: 'bold' }}>
              {timeStats.max.toFixed(2)}s
            </Typography>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height="65%" minHeight={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="dateFormatted" 
              stroke="#E5E5E5" 
              tick={{ fontSize: 10 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
            />
            <YAxis 
              stroke="#E5E5E5" 
              label={{ value: 'seg', angle: -90, position: 'insideLeft', fill: '#E5E5E5', fontSize: 12 }} 
              tickLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltipTime />} />
            <ReferenceLine y={timeStats.avg} label="Promedio" stroke="#ff006e" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="injectionTime"
              stroke={palette.secondary.main}
              strokeWidth={2}
              dot={{ r: 2, fill: palette.secondary.main }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Legend formatter={() => 'Tiempo de Inyección'} wrapperStyle={{ color: '#E5E5E5', fontSize: '0.85rem' }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row3;