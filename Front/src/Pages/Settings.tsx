// Settings.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend as ChartLegend
} from 'chart.js';
import './Settings.css';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useRegisterUserMutation,
  useGetProductionMetricsQuery,
  useGetInventoryLevelsQuery,
  useGetQualityMetricsQuery,
  useGetMaintenanceScheduleQuery,
  useUpdateMachineParamsMutation,
  useGetSensorDataQuery
} from '../state/api';
import UserDetailModal from '../components/UserDetailModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  ChartLegend
);

interface ModalRegistroProps {
  onClose: () => void;
}

const ModalRegistro: React.FC<ModalRegistroProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [registerUser] = useRegisterUserMutation({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      alert('Usuario registrado exitosamente');
      onClose();
    } catch (error) {
      alert('Error al registrar usuario: ' + JSON.stringify(error));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrar Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Registrar</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface SettingsProps {
  onThemeChange?: (mode: "dark" | "light") => void;
  currentMode?: "dark" | "light";
}

const Settings: React.FC<SettingsProps> = ({ onThemeChange, currentMode }) => {
  // Estados principales
  const [activeTab, setActiveTab] = useState(() => 
    localStorage.getItem('settingsActiveTab') || 'production'
  );
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Queries para datos reales
  const { data: users, isLoading: usersLoading, error: usersError } = useGetAllUsersQuery();
  const { data: sensorData } = useGetSensorDataQuery();
  const { data: productionMetrics } = useGetProductionMetricsQuery();
  const { data: inventoryLevels } = useGetInventoryLevelsQuery();
  const { data: qualityMetrics } = useGetQualityMetricsQuery();
  const { data: maintenanceData } = useGetMaintenanceScheduleQuery();

  // Mutations
  const [deleteUser] = useDeleteUserMutation();
  const [updateMachineParams] = useUpdateMachineParamsMutation();

  // Manejadores de eventos
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUser(userId).unwrap();
        alert("Usuario eliminado correctamente");
      } catch (error) {
        alert(`Error al eliminar usuario: ${JSON.stringify(error)}`);
      }
    }
  };

  const handleMachineParamUpdate = async (param: string, value: number) => {
    try {
      await updateMachineParams({ [param]: value }).unwrap();
    } catch (error) {
      console.error('Error updating machine params:', error);
    }
  };

  // Configuración de gráficos con datos reales
  const productionChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Producción Mensual',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Bloque para el selector de tema
  const [tempMode, setTempMode] = useState<"dark" | "light">(currentMode || "dark");

  const handleChangeTheme = (newMode: "dark" | "light") => {
    setTempMode(newMode);
    onThemeChange && onThemeChange(newMode);
  };

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="settings-header">
        <h1>Panel de Control ECOBLASTIC</h1>
        <div className="real-time-indicators">
          <div className="indicator">
            <i className="fi fi-rr-temperature-high"></i>
            <span>{sensorData?.[sensorData.length - 1]?.temperature || '0'}°C</span>
          </div>
          <div className="indicator">
            <i className="fi fi-rr-stats"></i>
            <span>{productionMetrics?.data?.efficiency || '0'}% Eficiencia</span>
          </div>
        </div>
      </header>

      <div className="settings-layout">
        <nav className="settings-nav">
          <div className="nav-section">
            <h3>Producción</h3>
            <button 
              className={`nav-item ${activeTab === 'production' ? 'active' : ''}`}
              onClick={() => setActiveTab('production')}
            >
              <i className="fi fi-rr-factory"></i>
              Control de Producción
            </button>
            <button 
              className={`nav-item ${activeTab === 'quality' ? 'active' : ''}`}
              onClick={() => setActiveTab('quality')}
            >
              <i className="fi fi-rr-shield-check"></i>
              Control de Calidad
            </button>
          </div>

          <div className="nav-section">
            <h3>Recursos</h3>
            <button 
              className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <i className="fi fi-rr-box"></i>
              Inventario
            </button>
            <button 
              className={`nav-item ${activeTab === 'maintenance' ? 'active' : ''}`}
              onClick={() => setActiveTab('maintenance')}
            >
              <i className="fi fi-rr-wrench"></i>
              Mantenimiento
            </button>
          </div>

          <div className="nav-section">
            <h3>Sistema</h3>
            <button 
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <i className="fi fi-rr-chart-pie"></i>
              Reportes y Análisis
            </button>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <i className="fi fi-rr-users"></i>
              Usuarios
            </button>
          </div>
        </nav>

        <div className="settings-content">
          {activeTab === 'production' && (
            <motion.div 
              className="settings-section production-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="section-header">
                <h2>Control de Producción</h2>
                <div className="action-buttons">
                  <button className="primary-btn">
                    <i className="fi fi-rr-play"></i>
                    Iniciar Producción
                  </button>
                  <button className="warning-btn">
                    <i className="fi fi-rr-pause"></i>
                    Pausar
                  </button>
                </div>
              </div>

              <div className="production-dashboard">
                <div className="metrics-grid">
                  <div className="metric-card temperature">
                    <h3>Temperatura</h3>
                    <div className="metric-value">
                      {productionMetrics?.data?.machineStatus?.temperature || '0'}°C
                      <span className="trend-indicator up">↑</span>
                    </div>
                    <input 
                      type="range" 
                      min="160" 
                      max="200"
                      value={productionMetrics?.data?.machineStatus?.temperature || 180}
                      onChange={(e) => handleMachineParamUpdate('temperature', Number(e.target.value))}
                    />
                    <div className="parameter-limits">
                      <span>Min: 160°C</span>
                      <span>Max: 200°C</span>
                    </div>
                  </div>
                  
                  <div className="metric-card pressure">
                    <h3>Presión</h3>
                    <div className="metric-value">
                      {productionMetrics?.data?.machineStatus?.pressure || '0'} bar
                      <span className="trend-indicator down">↓</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="120"
                      value={productionMetrics?.data?.machineStatus?.pressure || 100}
                      onChange={(e) => handleMachineParamUpdate('pressure', Number(e.target.value))}
                    />
                    <div className="parameter-limits">
                      <span>Min: 80 bar</span>
                      <span>Max: 120 bar</span>
                    </div>
                  </div>

                  <div className="metric-card speed">
                    <h3>Velocidad</h3>
                    <div className="metric-value">
                      {productionMetrics?.data?.machineStatus?.speed || '0'} RPM
                      <span className="trend-indicator stable">→</span>
                    </div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="2000"
                      value={productionMetrics?.data?.machineStatus?.speed || 1500}
                      onChange={(e) => handleMachineParamUpdate('speed', Number(e.target.value))}
                    />
                    <div className="parameter-limits">
                      <span>Min: 1000 RPM</span>
                      <span>Max: 2000 RPM</span>
                    </div>
                  </div>
                </div>

                <div className="production-stats">
                  <h3>Estadísticas de Producción</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-label">Eficiencia</span>
                      <span className="stat-value">{productionMetrics?.data?.efficiency || '0'}%</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Producción Total</span>
                      <span className="stat-value">{productionMetrics?.data?.totalProduction || '0'} kg</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Tiempo Activo</span>
                      <span className="stat-value">{productionMetrics?.data?.uptime || '0'} hrs</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Piezas Producidas</span>
                      <span className="stat-value">{productionMetrics?.data?.totalPieces || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'quality' && (
            <motion.div 
              className="settings-section quality-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Control de Calidad</h2>
              
              <div className="quality-dashboard">
                <div className="quality-metrics">
                  <div className="quality-card">
                    <h3>Tasa de Defectos</h3>
                    <div className="quality-value">
                      {qualityMetrics?.data?.defectRate || '0'}%
                      <span className={`trend-badge ${(qualityMetrics?.data?.defectRate || 0) < 5 ? 'good' : 'warning'}`}>
                        {(qualityMetrics?.data?.defectRate || 0) < 5 ? 'Óptimo' : 'Atención'}
                      </span>
                    </div>
                    <div className="quality-stats">
                      <div className="stat-item">
                        <span>Total de Piezas:</span>
                        <span className="value">{qualityMetrics?.data?.totalPieces || '0'}</span>
                      </div>
                      <div className="stat-item">
                        <span>Piezas Defectuosas:</span>
                        <span className="value">{qualityMetrics?.data?.defectivePieces || '0'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="quality-alerts">
                    <h3>Alertas de Calidad</h3>
                    <div className="alerts-list">
                      {qualityMetrics?.data?.alerts && qualityMetrics.data.alerts.length > 0 ? (
                        qualityMetrics.data.alerts.map((alert, index) => (
                          <div key={index} className={`alert-item ${alert.severity}`}>
                            <i className={`fi fi-rr-${alert.severity === 'high' ? 'warning' : 'info'}`}></i>
                            <span>{alert.message}</span>
                            <span className="alert-time">{alert.time}</span>
                          </div>
                        ))
                      ) : (
                        <div className="no-alerts">No hay alertas activas de calidad</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="quality-chart-section">
                  <h3>Tendencia de Calidad</h3>
                  <div className="chart-container">
                    <Line 
                      data={{
                        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                        datasets: [
                          {
                            label: 'Tasa de Defectos (%)',
                            data: [2.1, 1.8, 3.2, 2.5, 1.9, 2.8, 2.3],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            tension: 0.4
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                          title: {
                            display: true,
                            text: 'Tendencia Semanal de Defectos'
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 10
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'maintenance' && (
            <motion.div 
              className="settings-section maintenance-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Mantenimiento</h2>
              
              <div className="maintenance-dashboard">
                <div className="maintenance-schedule">
                  <h3>Próximo Mantenimiento</h3>
                  <div className="schedule-card">
                    <div className="schedule-info">
                      <span className="date">{maintenanceData?.data?.nextMaintenance || 'No programado'}</span>
                      <span className="frequency">{maintenanceData?.data?.frequency || 'Semanal'}</span>
                    </div>
                    <button className="schedule-btn">Programar Mantenimiento</button>
                  </div>
                </div>

                <div className="maintenance-history">
                  <h3>Historial de Mantenimiento</h3>
                  <div className="history-list">
                    {maintenanceData?.data?.maintenanceHistory?.map((record, index) => (
                      <div key={index} className="history-item">
                        <div className="history-info">
                          <span className="date">{record.date}</span>
                          <span className="type">{record.type}</span>
                        </div>
                        <p className="description">{record.description}</p>
                        <div className="technician">
                          <i className="fi fi-rr-user"></i>
                          <span>{record.technician}</span>
                        </div>
                      </div>
                    )) || (
                      <div className="no-history">No hay historial de mantenimiento</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div 
              className="settings-section inventory-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Control de Inventario</h2>
              
              <div className="inventory-dashboard">
                <div className="materials-overview">
                  <h3>Materiales Disponibles</h3>
                  <div className="materials-grid">
                    <div className="material-card">
                      <h4>PET</h4>
                      <div className="material-stats">
                        <div className="stat">
                          <span>Disponible</span>
                          <span className="value">{inventoryLevels?.data?.materials?.pet || '0'} kg</span>
                        </div>
                        <div className="stat">
                          <span>Punto de Reorden</span>
                          <span className="value">100 kg</span>
                        </div>
                        <div className="stat">
                          <span>Estado</span>
                          <span className={`status ${(inventoryLevels?.data?.materials?.pet || 0) > 100 ? 'good' : 'warning'}`}>
                            {(inventoryLevels?.data?.materials?.pet || 0) > 100 ? 'Normal' : 'Bajo'}
                          </span>
                        </div>
                      </div>
                      <div className="material-status">
                        <div className="progress-bar">
                          <div 
                            className="progress" 
                            style={{width: `${Math.min((inventoryLevels?.data?.materials?.pet || 0) / 10, 100)}%`}}
                          ></div>
                        </div>
                        <span className="percentage">{Math.min((inventoryLevels?.data?.materials?.pet || 0) / 10, 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="material-card">
                      <h4>Polipropileno</h4>
                      <div className="material-stats">
                        <div className="stat">
                          <span>Disponible</span>
                          <span className="value">{inventoryLevels?.data?.materials?.polypropylene || '0'} kg</span>
                        </div>
                        <div className="stat">
                          <span>Punto de Reorden</span>
                          <span className="value">150 kg</span>
                        </div>
                        <div className="stat">
                          <span>Estado</span>
                          <span className={`status ${(inventoryLevels?.data?.materials?.polypropylene || 0) > 150 ? 'good' : 'warning'}`}>
                            {(inventoryLevels?.data?.materials?.polypropylene || 0) > 150 ? 'Normal' : 'Bajo'}
                          </span>
                        </div>
                      </div>
                      <div className="material-status">
                        <div className="progress-bar">
                          <div 
                            className="progress" 
                            style={{width: `${Math.min((inventoryLevels?.data?.materials?.polypropylene || 0) / 15, 100)}%`}}
                          ></div>
                        </div>
                        <span className="percentage">{Math.min((inventoryLevels?.data?.materials?.polypropylene || 0) / 15, 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inventory-alerts">
                  <h3>Alertas de Inventario</h3>
                  <div className="alerts-list">
                    {inventoryLevels?.data?.alerts && inventoryLevels.data.alerts.length > 0 ? (
                      inventoryLevels.data.alerts.map((alert, index) => (
                        <div key={index} className={`alert-item ${alert.type}`}>
                          <i className="fi fi-rr-exclamation"></i>
                          <span>{alert.message}</span>
                          <button className="action-btn">Ordenar</button>
                        </div>
                      ))
                    ) : (
                      <div className="no-alerts">No hay alertas de inventario activas</div>
                    )}
                  </div>
                </div>

                <div className="inventory-summary">
                  <h3>Resumen de Consumo</h3>
                  <div className="consumption-stats">
                    <div className="consumption-card">
                      <h4>Consumo Semanal</h4>
                      <div className="consumption-data">
                        <div className="consumption-item">
                          <span>PET:</span>
                          <span className="value">{(1000 - (inventoryLevels?.data?.materials?.pet || 0)).toFixed(1)} kg</span>
                        </div>
                        <div className="consumption-item">
                          <span>Polipropileno:</span>
                          <span className="value">{(1500 - (inventoryLevels?.data?.materials?.polypropylene || 0)).toFixed(1)} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div 
              className="settings-section reports-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="section-header">
                <h2>Reportes y Análisis</h2>
                <div className="report-controls">
                  <select className="report-period">
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                  </select>
                  <button className="export-btn">
                    <i className="fi fi-rr-download"></i>
                    Exportar Datos
                  </button>
                </div>
              </div>

              <div className="reports-dashboard">
                <div className="report-summary">
                  <h3>Resumen de Métricas</h3>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span className="label">Producción Total</span>
                      <span className="value">{productionMetrics?.data?.totalProduction || '0'} kg</span>
                    </div>
                    <div className="metric-item">
                      <span className="label">Eficiencia Promedio</span>
                      <span className="value">{productionMetrics?.data?.efficiency || '0'}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="label">Tiempo de Actividad</span>
                      <span className="value">{productionMetrics?.data?.uptime || '0'} hrs</span>
                    </div>
                    <div className="metric-item">
                      <span className="label">Tasa de Defectos</span>
                      <span className="value">{qualityMetrics?.data?.defectRate || '0'}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="label">Piezas Producidas</span>
                      <span className="value">{productionMetrics?.data?.totalPieces || '0'}</span>
                    </div>
                    <div className="metric-item">
                      <span className="label">Tiempo Promedio de Ciclo</span>
                      <span className="value">{productionMetrics?.data?.avgCycleTime || '0'} seg</span>
                    </div>
                  </div>
                </div>

                <div className="report-grid">
                  <div className="report-card">
                    <h3>Producción Mensual</h3>
                    <div className="chart-container">
                      <Bar 
                        data={{
                          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                          datasets: [
                            {
                              label: 'Producción (kg)',
                              data: [
                                parseFloat(productionMetrics?.data?.totalProduction || '0') * 0.25,
                                parseFloat(productionMetrics?.data?.totalProduction || '0') * 0.3,
                                parseFloat(productionMetrics?.data?.totalProduction || '0') * 0.25,
                                parseFloat(productionMetrics?.data?.totalProduction || '0') * 0.2
                              ],
                              backgroundColor: [
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(255, 99, 132, 0.8)'
                              ],
                              borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)'
                              ],
                              borderWidth: 2
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top' as const,
                            },
                            title: {
                              display: true,
                              text: 'Distribución de Producción por Semana'
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="report-card">
                    <h3>Eficiencia de Producción</h3>
                    <div className="chart-container">
                      <Line 
                        data={{
                          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                          datasets: [
                            {
                              label: 'Eficiencia (%)',
                              data: [85, 88, 92, 87, 90, 86, 89],
                              borderColor: 'rgb(75, 192, 192)',
                              backgroundColor: 'rgba(75, 192, 192, 0.1)',
                              tension: 0.4,
                              fill: true
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top' as const,
                            },
                            title: {
                              display: true,
                              text: 'Tendencia de Eficiencia Semanal'
                            }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="performance-analysis">
                  <h3>Análisis de Rendimiento</h3>
                  <div className="performance-grid">
                    <div className="performance-card">
                      <h4>Mejor Día</h4>
                      <div className="performance-value">
                        <span className="day">Miércoles</span>
                        <span className="efficiency">92%</span>
                      </div>
                    </div>
                    <div className="performance-card">
                      <h4>Peor Día</h4>
                      <div className="performance-value">
                        <span className="day">Sábado</span>
                        <span className="efficiency">86%</span>
                      </div>
                    </div>
                    <div className="performance-card">
                      <h4>Promedio Semanal</h4>
                      <div className="performance-value">
                        <span className="day">Promedio</span>
                        <span className="efficiency">{productionMetrics?.data?.efficiency || '0'}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div 
              className="settings-section users-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>Gestión de Usuarios</h2>
              <div className="users-management">
                <button 
                  className="add-user-btn"
                  onClick={() => setShowRegisterModal(true)}
                >
                  <i className="fi fi-rr-user-add"></i>
                  Añadir Usuario
                </button>

                <div className="users-list">
                  {usersLoading ? (
                    <div className="loading">Cargando usuarios...</div>
                  ) : usersError ? (
                    <div className="error">Error al cargar usuarios</div>
                  ) : users && Array.isArray(users) && users.length > 0 ? (
                    users.map((user: any) => (
                      <div key={user._id || user.id} className="user-item">
                        <img src={user.avatar || "https://via.placeholder.com/40"} alt={user.username} />
                        <div className="user-info">
                          <h4>{user.username}</h4>
                          <span>{user.email}</span>
                        </div>
                        <div className="user-actions">
                          <button className="edit-btn">Editar</button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user._id || user.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-users">No hay usuarios registrados</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Bloque para el selector de tema */}
          <motion.div 
            className="settings-section theme-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem' }}
          >
            <h2>Modo de Tema</h2>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <label>
                <input
                  type="radio"
                  name="themeMode"
                  value="dark"
                  checked={tempMode === "dark"}
                  onChange={() => handleChangeTheme("dark")}
                />
                Ecoblastic Oscuro
              </label>
              <label>
                <input
                  type="radio"
                  name="themeMode"
                  value="light"
                  checked={tempMode === "light"}
                  onChange={() => handleChangeTheme("light")}
                />
                Ecoblastic Blanco
              </label>
            </div>
          </motion.div>
        </div>
      </div>

      {showRegisterModal && (
        <ModalRegistro onClose={() => setShowRegisterModal(false)} />
      )}
    </motion.div>
  );
};

export default Settings;
