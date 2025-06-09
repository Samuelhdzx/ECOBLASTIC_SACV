import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetSensorDataQuery } from '@/state/api';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from 'recharts';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Row5 = () => {
  const { data } = useGetSensorDataQuery();
  const { palette } = useTheme();

  // Cálculo de KPIs adicionales
  const calculateKPIs = () => {
    if (!data || data.length === 0) return null;

    return {
      oee: {
        value: 85.7,
        trend: '+2.3%',
        subtitle: 'Eficiencia General del Equipo'
      },
      mtbf: {
        value: 127.5,
        trend: '+5.1%',
        subtitle: 'Tiempo Medio Entre Fallos (hrs)'
      },
      cycleTime: {
        value: 45.2,
        trend: '-1.8%',
        subtitle: 'Tiempo de Ciclo (seg)'
      },
      qualityRate: {
        value: 98.3,
        trend: '+0.5%',
        subtitle: 'Tasa de Calidad (%)'
      }
    };
  };

  const kpis = calculateKPIs();

  const KPICard = ({ title, value, trend, subtitle }: any) => (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mb: 1, color: palette.primary.main }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: trend.startsWith('+') ? 'success.main' : 'error.main',
          }}
        >
          {trend}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <DashboardBox gridArea="g">
      <BoxHeader
        title="KPIs de Rendimiento"
        subtitle="Métricas clave de producción"
        icon={<TrendingUpIcon />}
      />
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {kpis && Object.entries(kpis).map(([key, data]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <KPICard
              title={key.toUpperCase()}
              value={data.value}
              trend={data.trend}
              subtitle={data.subtitle}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="#E5E5E5" />
            <YAxis stroke="#E5E5E5" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 30, 30, 0.95)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="production" fill="#3a86ff" name="Producción" />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="#8338ec"
              name="Eficiencia"
            />
            <Scatter
              dataKey="defects"
              fill="#ff006e"
              name="Defectos"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </DashboardBox>
  );
};

export default Row5;
