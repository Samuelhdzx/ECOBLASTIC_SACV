import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';
import { useGetSensorDataQuery } from '@/state/api';

const MachineEfficiencySection = () => {
  const { data: sensorData, isLoading, error } = useGetSensorDataQuery();

  if (isLoading) return <div>Cargando datos...</div>;
  if (error || !sensorData) return <div>Error al cargar los datos</div>;

  const machineData = sensorData.map(record => ({
    hora: new Date(record.timestamp).toLocaleTimeString(),
    tiempoOptimo: record.machine?.optimalTemp || 0,
    tiempoEnfriamiento: record.machine?.coolingTime || 0,
    excesos: record.machine?.tempExcess || 0,
    tiempoEfectivo: record.machine?.effectiveTime || 0,
    tiempoTotal: record.machine?.totalTime || 0
  }));

  return (
    <>
      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Tiempos de Temperatura" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Bar name="Tiempo para Temp. Óptima" dataKey="tiempoOptimo" fill="#4caf50" />
              <Bar name="Tiempo de Enfriamiento" dataKey="tiempoEnfriamiento" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>

      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Excesos de Temperatura" />
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                name="Excesos"
                dataKey="excesos" 
                stroke="#f44336" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>

      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Tiempo Efectivo de Operación" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Bar name="Tiempo Efectivo" dataKey="tiempoEfectivo" fill="#9c27b0" />
              <Bar name="Tiempo Total" dataKey="tiempoTotal" fill="#ff9800" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>
    </>
  );
};

export default MachineEfficiencySection;
