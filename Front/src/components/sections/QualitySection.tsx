import { Grid } from '@mui/material';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';

const QualitySection = ({ data }) => (
  <>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Porcentaje de Defectos" />
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Piezas Correctas', value: 100 - data.defectRate },
                { name: 'Piezas Defectuosas', value: data.defectRate }
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>
    <Grid item xs={12} md={6}>
      <DashboardBox>
        <BoxHeader title="Consumo de Material" />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.materialConsumption}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="used" fill="#3a86ff" name="Utilizado" />
            <Bar dataKey="waste" fill="#ff006e" name="Desperdiciado" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </Grid>
  </>
);

export default QualitySection;
