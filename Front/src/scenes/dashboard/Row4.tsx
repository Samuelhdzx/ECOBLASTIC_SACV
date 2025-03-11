// scenes/dashboard/Row4.tsx
import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useGetSensorDataQuery } from '@/state/api';
import { useTheme } from '@mui/material';

const CustomTooltipCurrent = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e1e1e',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          color: '#fff',
          border: '1px solid #FBBF24'

          //ola
        }}
      >
        <p>{`Corriente: ${payload[0].value.toFixed(2)} A`}</p>
      </div>
    );
  }
  return null;
};

const Row4 = () => {
  const { data } = useGetSensorDataQuery(undefined, { pollingInterval: 3000 });
  const { palette } = useTheme();

  // Ejemplo de cálculo: Corriente = (potentiometerEnergy.used + injectorEnergy.used) / 10
  const currentData = data
    ? data.map(record => ({
        ...record,
        current: (record.potentiometerEnergy.used + record.injectorEnergy.used) / 10,
      }))
    : [];

  return (
    <DashboardBox gridArea="f">
      <BoxHeader title="Sensor de Corriente" />
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="_id" hide />
          <YAxis stroke="#E5E5E5" label={{ value: 'A', angle: -90, position: 'insideLeft', fill: '#E5E5E5' }} />
          <Tooltip content={<CustomTooltipCurrent />} />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#FBBF24"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Row4;
