import { Grid } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const CostSection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Costo de Material por Pieza" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.materialCost}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar name="Costo Material" dataKey="value" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>

    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Costo de Desperdicios" />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.wasteCost}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              name="Costo Desperdicios"
              dataKey="value" 
              stroke="#f44336" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>

    <Grid item xs={12}>
      <DashboardBox>
        <BoxHeader title="Costo Total por Pieza" />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.totalCost}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              name="Costo Total"
              dataKey="value" 
              stroke="#ff9800" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>
  </>
);

export default CostSection;
