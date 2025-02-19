import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminNavbar from '@/scenes/navbar/AdminNavbar';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const admin = JSON.parse(localStorage.getItem('admin') || '{}');
      setUsername(admin.username || '');
    }, []);

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
          localStorage.clear();
          const authChangeEvent = new Event('authChange');
          window.dispatchEvent(authChangeEvent);
          navigate('/inicio', { replace: true });
        }
      };
       
    return (
      <div className="admin-landing-page">
        < AdminNavbar />
        <div className="admin-gradient-overlay">
          <section className="admin-hero">
            <div className="admin-hero-content">
              <div className="admin-hero-text">
                <h1>Panel de Control Administrativo</h1>
                <p className="admin-hero-description">
                  Bienvenido {username} al sistema de gestión ECOBLASTIC
                </p>
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  color="error"
                  startIcon={<LogoutIcon />}
                  sx={{ mt: 2 }}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </section>

          <section className="admin-features">
            <div className="admin-features-grid">
              <Link to="/settings" className="admin-feature-card">
                <SettingsIcon sx={{ fontSize: 50 }} />
                <h3>Configuración del Sistema</h3>
                <p>Gestión y control de parámetros</p>
              </Link>

              <Link to="/reports" className="admin-feature-card">
                <AssessmentIcon sx={{ fontSize: 50 }} />
                <h3>Reportes y Análisis</h3>
                <p>Estadísticas y métricas del sistema</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
};

export default AdminDashboard;
