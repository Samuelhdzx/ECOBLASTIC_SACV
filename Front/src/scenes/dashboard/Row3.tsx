// scenes/dashboard/Row3.tsx
import React from 'react';
import DashboardBox from '@/components/DashboardBox';
import BoxHeader from '@/components/BoxHeader';
import { useGetSensorDataQuery } from '@/state/api';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useTheme } from '@mui/material';

const CustomTooltipTemp = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1e1e1e',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        color: '#fff',
        border: '1px solid #9A48FD'
      }}>
        <p>{`Temperatura: ${payload[0].value} °C`}</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipTime = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1e1e1e',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        color: '#fff',
        border: '1px solid #14B8A6'
      }}>
        <p>{`Tiempo de Inyección: ${payload[0].value} s`}</p>
      </div>
    );
  }
  return null;
};

const Row3 = () => {
  const { data } = useGetSensorDataQuery(undefined, { pollingInterval: 3000 });
  const { palette } = useTheme();

  return (
    <>
      {/* Gráfico de Temperatura */}
      <DashboardBox gridArea="d">
        <BoxHeader title="Temperatura (°C)" />
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="_id" hide />
            <YAxis stroke="#E5E5E5" />
            <Tooltip content={<CustomTooltipTemp />} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke={palette.primary.main}
              strokeWidth={2}
              fill="url(#colorTemp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Gráfico de Tiempo de Inyección */}
      <DashboardBox gridArea="e">
        <BoxHeader title="Tiempo de Inyección (s)" />
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="_id" hide />
            <YAxis stroke="#E5E5E5" />
            <Tooltip content={<CustomTooltipTime />} />
            <Line
              type="monotone"
              dataKey="injectionTime"
              stroke={palette.secondary.main}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row3;
