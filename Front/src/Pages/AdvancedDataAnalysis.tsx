import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Tooltip,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Info,
  Assessment,
  Speed,
  CheckCircle,
  Person,
  Build,
  AttachMoney,
  Thermostat
} from '@mui/icons-material';
import { useGetAllSensorDataForAnalysisQuery } from '@/state/api';
import './AdvancedDataAnalysis.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import ReportExamplesModal from '../components/ReportExamplesModal';

const AdvancedDataAnalysis: React.FC = () => {
  console.log('AdvancedDataAnalysis component rendering...');
  
  const { data: sensorData, isLoading, error } = useGetAllSensorDataForAnalysisQuery(undefined);
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [showConclusions, setShowConclusions] = useState<{[key: string]: boolean}>({});
  const [showReportExamples, setShowReportExamples] = useState(false);

  console.log('Sensor data:', sensorData);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  // Función para alternar conclusiones
  const toggleConclusion = (section: string) => {
    setShowConclusions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Función para calcular estadísticas
  const calculateStats = () => {
    console.log('Calculating stats with data:', sensorData);
    
    if (!sensorData?.data) {
      console.log('No sensor data available');
      return null;
    }

    const data = sensorData.data;
    console.log('Processing data array:', data);
    
    try {
      // 1. Productividad de la empresa
      const totalPieces = data.length;
      const totalDefective = data.filter((item: any) => item.qualityStatus === 'defectuoso').length;
      const totalExcellent = data.filter((item: any) => item.qualityStatus === 'excelente').length;
      const totalGood = data.filter((item: any) => item.qualityStatus === 'bueno').length;
      const totalRegular = data.filter((item: any) => item.qualityStatus === 'regular').length;
      
      const avgCycleTime = data.reduce((sum: number, item: any) => sum + (item.cycleTime || 0), 0) / data.length;
      const avgMonitoringTime = data.reduce((sum: number, item: any) => sum + (item.monitoringDuration || 0), 0) / data.length;

      // 2. Análisis por material
      const petUsage = data.filter((item: any) => item.polymerUsage?.pet === 1).length;
      const polypropyleneUsage = data.filter((item: any) => item.polymerUsage?.polypropylene === 1).length;

      // 3. Análisis por molde
      const mold1Usage = data.filter((item: any) => item.moldUsage?.mold1 === 1).length;
      const mold2Usage = data.filter((item: any) => item.moldUsage?.mold2 === 1).length;
      const mold3Usage = data.filter((item: any) => item.moldUsage?.mold3 === 1).length;

      // 4. Análisis por operador
      const operatorStats = data.reduce((acc: any, item: any) => {
        const operator = item.operatorName || 'Sin operador';
        if (!acc[operator]) {
          acc[operator] = {
            total: 0,
            defective: 0,
            excellent: 0,
            avgCycleTime: 0,
            totalCycleTime: 0
          };
        }
        acc[operator].total++;
        acc[operator].totalCycleTime += item.cycleTime || 0;
        if (item.qualityStatus === 'defectuoso') acc[operator].defective++;
        if (item.qualityStatus === 'excelente') acc[operator].excellent++;
        return acc;
      }, {} as any);

      // Calcular promedios por operador
      Object.keys(operatorStats).forEach(operator => {
        operatorStats[operator].avgCycleTime = operatorStats[operator].totalCycleTime / operatorStats[operator].total;
        operatorStats[operator].efficiency = ((operatorStats[operator].total - operatorStats[operator].defective) / operatorStats[operator].total) * 100;
      });

      // 5. Análisis de temperatura
      const avgTemperature = data.reduce((sum: number, item: any) => sum + (item.temperature || 0), 0) / data.length;
      const tempVariations = data.map((item: any) => ({
        date: new Date(item.date).toLocaleDateString(),
        temperature: item.temperature || 0
      }));

      // 6. Análisis de energía
      const avgPotentiometerEnergy = data.reduce((sum: number, item: any) => sum + (item.potentiometerEnergy?.used || 0), 0) / data.length;
      const avgInjectorEnergy = data.reduce((sum: number, item: any) => sum + (item.injectorEnergy?.used || 0), 0) / data.length;

      // 7. Análisis de campos avanzados
      const totalMaterialUsado = data.reduce((sum: number, item: any) => sum + (item.materialUsado || 0), 0);
      const totalMaterialDesperdiciado = data.reduce((sum: number, item: any) => sum + (item.materialDesperdiciado || 0), 0);
      const totalCostoMaterialUsado = data.reduce((sum: number, item: any) => sum + (item.costoMaterialUsado || 0), 0);
      const totalCostoMaterialDesperdiciado = data.reduce((sum: number, item: any) => sum + (item.costoMaterialDesperdiciado || 0), 0);
      const avgTiempoEnfriamiento = data.reduce((sum: number, item: any) => sum + (item.tiempoEnfriamiento || 0), 0) / data.length;
      const avgTiempoOperacionEfectiva = data.reduce((sum: number, item: any) => sum + (item.tiempoOperacionEfectiva || 0), 0) / data.length;
      const totalAlertasTemperatura = data.reduce((sum: number, item: any) => sum + (item.numeroAlertasTemperatura || 0), 0);
      const avgTiempoRespuestaAlertas = data.reduce((sum: number, item: any) => sum + (item.tiempoRespuestaAlertas || 0), 0) / data.length;
      const avgCostoTotalPorPieza = data.reduce((sum: number, item: any) => sum + (item.costoTotalPorPieza || 0), 0) / data.length;

      const stats = {
        totalPieces,
        totalDefective,
        totalExcellent,
        totalGood,
        totalRegular,
        avgCycleTime,
        avgMonitoringTime,
        petUsage,
        polypropyleneUsage,
        mold1Usage,
        mold2Usage,
        mold3Usage,
        operatorStats,
        avgTemperature,
        tempVariations,
        avgPotentiometerEnergy,
        avgInjectorEnergy,
        totalMaterialUsado,
        totalMaterialDesperdiciado,
        totalCostoMaterialUsado,
        totalCostoMaterialDesperdiciado,
        avgTiempoEnfriamiento,
        avgTiempoOperacionEfectiva,
        totalAlertasTemperatura,
        avgTiempoRespuestaAlertas,
        avgCostoTotalPorPieza,
        defectRate: (totalDefective / totalPieces) * 100,
        qualityRate: ((totalExcellent + totalGood) / totalPieces) * 100
      };

      console.log('Calculated stats:', stats);
      return stats;
    } catch (error) {
      console.error('Error calculating stats:', error);
      return null;
    }
  };

  const stats = calculateStats();

  if (isLoading) {
    console.log('Showing loading state');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    console.log('Showing error state:', error);
    return (
      <Box p={3}>
        <Alert severity="error">
          Error al cargar los datos de análisis: {JSON.stringify(error)}
        </Alert>
      </Box>
    );
  }

  if (!stats) {
    console.log('Showing no data state');
    return (
      <Box p={3}>
        <Alert severity="info">
          No hay datos disponibles para el análisis
        </Alert>
      </Box>
    );
  }

  console.log('Rendering main component with stats:', stats);

  // Paleta de colores
  const COLORS = ['#a78bfa', '#6366f1', '#7c3aed', '#312e81', '#818cf8', '#c7d2fe', '#f472b6', '#facc15'];

  // Funciones para exportar (puedes implementar la lógica real o dejar como placeholder)
  const handleExportPDF = () => {
    alert('Funcionalidad de exportación a PDF próximamente.');
  };
  const handleExportExcel = () => {
    alert('Funcionalidad de exportación a Excel próximamente.');
  };
  const handleShowReportExamples = () => {
    setShowReportExamples(true);
  };
  const handleCloseReportExamples = () => {
    setShowReportExamples(false);
  };

  return (
    <Box className="advanced-analysis-container">
      {/* Header */}
      <Box className="analysis-header">
        <Typography variant="h4" className="analysis-title">
          📊 Análisis de Datos Avanzado
        </Typography>
        <Typography variant="subtitle1" className="analysis-subtitle">
          KPIs y Métricas de Productividad - ECOBLASTIC_DEF
        </Typography>
      </Box>

      {/* KPIs Principales */}
      <Grid container spacing={3} className="kpi-grid">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Total Piezas
                  </Typography>
                  <Typography variant="h4" className="kpi-value">
                    {stats.totalPieces}
                  </Typography>
                </Box>
                <Assessment className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Tasa de Defectos
                  </Typography>
                  <Typography variant="h4" className="kpi-value">
                    {stats.defectRate.toFixed(1)}%
                  </Typography>
                </Box>
                <CheckCircle className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Tiempo Promedio
                  </Typography>
                  <Typography variant="h4" className="kpi-value">
                    {(stats.avgMonitoringTime / 60).toFixed(1)} min
                  </Typography>
                </Box>
                <Speed className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Temperatura Prom.
                  </Typography>
                  <Typography variant="h4" className="kpi-value">
                    {stats.avgTemperature.toFixed(1)}°C
                  </Typography>
                </Box>
                <Thermostat className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* KPIs Avanzados */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Material Usado</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.totalMaterialUsado.toFixed(2)} kg</Typography>
                </Box>
                <Build className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Material Desperdiciado</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.totalMaterialDesperdiciado.toFixed(2)} kg</Typography>
                </Box>
                <TrendingDown className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Costo Material Usado</Typography>
                  <Typography variant="h4" className="kpi-value">${stats.totalCostoMaterialUsado.toFixed(2)}</Typography>
                </Box>
                <AttachMoney className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Costo Desperdicio</Typography>
                  <Typography variant="h4" className="kpi-value">${stats.totalCostoMaterialDesperdiciado.toFixed(2)}</Typography>
                </Box>
                <TrendingDown className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Costo Prom. por Pieza</Typography>
                  <Typography variant="h4" className="kpi-value">${stats.avgCostoTotalPorPieza.toFixed(2)}</Typography>
                </Box>
                <AttachMoney className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Tiempo Enfriamiento Prom.</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.avgTiempoEnfriamiento.toFixed(1)} s</Typography>
                </Box>
                <Speed className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Tiempo Operación Efectiva</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.avgTiempoOperacionEfectiva.toFixed(1)} min</Typography>
                </Box>
                <Speed className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Alertas Temperatura</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.totalAlertasTemperatura}</Typography>
                </Box>
                <Info className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="kpi-card">
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" color="textSecondary">Tiempo Resp. Alertas</Typography>
                  <Typography variant="h4" className="kpi-value">{stats.avgTiempoRespuestaAlertas.toFixed(1)} s</Typography>
                </Box>
                <Info className="kpi-icon" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos Profesionales */}
      <Grid container spacing={3} className="charts-grid">
        {/* 1. Barras apiladas: Defectos vs Buenas por Operador */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Producción y Defectos por Operador</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(stats.operatorStats).map(([name, d]: [string, any]) => ({
                  name,
                  Buenas: d.total - d.defective,
                  Defectuosas: d.defective
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="Buenas" stackId="a" fill="#6366f1" />
                  <Bar dataKey="Defectuosas" stackId="a" fill="#f472b6" />
                </BarChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El operador con mayor eficiencia es {Object.entries(stats.operatorStats).reduce((best, [name, d]: [string, any]) => d.efficiency > best.efficiency ? { name, efficiency: d.efficiency } : best, { name: '', efficiency: 0 }).name}.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Barras apiladas: Defectos vs Buenas por Molde */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Producción y Defectos por Molde</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Molde 1', Buenas: stats.mold1Usage - (stats.totalDefective/3), Defectuosas: stats.totalDefective/3 },
                  { name: 'Molde 2', Buenas: stats.mold2Usage - (stats.totalDefective/3), Defectuosas: stats.totalDefective/3 },
                  { name: 'Molde 3', Buenas: stats.mold3Usage - (stats.totalDefective/3), Defectuosas: stats.totalDefective/3 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="Buenas" stackId="a" fill="#7c3aed" />
                  <Bar dataKey="Defectuosas" stackId="a" fill="#f472b6" />
                </BarChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El molde más utilizado es {['Molde 1', 'Molde 2', 'Molde 3'][[stats.mold1Usage, stats.mold2Usage, stats.mold3Usage].indexOf(Math.max(stats.mold1Usage, stats.mold2Usage, stats.mold3Usage))]}.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Líneas múltiples: Tendencia de Temperatura y Energía */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Tendencia de Temperatura y Energía</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.tempVariations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="date" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#a78bfa" strokeWidth={2} name="Temperatura" />
                </LineChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> La temperatura promedio es de {stats.avgTemperature.toFixed(1)}°C.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 4. Radar: Eficiencia de Operadores */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Eficiencia de Operadores</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={Object.entries(stats.operatorStats).map(([name, d]: [string, any]) => ({ name, Eficiencia: d.efficiency }))}>
                  <PolarGrid stroke="#312e81" />
                  <PolarAngleAxis dataKey="name" stroke="#c7d2fe" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#c7d2fe" />
                  <Radar name="Eficiencia" dataKey="Eficiencia" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El operador más eficiente es {Object.entries(stats.operatorStats).reduce((best, [name, d]: [string, any]) => d.efficiency > best.efficiency ? { name, efficiency: d.efficiency } : best, { name: '', efficiency: 0 }).name}.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 5. Pie/Donut: Distribución de Materiales */}
        <Grid item xs={12} md={4}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Distribución de Materiales</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={[
                    { name: 'PET', value: stats.petUsage },
                    { name: 'Polipropileno', value: stats.polypropyleneUsage }
                  ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#a78bfa" label>
                    <Cell key="PET" fill="#a78bfa" />
                    <Cell key="PP" fill="#6366f1" />
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> PET representa el {(stats.petUsage / stats.totalPieces * 100).toFixed(1)}% del uso total.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 6. Pie/Donut: Distribución de Calidad */}
        <Grid item xs={12} md={4}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Distribución de Calidad</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={[
                    { name: 'Excelente', value: stats.totalExcellent },
                    { name: 'Bueno', value: stats.totalGood },
                    { name: 'Regular', value: stats.totalRegular },
                    { name: 'Defectuoso', value: stats.totalDefective }
                  ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    <Cell key="Excelente" fill="#6366f1" />
                    <Cell key="Bueno" fill="#a78bfa" />
                    <Cell key="Regular" fill="#818cf8" />
                    <Cell key="Defectuoso" fill="#f472b6" />
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> La calidad excelente representa el {(stats.totalExcellent / stats.totalPieces * 100).toFixed(1)}% del total.
              </Alert>
            </CardContent>
          </Card>
        </Grid>

        {/* 7. Pie/Donut: Distribución de Moldes */}
        <Grid item xs={12} md={4}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Distribución de Moldes</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={[
                    { name: 'Molde 1', value: stats.mold1Usage },
                    { name: 'Molde 2', value: stats.mold2Usage },
                    { name: 'Molde 3', value: stats.mold3Usage }
                  ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    <Cell key="Molde 1" fill="#7c3aed" />
                    <Cell key="Molde 2" fill="#6366f1" />
                    <Cell key="Molde 3" fill="#a78bfa" />
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El molde más utilizado es {['Molde 1', 'Molde 2', 'Molde 3'][[stats.mold1Usage, stats.mold2Usage, stats.mold3Usage].indexOf(Math.max(stats.mold1Usage, stats.mold2Usage, stats.mold3Usage))]}.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficos avanzados de campos nuevos */}
      <Grid container spacing={3} className="charts-grid">
        {/* Gráfico de barras: Material usado vs desperdiciado */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Material Usado vs Desperdiciado</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Usado', kg: stats.totalMaterialUsado },
                  { name: 'Desperdiciado', kg: stats.totalMaterialDesperdiciado }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Bar dataKey="kg" fill="#a78bfa" />
                </BarChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El desperdicio representa {(stats.totalMaterialDesperdiciado / stats.totalMaterialUsado * 100).toFixed(1)}% del material usado.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        {/* Gráfico de líneas: Costos */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Costos de Material</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { name: 'Usado', costo: stats.totalCostoMaterialUsado },
                  { name: 'Desperdiciado', costo: stats.totalCostoMaterialDesperdiciado }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="costo" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El costo de desperdicio representa {(stats.totalCostoMaterialDesperdiciado / stats.totalCostoMaterialUsado * 100).toFixed(1)}% del costo total de material usado.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        {/* Gráfico de líneas: Tiempos */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Tiempos Promedio</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                  { name: 'Enfriamiento', tiempo: stats.avgTiempoEnfriamiento },
                  { name: 'Operación Efectiva', tiempo: stats.avgTiempoOperacionEfectiva },
                  { name: 'Respuesta Alertas', tiempo: stats.avgTiempoRespuestaAlertas }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="tiempo" stroke="#f472b6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> El tiempo de operación efectiva es clave para la eficiencia global.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        {/* Gráfico de barras: Alertas */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>Alertas de Temperatura</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Alertas', cantidad: stats.totalAlertasTemperatura }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
                  <XAxis dataKey="name" stroke="#c7d2fe" />
                  <YAxis stroke="#c7d2fe" />
                  <RechartsTooltip />
                  <Bar dataKey="cantidad" fill="#f472b6" />
                </BarChart>
              </ResponsiveContainer>
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Conclusión:</strong> Se recomienda minimizar el número de alertas para evitar paros de línea.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resumen Ejecutivo */}
      <Card className="summary-card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📋 Resumen Ejecutivo
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                🎯 Productividad
              </Typography>
              <Typography variant="body1" paragraph>
                • Total de piezas producidas: <strong>{stats.totalPieces}</strong><br/>
                • Tiempo promedio de ciclo: <strong>{stats.avgCycleTime.toFixed(1)} segundos</strong><br/>
                • Tiempo promedio de monitoreo: <strong>{(stats.avgMonitoringTime / 60).toFixed(1)} minutos</strong>
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                🔍 Calidad
              </Typography>
              <Typography variant="body1" paragraph>
                • Tasa de defectos: <strong>{stats.defectRate.toFixed(1)}%</strong><br/>
                • Piezas excelentes: <strong>{stats.totalExcellent}</strong><br/>
                • Calidad general: <strong>{stats.qualityRate.toFixed(1)}%</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Botones de exportación y ejemplos de reporte */}
      <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
        <button className="export-btn" onClick={handleExportPDF}>Exportar PDF</button>
        <button className="export-btn" onClick={handleExportExcel}>Exportar Excel</button>
        <button className="export-btn" onClick={handleShowReportExamples}>Ver Ejemplos de Reporte</button>
        <a href="/diccionario_datos_ecoblastic.pdf" target="_blank" rel="noopener noreferrer" className="export-btn">Diccionario de Datos</a>
      </Box>

      {/* Modal de ejemplos de reporte */}
      {showReportExamples && (
        <ReportExamplesModal onClose={handleCloseReportExamples} />
      )}
    </Box>
  );
};

export default AdvancedDataAnalysis; 