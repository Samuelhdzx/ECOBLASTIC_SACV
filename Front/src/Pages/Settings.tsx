import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Settings.css'
const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    alerts: true
  });

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="settings-header">
        <h1>Configuración</h1>
      </header>

      <div className="settings-layout">
        <nav className="settings-nav">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fi fi-rr-user"></i>
            Perfil y Cuenta
          </button>
          <button 
            className={`nav-item ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            <i className="fi fi-rr-settings"></i>
            Sistema
          </button>
          <button 
            className={`nav-item ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            <i className="fi fi-rr-factory"></i>
            Producción
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fi fi-rr-users"></i>
            Usuarios
          </button>
        </nav>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Perfil y Cuenta</h2>
              
              <div className="profile-section">
                <div className="profile-photo">
                  <img src="https://via.placeholder.com/150" alt="Profile" />
                  <button className="change-photo-btn">Cambiar Foto</button>
                </div>

                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" defaultValue="Usuario Demo" />
                </div>

                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" defaultValue="usuario@ecoblastic.com" />
                </div>

                <div className="form-group">
                  <label>Cambiar Contraseña</label>
                  <input type="password" placeholder="Nueva contraseña" />
                  <input type="password" placeholder="Confirmar contraseña" />
                </div>

                <div className="notification-prefs">
                  <h3>Preferencias de Notificaciones</h3>
                  <label className="toggle-label">
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={() => setNotifications({...notifications, email: !notifications.email})}
                    />
                    Notificaciones por Email
                  </label>
                  <label className="toggle-label">
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={() => setNotifications({...notifications, push: !notifications.push})}
                    />
                    Notificaciones Push
                  </label>
                  <label className="toggle-label">
                    <input 
                      type="checkbox" 
                      checked={notifications.alerts}
                      onChange={() => setNotifications({...notifications, alerts: !notifications.alerts})}
                    />
                    Alertas del Sistema
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Configuración del Sistema</h2>
              
              <div className="system-settings">
                <div className="form-group">
                  <label>Tema</label>
                  <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Idioma</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Formato de Fecha</label>
                  <select>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Unidades de Medida</label>
                  <select>
                    <option value="metric">Métrico</option>
                    <option value="imperial">Imperial</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'production' && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Configuración de Producción</h2>
              
              <div className="production-settings">
                <div className="form-group">
                  <h3>Parámetros de la Máquina</h3>
                  <div className="parameter-group">
                    <label>Velocidad Máxima (RPM)</label>
                    <input type="number" defaultValue="1500" />
                  </div>
                  <div className="parameter-group">
                    <label>Temperatura Óptima (°C)</label>
                    <input type="number" defaultValue="180" />
                  </div>
                </div>

                <div className="form-group">
                  <h3>Límites de Alertas</h3>
                  <div className="alert-group">
                    <label>Alerta de Temperatura (°C)</label>
                    <div className="range-inputs">
                      <input type="number" placeholder="Mín" defaultValue="160" />
                      <input type="number" placeholder="Máx" defaultValue="200" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <h3>Mantenimiento Programado</h3>
                  <div className="maintenance-schedule">
                    <label>Frecuencia de Mantenimiento</label>
                    <select>
                      <option value="weekly">Semanal</option>
                      <option value="biweekly">Quincenal</option>
                      <option value="monthly">Mensual</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div 
              className="settings-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Gestión de Usuarios</h2>
              
              <div className="users-management">
                <button className="add-user-btn">
                  <i className="fi fi-rr-user-add"></i>
                  Añadir Usuario
                </button>

                <div className="users-list">
                  <div className="user-item">
                    <img src="https://via.placeholder.com/40" alt="User" />
                    <div className="user-info">
                      <h4>Juan Pérez</h4>
                      <span>Administrador</span>
                    </div>
                    <div className="user-actions">
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </div>
                  </div>

                  <div className="user-item">
                    <img src="https://via.placeholder.com/40" alt="User" />
                    <div className="user-info">
                      <h4>María García</h4>
                      <span>Operador</span>
                    </div>
                    <div className="user-actions">
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
