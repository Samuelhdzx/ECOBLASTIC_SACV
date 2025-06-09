import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const MoldSection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Producción por Molde" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.moldProduction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="molde" />
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
        <BoxHeader title="Tasa de Error por Molde" />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.moldErrorRate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="molde" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasaError" stroke="#f44336" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>

    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Consumo de Material por Molde" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.moldMaterialUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="molde" />
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

export default MoldSection;
