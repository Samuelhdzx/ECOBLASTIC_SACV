import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import celular from 'front/public/img/PÁGINA PRINCIPAL/celular.png';
import reports from '../../Pages/Reports';
import computadora from 'front/public/img/PÁGINA PRINCIPAL/compu.png';
import './style.css';


const inicioAut: React.FC = () => {
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
    >
      <div className="gradient-overlay">
        <motion.section
          className="hero"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h1>¡Bienvenido de nuevo, {username}!</h1>
              <p className="hero-description">
                Tu panel de control está listo para ayudarte a optimizar tu producción.
              </p>
              <div className="action-buttons">
                <Link to="/data-entry" className="primary-btn">
                  Ingresar Nuevos Datos
                </Link>
                <Link to="/dashboard" className="secondary-btn">
                  Ver Dashboard
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <img src={celular} alt="ECOBLASTIC Móvil" className="floating" />
            </div>
          </div>
        </motion.section>


        <motion.section
          className="widgets-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="widget notification-widget">
            <h3>Notificaciones Recientes</h3>
            <div className="notification-list">
              {notifications.map((notif) => (
                <div key={notif.id} className="notification-item">
                  <p>{notif.message}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>


          <div className="widget activity-widget">
            <h3>Resumen Semanal</h3>
            <div className="activity-stats">
              <div className="stat-row">
                <span>Mediciones Realizadas</span>
                <span>28</span>
              </div>
              <div className="stat-row">
                <span>Eficiencia Promedio</span>
                <span>95%</span>
              </div>
              <div className="stat-row">
                <span>Alertas Resueltas</span>
                <span>12</span>
              </div>
            </div>
          </div>


          <div className="widget custom-widget">
            <h3>Accesos Rápidos</h3>
            <div className="quick-access-grid">
              <Link to="/data-entry" className="quick-access-item">
                <i className="fi fi-rr-plus-small"></i>
                <span>Nuevo Registro</span>
              </Link>
              <Link to="/reports" className="quick-access-item">
                <i className="fi fi-rr-chart-pie"></i>
                <span>Reportes</span>
              </Link>
              <Link to="/settings" className="quick-access-item">
                <i className="fi fi-rr-settings"></i>
                <span>Configuración</span>
              </Link>
              <Link to="/help" className="quick-access-item">
                <i className="fi fi-rr-interrogation"></i>
                <span>Ayuda</span>
              </Link>
            </div>
          </div>
        </motion.section>


        <motion.section
          className="features"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="features-grid">
            <Link to="/data-entry" className="feature-card clickable">
              <i className="fi fi-rr-plus-small"></i>
              <h3>Registrar Datos</h3>
              <p>Ingresa nuevas mediciones</p>
            </Link>
            <Link to="/dashboard" className="feature-card clickable">
              <i className="fi fi-rr-dashboard"></i>
              <h3>Dashboard</h3>
              <p>Visualiza tus estadísticas</p>
            </Link>
            <Link to="/reports" className="feature-card clickable">
              <i className="fi fi-rr-chart-pie"></i>
              <h3>Reportes</h3>
              <p>Análisis detallado</p>
            </Link>
            <Link to="/profile" className="feature-card clickable">
              <i className="fi fi-rr-user"></i>
              <h3>Mi Perfil</h3>
              <p>Gestiona tu cuenta</p>
            </Link>
          </div>
        </motion.section>


        <section className="quick-stats">
          <div className="stats-container">
            <div className="stat-item">
              <h4>Última Medición</h4>
              <p>Hace 2 horas</p>
            </div>
            <div className="stat-item">
              <h4>Eficiencia</h4>
              <p>95%</p>
            </div>
            <div className="stat-item">
              <h4>Estado</h4>
              <p>Óptimo</p>
            </div>
            <div className="stat-item">
              <h4>Alertas</h4>
              <p>0 Pendientes</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};


export default inicioAut;