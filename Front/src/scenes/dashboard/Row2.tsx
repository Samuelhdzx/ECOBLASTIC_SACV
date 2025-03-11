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
import { useTheme } from '@mui/material';

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e1e1e',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          color: '#fff',
          border: '1px solid #9A48FD'
        }}
      >
        <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
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

  // Colores
  const DONUT_COLORS = [palette.primary.main, palette.secondary.main];

  return (
    <>
      <DashboardBox gridArea="b">
        <BoxHeader title="Energía Potenciómetro" />
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={potData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {potData.map((entry, index) => (
                <Cell key={`cell-pot-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader title="Energía Inyector" />
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={injData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {injData.map((entry, index) => (
                <Cell key={`cell-inj-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
