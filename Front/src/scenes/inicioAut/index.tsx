import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import celular from 'front/public/img/PÁGINA PRINCIPAL/celular.png';
import computadora from 'front/public/img/PÁGINA PRINCIPAL/compu.png';
import './style.css';

const InicioAut: React.FC = () => {
  const theme = useTheme();
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nueva actualización del sistema disponible', time: '2h' },
    { id: 2, message: 'Reporte semanal generado', time: '5h' },
    { id: 3, message: 'Mantenimiento programado', time: '1d' },
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username || '');
  }, []);

  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
    >
      <Box className="gradient-overlay">
        <motion.section
          className="hero"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box className="hero-content">
            <Box className="hero-text">
              <Typography variant="h1">¡Bienvenido de nuevo, {username}!</Typography>
              <Typography variant="body1" className="hero-description">
                Tu panel de control está listo para ayudarte a optimizar tu producción.
              </Typography>
              <Box className="action-buttons">
                <Button component={Link} to="/data-entry" variant="contained" color="primary">
                  Ingresar Nuevos Datos
                </Button>
                <Button component={Link} to="/dashboard" variant="outlined" color="secondary">
                  Ver Dashboard
                </Button>
              </Box>
            </Box>
            <Box className="hero-visual">
              <img src={celular} alt="ECOBLASTIC Móvil" className="floating" />
            </Box>
          </Box>
        </motion.section>

        <motion.section
          className="widgets-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Box className="widget notification-widget">
            <Typography variant="h3">Notificaciones Recientes</Typography>
            <Box className="notification-list">
              {notifications.map((notif) => (
                <Box key={notif.id} className="notification-item">
                  <Typography variant="body2">{notif.message}</Typography>
                  <Typography variant="caption" className="notification-time">{notif.time}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="widget activity-widget">
            <Typography variant="h3">Resumen Semanal</Typography>
            <Box className="activity-stats">
              <Box className="stat-row">
                <Typography variant="body2">Mediciones Realizadas</Typography>
                <Typography variant="body2">28</Typography>
              </Box>
              <Box className="stat-row">
                <Typography variant="body2">Eficiencia Promedio</Typography>
                <Typography variant="body2">95%</Typography>
              </Box>
              <Box className="stat-row">
                <Typography variant="body2">Alertas Resueltas</Typography>
                <Typography variant="body2">12</Typography>
              </Box>
            </Box>
          </Box>

          <Box className="widget custom-widget">
            <Typography variant="h3">Accesos Rápidos</Typography>
            <Box className="quick-access-grid">
              <Button component={Link} to="/data-entry" className="quick-access-item" startIcon={<i className="fi fi-rr-plus-small"></i>}>
                Nuevo Registro
              </Button>
              <Button component={Link} to="/reports" className="quick-access-item" startIcon={<i className="fi fi-rr-chart-pie"></i>}>
                Reportes
              </Button>
              <Button component={Link} to="/settings" className="quick-access-item" startIcon={<i className="fi fi-rr-settings"></i>}>
                Configuración
              </Button>
              <Button component={Link} to="/help" className="quick-access-item" startIcon={<i className="fi fi-rr-interrogation"></i>}>
                Ayuda
              </Button>
            </Box>
          </Box>
        </motion.section>

        <motion.section
          className="features"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box className="features-grid">
            <Button component={Link} to="/data-entry" className="feature-card clickable" startIcon={<i className="fi fi-rr-plus-small"></i>}>
              Registrar Datos
            </Button>
            <Button component={Link} to="/dashboard" className="feature-card clickable" startIcon={<i className="fi fi-rr-dashboard"></i>}>
              Dashboard
            </Button>
            <Button component={Link} to="/reports" className="feature-card clickable" startIcon={<i className="fi fi-rr-chart-pie"></i>}>
              Reportes
            </Button>
            <Button component={Link} to="/profile" className="feature-card clickable" startIcon={<i className="fi fi-rr-user"></i>}>
              Mi Perfil
            </Button>
          </Box>
        </motion.section>

        <Box className="quick-stats">
          <Box className="stats-container">
            <Box className="stat-item">
              <Typography variant="h4">Última Medición</Typography>
              <Typography variant="body2">Hace 2 horas</Typography>
            </Box>
            <Box className="stat-item">
              <Typography variant="h4">Eficiencia</Typography>
              <Typography variant="body2">95%</Typography>
            </Box>
            <Box className="stat-item">
              <Typography variant="h4">Estado</Typography>
              <Typography variant="body2">Óptimo</Typography>
            </Box>
            <Box className="stat-item">
              <Typography variant="h4">Alertas</Typography>
              <Typography variant="body2">0 Pendientes</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default InicioAut;