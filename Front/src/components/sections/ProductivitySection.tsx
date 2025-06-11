import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';
import { useGetSensorDataQuery } from '@/state/api';

const ProductivitySection = () => {
  const { data: sensorData, isLoading, error } = useGetSensorDataQuery();

  console.log('Datos de productividad:', sensorData);

  if (isLoading) return <div>Cargando datos...</div>;
  if (error) {
    console.error('Error en ProductivitySection:', error);
    return <div>Error al cargar los datos</div>;
  }
  if (!sensorData) {
    console.warn('No hay datos disponibles');
    return <div>No hay datos disponibles</div>;
  }

  const hourlyProductionData = sensorData.map(record => ({
    hour: new Date(record.timestamp).getHours(),
    pieces: record.production?.piecesProduced || 0
  }));

  const cycleTimeData = sensorData.map(record => ({
    time: new Date(record.timestamp).toLocaleTimeString(),
    value: record.production?.cycleTime || 0
  }));

  return (
    <>
      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Piezas Producidas por Hora" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyProductionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pieces" fill="#3a86ff" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Tiempo Promedio de Ciclo" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cycleTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8338ec" />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>
    </>
  );
};

export default ProductivitySection;
