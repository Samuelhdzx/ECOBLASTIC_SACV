// scenes/dashboard/Row1.tsx
import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetSensorDataQuery } from '@/state/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { Box, Typography, useTheme, Chip } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Tooltip personalizado con fondo oscuro y texto claro
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          color: '#fff',
          border: '1px solid #9A48FD',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          fontSize: '0.875rem',
          maxWidth: '200px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: '600', mb: '0.25rem' }}>
          {payload[0].name}
        </Typography>
        <Typography variant="body2">
          Usos totales: <strong>{payload[0].value}</strong>
        </Typography>
      </Box>
    );
  }
  return null;
};

const Row1 = () => {
  const { data } = useGetSensorDataQuery(undefined, { pollingInterval: 3000 });
  const { palette } = useTheme();

  // Registro más reciente
  const latestRecord = data ? data[data.length - 1] : null;

  let material = 'N/A';
  let molde = 'N/A';
  if (latestRecord) {
    if (latestRecord.polymerUsage.pet === 1) material = 'PET';
    else if (latestRecord.polymerUsage.polypropylene === 1) material = 'Polipropileno';

    if (latestRecord.moldUsage.mold1 === 1) molde = 'Molde 1';
    else if (latestRecord.moldUsage.mold2 === 1) molde = 'Molde 2';
    else if (latestRecord.moldUsage.mold3 === 1) molde = 'Molde 3';
  }

  // Conteo global de usos
  const timesPet = data?.filter(item => item.polymerUsage.pet === 1).length ?? 0;
  const timesPP = data?.filter(item => item.polymerUsage.polypropylene === 1).length ?? 0;
  const timesMold1 = data?.filter(item => item.moldUsage.mold1 === 1).length ?? 0;
  const timesMold2 = data?.filter(item => item.moldUsage.mold2 === 1).length ?? 0;
  const timesMold3 = data?.filter(item => item.moldUsage.mold3 === 1).length ?? 0;

  // Datos para los gráficos
  const polymerChartData = [
    { name: 'PET', value: timesPet },
    { name: 'Polipropileno', value: timesPP },
  ];
  const moldChartData = [
    { name: 'Molde 1', value: timesMold1 },
    { name: 'Molde 2', value: timesMold2 },
    { name: 'Molde 3', value: timesMold3 },
  ];

  const BRAND_COLORS = [palette.primary.main, palette.secondary.main, '#FBBF24'];

  return (
    <DashboardBox gridArea="a">
      <BoxHeader title="Selección Actual" subtitle="Material y Molde en uso" icon={<AssessmentIcon />} />
      
      {/* Tarjetas de selección actual */}
      <Box
        sx={{
          padding: '0.5rem 1rem 1rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: '160px',
            background: 'rgba(58, 134, 255, 0.1)',
            borderRadius: '12px',
            padding: '1rem',
            border: '1px solid rgba(58, 134, 255, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: palette.grey[400], 
              fontSize: '0.8rem',
              mb: '0.25rem'
            }}
          >
            Material Seleccionado
          </Typography>
          <FlexBetween>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: '700', 
                color: palette.primary.main
              }}
            >
              {material}
            </Typography>
            <Chip 
              label="Activo" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(16, 185, 129, 0.2)', 
                color: 'rgb(16, 185, 129)',
                borderRadius: '4px',
                fontSize: '0.7rem',
                height: '20px'
              }} 
            />
          </FlexBetween>
        </Box>
        
        <Box
          sx={{
            flex: 1,
            minWidth: '160px',
            background: 'rgba(131, 56, 236, 0.1)',
            borderRadius: '12px',
            padding: '1rem',
            border: '1px solid rgba(131, 56, 236, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: palette.grey[400], 
              fontSize: '0.8rem',
              mb: '0.25rem'
            }}
          >
            Molde Seleccionado
          </Typography>
          <FlexBetween>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: '700', 
                color: palette.secondary.main
              }}
            >
              {molde}
            </Typography>
            <Chip 
              label="Activo" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(16, 185, 129, 0.2)', 
                color: 'rgb(16, 185, 129)',
                borderRadius: '4px',
                fontSize: '0.7rem',
                height: '20px'
              }} 
            />
          </FlexBetween>
        </Box>
      </Box>

      {/* Gráficas comparativas */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: '1.5rem', 
          height: '280px', 
          padding: '0 1rem 1rem',
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}
      >
        {/* Uso de Materiales */}
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '45%' }, position: 'relative' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: palette.grey[400],
              position: 'absolute',
              top: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.85rem',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            Uso de Polímeros
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={polymerChartData} margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#E5E5E5" />
              <YAxis allowDecimals={false} stroke="#E5E5E5" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Bar dataKey="value" label={{ position: 'top', fill: '#E5E5E5', fontSize: 12 }}>
                {polymerChartData.map((entry, index) => (
                  <Cell key={`cell-polymer-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Uso de Moldes */}
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '45%' }, position: 'relative' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: palette.grey[400],
              position: 'absolute',
              top: '0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.85rem',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            Uso de Moldes
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moldChartData} margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#E5E5E5" />
              <YAxis allowDecimals={false} stroke="#E5E5E5" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Bar dataKey="value" label={{ position: 'top', fill: '#E5E5E5', fontSize: 12 }}>
                {moldChartData.map((entry, index) => (
                  <Cell key={`cell-mold-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </DashboardBox>
  );
};

export default Row1;