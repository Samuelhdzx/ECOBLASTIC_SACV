import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const MachineEfficiencySection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Tiempos de Temperatura" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.temperatureTimes}>
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
          <LineChart data={data.temperatureExcess}>
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
          <BarChart data={data.operationTime}>
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

export default MachineEfficiencySection;
