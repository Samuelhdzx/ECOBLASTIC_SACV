import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const ProductivitySection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Piezas Producidas por Hora" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.hourlyProduction}>
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
          <LineChart data={data.cycleTime}>
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

export default ProductivitySection;
