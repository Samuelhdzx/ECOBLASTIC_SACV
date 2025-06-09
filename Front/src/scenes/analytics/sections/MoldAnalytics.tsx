import { Box, Grid } from "@mui/material";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../../../components/DashboardBox';

const MoldAnalytics = () => {
  const mockData = {
    production: [
      { mold: 'Molde A', produced: 500, defects: 25 },
      { mold: 'Molde B', produced: 450, defects: 15 },
      { mold: 'Molde C', produced: 600, defects: 30 },
    ],
    materialUsage: [
      { mold: 'Molde A', used: 100, waste: 5 },
      { mold: 'Molde B', used: 90, waste: 3 },
      { mold: 'Molde C', used: 120, waste: 8 },
    ]
  };

  return (
    <Box>
      <h2>Análisis por Molde</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardBox>
            <BoxHeader title="Producción por Molde" />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.production}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mold" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="produced" fill="#3a86ff" name="Producidas" />
                <Bar dataKey="defects" fill="#ff006e" name="Defectuosas" />
              </BarChart>
            </ResponsiveContainer>
          </DashboardBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MoldAnalytics;
