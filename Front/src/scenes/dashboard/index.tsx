// index.tsx
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row1 from './Row1';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard mounting...");
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh',
        p: 2,
        backgroundColor: theme => theme.palette.background.default,
        display: 'grid',
        gap: 2
      }}
    >
      {/* Solo renderizamos Row1 primero para probar */}
      <Box sx={{ gridArea: 'a' }}>
        <Row1 gridArea="a" />
      </Box>
    </Box>
  );
};

export default Dashboard;