import { Box, useMediaQuery, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductivityMetrics from '../dashboard/components/ProductivityMetrics';
import QualityMetrics from '../dashboard/components/QualityMetrics';
import OperatorMetrics from '../dashboard/components/OperatorMetrics';
import MoldMetrics from '../dashboard/components/MoldMetrics';
import MachineEfficiency from '../dashboard/components/MachineEfficiency';
import CostMetrics from '../dashboard/components/CostMetrics';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const Analysis = () => {
  const navigate = useNavigate();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #0d1117, #0a0a0a)',
        minHeight: '100vh',
        padding: isAboveMediumScreens ? "2rem" : "1rem",
      }}
    >
      <Box sx={{ maxWidth: '1800px', margin: '0 auto' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
            }}
          >
            Análisis de Producción
          </Typography>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <ArrowBackIcon />
            Volver al Dashboard Principal
          </button>
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
          <ProductivityMetrics gridArea="a" />
          <QualityMetrics gridArea="b" />
          <OperatorMetrics gridArea="c" />
          <MoldMetrics gridArea="d" />
          <MachineEfficiency gridArea="e" />
          <CostMetrics gridArea="f" />
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;
