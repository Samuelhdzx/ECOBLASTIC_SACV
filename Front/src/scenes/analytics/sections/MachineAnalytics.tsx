import { Box, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../../../components/DashboardBox';

const MachineAnalytics = () => {
  const mockData = {
    temperature: [
      { time: '08:00', value: 180 },
      { time: '09:00', value: 185 },
      { time: '10:00', value: 182 },
    ],
    efficiency: [
      { time: '08:00', value: 95 },
      { time: '09:00', value: 92 },
      { time: '10:00', value: 94 },
    ]
  };

  return (
    <Box>
      <h2>Análisis de Máquina</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardBox>
            <BoxHeader title="Variación de Temperatura" />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.temperature}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3a86ff" />
              </LineChart>
            </ResponsiveContainer>
          </DashboardBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MachineAnalytics;
