// scenes/dashboard/Row1.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardBox from '@/components/DashboardBox';

const Row1 = ({ gridArea }: { gridArea: string }) => {
  return (
    <DashboardBox gridArea={gridArea}>
      <Box p={2}>
        <Typography variant="h6">Test Row 1</Typography>
        <Typography>Si puedes ver esto, el componente está funcionando</Typography>
      </Box>
    </DashboardBox>
  );
};

export default Row1;