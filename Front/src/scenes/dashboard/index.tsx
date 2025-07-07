// index.tsx
import { Box, useMediaQuery, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetActiveMonitoringQuery, useFinalizeMonitoringMutation, useGetSensorDataQuery } from '@/state/api';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Row4 from './Row4';
import QualityControl from '@/components/QualityControl';
import ProcessSummary from '@/components/ProcessSummary';

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
  const location = useLocation();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [showQualityControl, setShowQualityControl] = useState(false);
  const [showProcessSummary, setShowProcessSummary] = useState(false);
  const [currentProcess, setCurrentProcess] = useState<any>(null);
  const [monitoringStartTime, setMonitoringStartTime] = useState<Date | null>(null);

  // Obtener procesos activos
  const { data: sensorData } = useGetSensorDataQuery(undefined);
  const [finalizeMonitoring] = useFinalizeMonitoringMutation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    console.log('Dashboard useEffect - location.state:', location.state);
    console.log('Dashboard useEffect - activeProcesses:', activeProcesses);
    
    // Si hay datos del formulario, establecer el tiempo de inicio
    if (location.state?.monitoringStartTime) {
      setMonitoringStartTime(new Date(location.state.monitoringStartTime));
    }
    
    // Si hay procesos activos, tomar el primero
    if (activeProcesses?.data && activeProcesses.data.length > 0) {
      console.log('Setting current process:', activeProcesses.data[0]);
      setCurrentProcess(activeProcesses.data[0]);
      if (!monitoringStartTime) {
        setMonitoringStartTime(new Date(activeProcesses.data[0].monitoringStartTime));
      }
    } else {
      console.log('No active processes found');
      setCurrentProcess(null);
    }
  }, [activeProcesses, location.state]);

  const handleFinalizeMonitoring = () => {
    setShowQualityControl(true);
  };

  const handleQualityComplete = async (qualityData: any) => {
    if (!currentProcess) return;

    try {
      const result = await finalizeMonitoring({
        id: currentProcess._id,
        qualityData
      }).unwrap();

      setShowQualityControl(false);
      setShowProcessSummary(true);
      setCurrentProcess(result.data);
      
      // Refetch para actualizar la lista de procesos activos
      refetch();
    } catch (error) {
      console.error('Error finalizing monitoring:', error);
      alert('Error al finalizar el monitoreo');
    }
  };

  const handleCloseSummary = () => {
    setShowProcessSummary(false);
    setCurrentProcess(null);
    setMonitoringStartTime(null);
    // Limpiar el estado de navegación
    navigate('/dashboard', { replace: true });
  };

  const calculateMonitoringDuration = () => {
    if (!monitoringStartTime) return 0;
    return Math.round((new Date().getTime() - monitoringStartTime.getTime()) / 1000);
  };

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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {currentProcess && (
              <Button
                variant="contained"
                onClick={handleFinalizeMonitoring}
                sx={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  fontWeight: 600,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                🛑 Finalizar Monitoreo
              </Button>
            )}
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                background: currentProcess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: currentProcess ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(156, 163, 175, 0.2)',
              }}
            >
              <Box 
                sx={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  backgroundColor: currentProcess ? '#10b981' : '#9ca3af',
                  marginRight: '0.5rem',
                  animation: currentProcess ? 'pulse 1.5s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.6 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.6 }
                  }
                }} 
              />
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {currentProcess ? 'Monitoreo Activo' : 'Sin Monitoreo'}
              </Typography>
            </Box>
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

      {/* Modal de Control de Calidad */}
      {showQualityControl && (
        <QualityControl
          onComplete={handleQualityComplete}
          onBack={() => setShowQualityControl(false)}
          monitoringDuration={calculateMonitoringDuration()}
        />
      )}

      {/* Modal de Resumen del Proceso */}
      {showProcessSummary && currentProcess && (
        <ProcessSummary
          processData={currentProcess}
          onClose={handleCloseSummary}
        />
      )}
    </Box>
  );
};

export default Dashboard;