// index.tsx
import { Box, useMediaQuery, Typography, Button, Grid } from '@mui/material';
import { Link, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import Row4 from './Row4';
import Row5 from './Row5';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer, PieChart, Pie, BarChart, Bar } from 'recharts';
import { useState } from 'react';
import ProductivitySection from '../../components/sections/ProductivitySection';
import QualitySection from '../../components/sections/QualitySection';
import OperatorSection from '../../components/sections/OperatorSection';
import MoldSection from '../../components/sections/MoldSection';
import CostSection from '../../components/sections/CostSection';
import MachineEfficiencySection from '../../components/sections/MachineEfficiencySection';
import { DashboardBox, BoxHeader } from '@/components/DashboardBox';

// Grid layouts
const gridTemplateLargeScreens = `
  "a b c"
  "d e f"
  "g h i"
  "j k l"
  "m n o"
  "p p p"
`;

const gridTemplateSmallScreens = `
  "a"
  "b"
  "c"
  "d"
  "e"
  "f"
  "g"
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [dashboardData, setDashboardData] = useState({
    temperature: [],
    energy: [],
    production: {
      hourly: [],
      byOperator: [],
      byMold: [],
      defects: [],
    },
    quality: {
      defectRate: [],
      materialWaste: [],
      qualityByOperator: [],
      qualityByMold: [],
    },
    operators: {
      responseTime: [
        { operario: 'Juan', tiempo: 45 },
        { operario: 'María', tiempo: 30 },
        // ...más datos
      ],
      productivity: [
        { operario: 'Juan', piezas: 150, defectos: 10 },
        { operario: 'María', piezas: 180, defectos: 8 },
        // ...más datos
      ],
      materialUsage: [
        { operario: 'Juan', usado: 100, desperdicio: 5 },
        { operario: 'María', usado: 120, desperdicio: 3 },
        // ...más datos
      ],
    },
    machine: {
      moldProduction: [
        { molde: 'Molde A', piezas: 200, defectos: 15 },
        { molde: 'Molde B', piezas: 180, defectos: 10 },
        // ...más datos
      ],
      moldErrorRate: [
        { molde: 'Molde A', tasaError: 7.5 },
        { molde: 'Molde B', tasaError: 5.5 },
        // ...más datos
      ],
      moldMaterialUsage: [
        { molde: 'Molde A', usado: 150, desperdicio: 8 },
        { molde: 'Molde B', usado: 130, desperdicio: 6 },
        // ...más datos
      ],
      effectiveTime: [], // Inicializar como array vacío
    },
    machineEfficiency: {
      temperatureTimes: [
        { hora: '08:00', tiempoOptimo: 15, tiempoEnfriamiento: 10 },
        { hora: '09:00', tiempoOptimo: 12, tiempoEnfriamiento: 8 },
      ],
      temperatureExcess: [
        { hora: '08:00', excesos: 2 },
        { hora: '09:00', excesos: 1 },
      ],
      operationTime: [
        { hora: '08:00', tiempoEfectivo: 55, tiempoTotal: 60 },
        { hora: '09:00', tiempoEfectivo: 58, tiempoTotal: 60 },
      ],
    },
    costs: {
      materialCost: [],
      wasteCost: [],
      totalCost: [],
    },
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Simulación de datos en tiempo real
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        temperature: [...prev.temperature, {
          time: new Date().toLocaleTimeString(),
          value: Math.random() * (200 - 150) + 150
        }].slice(-10),
        energy: [...prev.energy, {
          time: new Date().toLocaleTimeString(),
          value: Math.random() * 100
        }].slice(-10),
        production: {
          ...prev.production,
          hourly: [...prev.production.hourly, {
            time: new Date().toLocaleTimeString(),
            value: Math.random() * (1000 - 800) + 800
          }].slice(-10),
        },
        quality: {
          ...prev.quality,
          defectRate: [...prev.quality.defectRate, {
            time: new Date().toLocaleTimeString(),
            value: Math.random() * 10
          }].slice(-10),
        },
        operators: {
          ...prev.operators,
          productivity: [...prev.operators.productivity, {
            time: new Date().toLocaleTimeString(),
            value: Math.random() * 100
          }].slice(-10),
        },
        machine: {
          ...prev.machine,
          effectiveTime: [
            ...prev.machine.effectiveTime,
            {
              time: new Date().toLocaleTimeString(),
              value: Math.random() * 100
            }
          ].slice(-10),
        },
        costs: {
          ...prev.costs,
          totalCost: [...prev.costs.totalCost, {
            time: new Date().toLocaleTimeString(),
            value: Math.random() * 1000
          }].slice(-10),
        },
        machineEfficiency: {
          ...prev.machineEfficiency,
          temperatureTimes: [
            ...prev.machineEfficiency.temperatureTimes,
            { 
              hora: new Date().toLocaleTimeString(),
              tiempoOptimo: Math.random() * (20 - 10) + 10,
              tiempoEnfriamiento: Math.random() * (15 - 5) + 5
            }
          ].slice(-10),
          temperatureExcess: [
            ...prev.machineEfficiency.temperatureExcess,
            {
              hora: new Date().toLocaleTimeString(),
              excesos: Math.floor(Math.random() * 5)
            }
          ].slice(-10),
          operationTime: [
            ...prev.machineEfficiency.operationTime,
            {
              hora: new Date().toLocaleTimeString(),
              tiempoEfectivo: Math.random() * (60 - 45) + 45,
              tiempoTotal: 60
            }
          ].slice(-10)
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        minHeight: '100vh',
        padding: '0', // Eliminar padding exterior
        margin: '0',
        width: '100%',
        overflowX: 'hidden', // Prevenir scroll horizontal
      }}
    >
      <Box
        sx={{
          maxWidth: '100%', // Cambiar de 1800px a 100%
          margin: '0 auto',
          padding: isAboveMediumScreens ? "2rem" : "1rem", // Mover padding aquí
          boxSizing: 'border-box',
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
          sx={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: isAboveMediumScreens ? "repeat(3, 1fr)" : "1fr",
            gridTemplateAreas: isAboveMediumScreens
              ? gridTemplateLargeScreens
              : gridTemplateSmallScreens,
            width: '100%', // Asegurar ancho completo
            marginBottom: '2rem',
          }}
        >
          <Row1 />
          <Row2 />
          <Row3 />
          <Row4 />
          <Row5 />
        </Box>

        <Grid container spacing={3} sx={{ width: '100%', margin: '0', padding: '1rem 0' }}>
          <ProductivitySection data={dashboardData.production} />
          <QualitySection data={dashboardData.quality} />
          <OperatorSection data={dashboardData.operators} />
          <MoldSection data={dashboardData.machine} />
          <CostSection data={dashboardData.costs} />
          <MachineEfficiencySection data={dashboardData.machineEfficiency} />
          
          {/* Temperatura en Tiempo Real */}
          <Grid item xs={12} lg={4}>
            <DashboardBox>
              <BoxHeader title="Temperatura en Tiempo Real" />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.temperature}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3a86ff"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </DashboardBox>
          </Grid>

          {/* Consumo de Energía */}
          <Grid item xs={12} lg={4}>
            <DashboardBox>
              <BoxHeader title="Consumo de Energía" />
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData.energy}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8338ec"
                    fill="url(#energyGradient)"
                  />
                  <defs>
                    <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8338ec" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8338ec" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </DashboardBox>
          </Grid>

          {/* Más gráficos y secciones según sea necesario */}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            component={Link}
            to="/analytics"
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #3a86ff 0%, #8338ec 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)'
              }
            }}
          >
            Ver Análisis Detallado
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;