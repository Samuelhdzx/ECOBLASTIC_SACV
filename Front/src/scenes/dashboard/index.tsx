// index.tsx
import { Box, useMediaQuery, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Row4 from './Row4';

// Grid layouts
const gridTemplateLargeScreens = `
  "a b c"
  "d e f"
`;

const gridTemplateSmallScreens = `
  "a"
  "b"
  "c"
  "d"
  "e"
  "f"
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #0d1117, #0a0a0a)',
        minHeight: '100vh',
        padding: isAboveMediumScreens ? "2rem" : "1rem",
      }}
    >
      <Box
        sx={{
          maxWidth: '1800px',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            }}
          >
            Panel de Control Inteligente
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <Box 
              sx={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: '#10b981',
                marginRight: '0.5rem',
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.6 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.6 }
                }
              }} 
            />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Monitoreo Activo
            </Typography>
          </Box>
        </Box>

        <Box
          width="100%"
          
          display="grid"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: isAboveMediumScreens ? "repeat(3, 1fr)" : "1fr",
            gridTemplateRows: "auto",
            gridTemplateAreas: isAboveMediumScreens
              ? gridTemplateLargeScreens
              : gridTemplateSmallScreens,
          }}
        >
          <Row1 />
          <Row2 />
          <Row3 />
          <Row4 />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;