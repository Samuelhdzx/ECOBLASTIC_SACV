import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { DashboardBox, BoxHeader } from '../../components/DashboardBox';
import ProductivityAnalytics from './sections/ProductivityAnalytics';
import QualityAnalytics from './sections/QualityAnalytics';
import OperatorAnalytics from './sections/OperatorAnalytics';
import MoldAnalytics from './sections/MoldAnalytics';
import MachineAnalytics from './sections/MachineAnalytics';
import CostAnalytics from './sections/CostAnalytics';

const Analytics = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box sx={{ p: 2, background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)', minHeight: '100vh' }}>
      <Tabs 
        value={currentTab} 
        onChange={(_, newValue) => setCurrentTab(newValue)}
        sx={{ mb: 3, '& .MuiTab-root': { color: 'white' } }}
      >
        <Tab label="Productividad" />
        <Tab label="Calidad" />
        <Tab label="Operarios" />
        <Tab label="Moldes" />
        <Tab label="Máquina" />
        <Tab label="Costos" />
      </Tabs>

      <Box sx={{ display: currentTab === 0 ? 'block' : 'none' }}>
        <ProductivityAnalytics />
      </Box>
      <Box sx={{ display: currentTab === 1 ? 'block' : 'none' }}>
        <QualityAnalytics />
      </Box>
      <Box sx={{ display: currentTab === 2 ? 'block' : 'none' }}>
        <OperatorAnalytics />
      </Box>
      <Box sx={{ display: currentTab === 3 ? 'block' : 'none' }}>
        <MoldAnalytics />
      </Box>
      <Box sx={{ display: currentTab === 4 ? 'block' : 'none' }}>
        <MachineAnalytics />
      </Box>
      <Box sx={{ display: currentTab === 5 ? 'block' : 'none' }}>
        <CostAnalytics />
      </Box>
    </Box>
  );
};

export default Analytics;
