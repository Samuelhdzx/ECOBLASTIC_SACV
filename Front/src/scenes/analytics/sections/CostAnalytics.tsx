import { Box, Grid } from "@mui/material";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../../../components/DashboardBox';

const CostAnalytics = () => {
  const mockData = {
    costs: [
      { month: 'Ene', material: 5000, waste: 500, total: 5500 },
      { month: 'Feb', material: 4800, waste: 450, total: 5250 },
      { month: 'Mar', material: 5200, waste: 480, total: 5680 },
    ],
    trend: [
      { month: 'Ene', costPerPiece: 2.5 },
      { month: 'Feb', costPerPiece: 2.3 },
      { month: 'Mar', costPerPiece: 2.2 },
    ]
  };

  return (
    <Box>
      <h2>Análisis de Costos</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardBox>
            <BoxHeader title="Costos por Categoría" />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.costs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="material" fill="#3a86ff" name="Material" />
                <Bar dataKey="waste" fill="#ff006e" name="Desperdicio" />
              </BarChart>
            </ResponsiveContainer>
          </DashboardBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CostAnalytics;
