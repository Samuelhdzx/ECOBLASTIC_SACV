// scenes/dashboard/Row2.tsx
import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetSensorDataQuery } from '@/state/api';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

// Tooltip personalizado
const CustomTooltip = ({ active, payload, colors }: any) => {
  if (active && payload && payload.length) {
    const color = colors?.[payload[0].name.toLowerCase()] || '#3a86ff';
    return (
      <Box
        sx={{
          background: 'rgba(30, 30, 30, 0.95)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          color: '#fff',
          border: `1px solid ${color}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          fontSize: '0.875rem',
          maxWidth: '200px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: '600', mb: '0.25rem', color }}>
          {payload[0].name}
        </Typography>
        <Typography variant="body2">
          Energía: <strong>{payload[0].value}%</strong>
        </Typography>
      </Box>
    );
  }
  return null;
};

// Componente de etiqueta personalizada
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, fill }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill={fill || '#fff'} 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ 
        fontWeight: 500, 
        fontSize: '0.75rem', 
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' 
      }}
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Row2 = () => {
  const { palette } = useTheme();
  const { data } = useGetSensorDataQuery(undefined, { pollingInterval: 3000 });
  const latest = data ? data[data.length - 1] : null;

  // Datos para el potenciómetro
  const potData = latest
    ? [
        { name: 'Usada', value: latest.potentiometerEnergy.used },
        { name: 'Restante', value: latest.potentiometerEnergy.remaining }
      ]
    : [];

  // Datos para el inyector
  const injData = latest
    ? [
        { name: 'Usada', value: latest.injectorEnergy.used },
        { name: 'Restante', value: latest.injectorEnergy.remaining }
      ]
    : [];

  // Colores y configuración
  const DONUT_COLORS = {
    usada: '#ff006e',
    restante: '#3a86ff',
  };

  // Contenido del centro del donut
  const CenterText = ({ value, label, icon }: any) => (
    <foreignObject x={-50} y={-50} width={100} height={100}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: '#fff',
            marginTop: '0.25rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          {value}%
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: '0.7rem', 
            color: palette.grey[400],
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {label}
        </Typography>
      </Box>
    </foreignObject>
  );

  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader 
          title="Energía Potenciómetro" 
          subtitle="Nivel de uso actual"
          icon={<BatteryChargingFullIcon />}
        />
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={potData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              labelLine={false}
              label={(props) => <CustomLabel {...props} fill="#fff" />}
              startAngle={90}
              endAngle={-270}
            >
              {potData.map((entry, index) => (
                <Cell 
                  key={`cell-pot-${index}`} 
                  fill={DONUT_COLORS[entry.name.toLowerCase() as keyof typeof DONUT_COLORS]} 
                />
              ))}
              {potData.length > 0 && (
                <CenterText 
                  value={potData[0].value} 
                  label="Usado" 
                  icon={<BatteryChargingFullIcon sx={{ color: DONUT_COLORS.usada, fontSize: '1.5rem' }} />} 
                />
              )}
            </Pie>
            <Tooltip content={(props) => <CustomTooltip {...props} colors={DONUT_COLORS} />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value, entry, index) => (
                <span style={{ color: '#E5E5E5', fontSize: '0.85rem' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader 
          title="Energía Inyector" 
          subtitle="Nivel de uso actual" 
          icon={<ElectricBoltIcon />}
        />
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={injData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              labelLine={false}
              label={(props) => <CustomLabel {...props} fill="#fff" />}
              startAngle={90}
              endAngle={-270}
            >
              {injData.map((entry, index) => (
                <Cell 
                  key={`cell-inj-${index}`} 
                  fill={DONUT_COLORS[entry.name.toLowerCase() as keyof typeof DONUT_COLORS]} 
                />
              ))}
              {injData.length > 0 && (
                <CenterText 
                  value={injData[0].value} 
                  label="Usado" 
                  icon={<ElectricBoltIcon sx={{ color: DONUT_COLORS.usada, fontSize: '1.5rem' }} />} 
                />
              )}
            </Pie>
            <Tooltip content={(props) => <CustomTooltip {...props} colors={DONUT_COLORS} />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value, entry, index) => (
                <span style={{ color: '#E5E5E5', fontSize: '0.85rem' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;