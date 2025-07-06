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

const AdvancedDataAnalysis: React.FC = () => {
  console.log('AdvancedDataAnalysis component rendering...');
  
  const { data: sensorData, isLoading, error } = useGetAllSensorDataForAnalysisQuery();
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [showConclusions, setShowConclusions] = useState<{[key: string]: boolean}>({});

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
      </Grid>

      {/* Gráficos Simplificados */}
      <Grid container spacing={3} className="charts-grid">
        {/* Gráfico de Materiales */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Distribución de Materiales</Typography>
                <Tooltip title="Ver conclusiones">
                  <IconButton 
                    onClick={() => toggleConclusion('materials')}
                    className="conclusion-button"
                    size="small"
                  >
                    <Info />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box p={3} textAlign="center">
                <Typography variant="h4" color="primary" gutterBottom>
                  PET: {stats.petUsage} | PP: {stats.polypropyleneUsage}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total de piezas analizadas
                </Typography>
              </Box>

              {showConclusions.materials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Análisis de Materiales:</strong> PET representa el {(stats.petUsage / stats.totalPieces * 100).toFixed(1)}% del uso total, 
                  mientras que Polipropileno representa el {(stats.polypropyleneUsage / stats.totalPieces * 100).toFixed(1)}%. 
                  Esto sugiere una preferencia por PET en la producción actual.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Calidad */}
        <Grid item xs={12} md={6}>
          <Card className="chart-card">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Distribución de Calidad</Typography>
                <Tooltip title="Ver conclusiones">
                  <IconButton 
                    onClick={() => toggleConclusion('quality')}
                    className="conclusion-button"
                    size="small"
                  >
                    <Info />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box p={3} textAlign="center">
                <Typography variant="h4" color="primary" gutterBottom>
                  Excelente: {stats.totalExcellent} | Bueno: {stats.totalGood}
                </Typography>
                <Typography variant="h6" color="error" gutterBottom>
                  Defectuoso: {stats.totalDefective}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Distribución de calidad
                </Typography>
              </Box>

              {showConclusions.quality && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Análisis de Calidad:</strong> La tasa de defectos es del {stats.defectRate.toFixed(1)}%, 
                  con un {(stats.totalExcellent / stats.totalPieces * 100).toFixed(1)}% de piezas excelentes. 
                  La calidad general es {(stats.qualityRate).toFixed(1)}%.
                </Alert>
              )}
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
    </Box>
  );
};

export default AdvancedDataAnalysis; 