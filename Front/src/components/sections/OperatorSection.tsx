import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const OperatorSection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Tiempo de Respuesta por Operario" />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.responseTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operario" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tiempo" stroke="#3a86ff" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>

    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Producción por Operario" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.productivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operario" />
            <YAxis />
            <Tooltip />
            <Bar name="Piezas Producidas" dataKey="piezas" fill="#4caf50" />
            <Bar name="Piezas Defectuosas" dataKey="defectos" fill="#f44336" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>

    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Consumo de Material por Operario" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.materialUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="operario" />
            <YAxis />
            <Tooltip />
            <Bar name="Material Utilizado" dataKey="usado" fill="#2196f3" />
            <Bar name="Material Desperdiciado" dataKey="desperdicio" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>
  </>
);

export default OperatorSection;
