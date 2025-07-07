import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Person,
  AdminPanelSettings,
  Business,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';

interface ReportExamplesModalProps {
  onClose: () => void;
}

const ReportExamplesModal: React.FC<ReportExamplesModalProps> = ({ onClose }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1a1a2e',
          color: '#ffffff',
          borderRadius: '16px'
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: '#16213e', 
        color: '#ffffff',
        borderBottom: '2px solid #0f3460'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Business sx={{ color: '#a78bfa' }} />
          <Typography variant="h5">
            📊 Ejemplos de Reportes - ECOBLASTIC_DEF
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: '#1a1a2e', color: '#ffffff' }}>
        <Grid container spacing={3}>
          
          {/* REPORTE PARA USUARIO/OPERADOR */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              backgroundColor: '#16213e', 
              border: '2px solid #0f3460',
              borderRadius: '12px'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Person sx={{ color: '#a78bfa' }} />
                  <Typography variant="h6" color="#a78bfa">
                    👤 Reporte para Usuario/Operador
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  <strong>Objetivo:</strong> Información operacional diaria para el personal de producción.
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    📈 KPIs Principales:
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Chip 
                      label="Piezas producidas hoy: 45" 
                      size="small" 
                      sx={{ backgroundColor: '#6366f1', color: 'white' }}
                    />
                    <Chip 
                      label="Tiempo promedio ciclo: 2.3 min" 
                      size="small" 
                      sx={{ backgroundColor: '#7c3aed', color: 'white' }}
                    />
                    <Chip 
                      label="Tasa de defectos: 3.2%" 
                      size="small" 
                      sx={{ backgroundColor: '#f472b6', color: 'white' }}
                    />
                  </Box>
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    ⚠️ Alertas Activas:
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Chip 
                      icon={<Warning />}
                      label="Temperatura alta en molde 2" 
                      size="small" 
                      sx={{ backgroundColor: '#facc15', color: 'black' }}
                    />
                    <Chip 
                      icon={<Error />}
                      label="Energía inyector al 85%" 
                      size="small" 
                      sx={{ backgroundColor: '#ef4444', color: 'white' }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    🎯 Recomendaciones:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    • Verificar temperatura del molde 2<br/>
                    • Programar mantenimiento del inyector<br/>
                    • Revisar parámetros de presión
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* REPORTE PARA ADMINISTRADOR */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              backgroundColor: '#16213e', 
              border: '2px solid #0f3460',
              borderRadius: '12px'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AdminPanelSettings sx={{ color: '#6366f1' }} />
                  <Typography variant="h6" color="#6366f1">
                    🏢 Reporte para Administrador
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  <strong>Objetivo:</strong> Análisis de eficiencia y costos para toma de decisiones gerenciales.
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    💰 Análisis de Costos:
                  </Typography>
                  <TableContainer component={Paper} sx={{ backgroundColor: '#0f3460' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#c7d2fe', fontSize: '0.7rem' }}>Concepto</TableCell>
                          <TableCell sx={{ color: '#c7d2fe', fontSize: '0.7rem' }}>Valor</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Material usado</TableCell>
                          <TableCell sx={{ color: '#a78bfa', fontSize: '0.7rem' }}>$12,450</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Desperdicio</TableCell>
                          <TableCell sx={{ color: '#f472b6', fontSize: '0.7rem' }}>$890</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Costo/pieza</TableCell>
                          <TableCell sx={{ color: '#818cf8', fontSize: '0.7rem' }}>$2.45</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    📊 Eficiencia por Operador:
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Chip 
                      icon={<TrendingUp />}
                      label="Juan Pérez: 94% eficiencia" 
                      size="small" 
                      sx={{ backgroundColor: '#10b981', color: 'white' }}
                    />
                    <Chip 
                      icon={<TrendingDown />}
                      label="María García: 87% eficiencia" 
                      size="small" 
                      sx={{ backgroundColor: '#f59e0b', color: 'white' }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    🎯 Acciones Recomendadas:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    • Optimizar proceso de María García<br/>
                    • Reducir desperdicio en 15%<br/>
                    • Invertir en mantenimiento preventivo
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* REPORTE DE VISIÓN GLOBAL */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              backgroundColor: '#16213e', 
              border: '2px solid #0f3460',
              borderRadius: '12px'
            }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Business sx={{ color: '#7c3aed' }} />
                  <Typography variant="h6" color="#7c3aed">
                    🌍 Visión Global/Ejecutiva
                  </Typography>
                </Box>
                
                <Typography variant="body2" paragraph>
                  <strong>Objetivo:</strong> Resumen ejecutivo para stakeholders y dirección general.
                </Typography>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    🎯 KPIs Estratégicos:
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Chip 
                      icon={<CheckCircle />}
                      label="OEE (Eficiencia): 89.2%" 
                      size="small" 
                      sx={{ backgroundColor: '#10b981', color: 'white' }}
                    />
                    <Chip 
                      icon={<TrendingUp />}
                      label="Productividad: +12% vs mes anterior" 
                      size="small" 
                      sx={{ backgroundColor: '#6366f1', color: 'white' }}
                    />
                    <Chip 
                      icon={<TrendingDown />}
                      label="Costos: -8% vs presupuesto" 
                      size="small" 
                      sx={{ backgroundColor: '#f472b6', color: 'white' }}
                    />
                  </Box>
                </Box>

                <Box mb={2}>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    📈 Tendencias Mensuales:
                  </Typography>
                  <TableContainer component={Paper} sx={{ backgroundColor: '#0f3460' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: '#c7d2fe', fontSize: '0.7rem' }}>Métrica</TableCell>
                          <TableCell sx={{ color: '#c7d2fe', fontSize: '0.7rem' }}>Actual</TableCell>
                          <TableCell sx={{ color: '#c7d2fe', fontSize: '0.7rem' }}>Meta</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Producción</TableCell>
                          <TableCell sx={{ color: '#10b981', fontSize: '0.7rem' }}>1,250 piezas</TableCell>
                          <TableCell sx={{ color: '#a78bfa', fontSize: '0.7rem' }}>1,200 piezas</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Calidad</TableCell>
                          <TableCell sx={{ color: '#10b981', fontSize: '0.7rem' }}>96.8%</TableCell>
                          <TableCell sx={{ color: '#a78bfa', fontSize: '0.7rem' }}>95%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: '#ffffff', fontSize: '0.7rem' }}>Costos</TableCell>
                          <TableCell sx={{ color: '#f472b6', fontSize: '0.7rem' }}>$28,450</TableCell>
                          <TableCell sx={{ color: '#a78bfa', fontSize: '0.7rem' }}>$30,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                    🎯 Resumen Ejecutivo:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    • Superamos metas de producción en 4.2%<br/>
                    • Calidad excede estándares en 1.8%<br/>
                    • Ahorro de $1,550 en costos operativos<br/>
                    • ROI del sistema: 156% en 6 meses
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <Divider sx={{ my: 3, borderColor: '#0f3460' }} />

        {/* INFORMACIÓN ADICIONAL */}
        <Box sx={{ backgroundColor: '#0f3460', p: 2, borderRadius: '8px' }}>
          <Typography variant="h6" color="#a78bfa" gutterBottom>
            📋 Características de los Reportes
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                🔄 Frecuencia de Generación:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                • <strong>Usuario:</strong> Tiempo real + Diario<br/>
                • <strong>Administrador:</strong> Diario + Semanal<br/>
                • <strong>Global:</strong> Semanal + Mensual
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                📊 Métricas Incluidas:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                • Productividad y eficiencia<br/>
                • Calidad y defectos<br/>
                • Costos y desperdicios<br/>
                • Tiempos y alertas
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="#818cf8" gutterBottom>
                🎯 Beneficios:
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                • Toma de decisiones basada en datos<br/>
                • Identificación de oportunidades<br/>
                • Mejora continua de procesos<br/>
                • Optimización de recursos
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </DialogContent>

      <DialogActions sx={{ 
        backgroundColor: '#16213e', 
        borderTop: '2px solid #0f3460',
        p: 2
      }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ 
            backgroundColor: '#6366f1',
            '&:hover': { backgroundColor: '#7c3aed' }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportExamplesModal; 