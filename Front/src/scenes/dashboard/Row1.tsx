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
import { useTheme } from '@mui/material';

// Tooltip personalizado con fondo oscuro y texto claro
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e1e1e',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          color: '#fff',
          border: '1px solid #9A48FD',
        }}
      >
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
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
      <BoxHeader title="Selección Actual" subtitle="Material y Molde" />
      <div style={{ padding: '1rem', fontSize: '1rem', lineHeight: '1.5' }}>
        <p><strong>Material:</strong> {material}</p>
        <p><strong>Molde:</strong> {molde}</p>
      </div>

      {/* Gráficas comparativas */}
      <div style={{ display: 'flex', gap: '1rem', height: '280px', padding: '0 1rem 1rem' }}>
        {/* Uso de Materiales */}
        <ResponsiveContainer width="50%">
          <BarChart data={polymerChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#E5E5E5" />
            <YAxis allowDecimals={false} stroke="#E5E5E5" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" label={{ position: 'top', fill: '#E5E5E5' }}>
              {polymerChartData.map((entry, index) => (
                <Cell key={`cell-polymer-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Uso de Moldes */}
        <ResponsiveContainer width="50%">
          <BarChart data={moldChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#E5E5E5" />
            <YAxis allowDecimals={false} stroke="#E5E5E5" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" label={{ position: 'top', fill: '#E5E5E5' }}>
              {moldChartData.map((entry, index) => (
                <Cell key={`cell-mold-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>
  );
};

export default Row1;
