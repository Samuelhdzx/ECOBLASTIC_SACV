import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGetUserRecordsQuery } from '../state/api';
import { Line, Bar } from 'react-chartjs-2';

interface UserDetailModalProps {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt: string;
    lastLogin?: string;
    role?: string;
  };
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: userRecords, isLoading } = useGetUserRecordsQuery(user._id);

  const temperatureData = {
    labels: userRecords?.map(record => new Date(record.createdAt).toLocaleDateString()) || [],
    datasets: [{
      label: 'Temperatura (°C)',
      data: userRecords?.map(record => record.temperature) || [],
      borderColor: '#2563eb',
      tension: 0.4
    }]
  };

  const productionData = {
    labels: ['PET', 'Polipropileno'],
    datasets: [{
      label: 'Uso de Material (kg)',
      data: [
        userRecords?.reduce((sum, record) => sum + (record.polymerUsage?.pet || 0), 0) || 0,
        userRecords?.reduce((sum, record) => sum + (record.polymerUsage?.polypropylene || 0), 0) || 0
      ],
      backgroundColor: ['#2563eb', '#7c3aed']
    }]
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="user-detail-modal"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="modal-header">
          <h2>Perfil de Usuario</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="user-profile-section">
          <div className="user-avatar-container">
            <img 
              src={user.avatar || "https://via.placeholder.com/100"} 
              alt={user.username} 
              className="user-avatar"
            />
            <span className="user-status online"></span>
          </div>
          <div className="user-main-info">
            <h3>{user.username}</h3>
            <span className="user-role">{user.role || 'Operador'}</span>
            <div className="user-badges">
              <span className="badge">Producción</span>
              <span className="badge">Control de Calidad</span>
            </div>
          </div>
        </div>

        <div className="user-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Vista General
          </button>
          <button 
            className={`tab-btn ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            Registros
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Estadísticas
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Fecha de Registro</span>
                  <span className="info-value">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Último Acceso</span>
                  <span className="info-value">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'No disponible'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total de Registros</span>
                  <span className="info-value">{userRecords?.length || 0}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="records-tab">
              {isLoading ? (
                <div className="loading-records">
                  <span className="loader"></span>
                  <p>Cargando registros...</p>
                </div>
              ) : userRecords?.length > 0 ? (
                <>
                  <div className="records-chart">
                    <h4>Historial de Temperatura</h4>
                    <Line data={temperatureData} />
                  </div>
                  <div className="records-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Temperatura</th>
                          <th>Material</th>
                          <th>Eficiencia</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userRecords.map(record => (
                          <tr key={record._id}>
                            <td>{new Date(record.createdAt).toLocaleString()}</td>
                            <td>{record.temperature}°C</td>
                            <td>{record.polymerUsage?.pet ? 'PET' : 'Polipropileno'}</td>
                            <td>{record.efficiency || '90'}%</td>
                            <td>
                              <span className={`status-badge ${record.status || 'success'}`}>
                                {record.status || 'Completado'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="no-records">
                  <i className="fi fi-rr-info"></i>
                  <p>No hay registros disponibles para este usuario</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="stats-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Producción Total</h4>
                  <div className="chart-container">
                    <Bar data={productionData} />
                  </div>
                </div>
                <div className="stat-card">
                  <h4>Resumen de Actividad</h4>
                  <div className="activity-stats">
                    <div className="stat-item">
                      <span className="stat-value">
                        {userRecords?.reduce((sum, record) => 
                          sum + (record.polymerUsage?.pet || 0) + (record.polymerUsage?.polypropylene || 0), 0
                        ).toFixed(2) || '0'} kg
                      </span>
                      <span className="stat-label">Material Procesado</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">
                        {userRecords?.length || 0}
                      </span>
                      <span className="stat-label">Total de Operaciones</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">
                        {userRecords?.reduce((acc, record) => 
                          acc + (record.efficiency || 90), 0) / (userRecords?.length || 1)}%
                      </span>
                      <span className="stat-label">Eficiencia Promedio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="edit-user-btn">
            <i className="fi fi-rr-edit"></i>
            Editar Usuario
          </button>
          <button className="close-modal-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDetailModal;
