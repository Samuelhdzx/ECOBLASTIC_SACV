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
} from 'recharts';
import { useTheme } from '@mui/material';

const CustomTooltipTemp = ({ active, payload }: any) => {
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
        <p>{`Temperatura: ${payload[0].value} °C`}</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipTime = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1e1e1e',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          color: '#fff',
          border: '1px solid #14B8A6',
        }}
      >
        <p>{`Tiempo de Inyección: ${payload[0].value} s`}</p>
      </div>
    );
  }
  return null;
};

const Row3 = () => {
  const [data, setData] = useState([]);
  const { palette } = useTheme();

  // Obtener datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/sensors');
        console.log('Datos recibidos:', response.data); // Verificar los datos en la consola
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Actualizar cada 3 segundos
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

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
            <XAxis dataKey="timestamp" hide />
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
            <XAxis dataKey="timestamp" hide />
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
