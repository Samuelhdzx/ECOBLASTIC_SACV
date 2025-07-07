import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetTemperaturesQuery } from '../state/api';
import './Reports.css';

// Iconos SVG (para no depender de librerías externas)
const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Definición de tipos
interface MetricData {
  name: string;
  value: number;
}

interface TemperatureRecord {
  temperature: number;
  injectionTime: number;
  createdAt: string;
}

interface DetailRecord {
  date: string;
  temperature: string;
  injectionTime: string;
  status: 'success' | 'warning' | 'danger';
  statusText: string;
}

interface DistributionData {
  name: string;
  value: number;
  color: string;
}

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const [showFilters, setShowFilters] = useState(false);
  const { refetch } = useGetTemperaturesQuery(undefined, {
    pollingInterval: 3000, // Actualizar cada 3 segundos
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    console.log('Current temperature data:', temperatureData);
  }, [temperatureData]);

  const getTemperatureStatus = (temp: number): 'success' | 'warning' | 'danger' => {
    if (temp < 150) return 'success';
    if (temp < 180) return 'warning';
    return 'danger';
  };

  const getStatusText = (temp: number): string => {
    if (temp < 150) return 'Óptimo';
    if (temp < 180) return 'Precaución';
    return 'Crítico';
  };

  // Función para procesar los datos en registros detallados
  const processDetailedRecords = (): DetailRecord[] => {
    if (!temperatureData || !Array.isArray(temperatureData) || temperatureData.length === 0) {
      console.log('No hay datos para procesar');
      return [];
    }

    return temperatureData.map(record => {
      const temp = Number(record.temperature);
      const time = Number(record.injectionTime);
      const date = new Date(record.createdAt);

      console.log('Procesando registro:', { temp, time, date });

      return {
        date: date.toLocaleString(),
        temperature: `${temp.toFixed(1)}°C`,
        injectionTime: `${time.toFixed(2)}s`,
        status: getTemperatureStatus(temp),
        statusText: getStatusText(temp)
      };
    });
  };

  // Agregar un mensaje de estado cuando no hay datos
  const NoDataMessage = () => (
    <div className="no-data-message">
      <p>
        {error 
          ? `Error al cargar datos: ${error instanceof Error ? error.message : 'Error desconocido'}`
          : 'No hay datos disponibles en este momento'}
      </p>
      {error && (
        <button 
          onClick={() => useGetTemperaturesQuery.initiate(undefined)} 
          className="retry-button"
        >
          Reintentar
        </button>
      )}
    </div>
  );

  return (
    <motion.div 
      className="reports-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loader"></div>
            <p>Cargando datos...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Header Section */}
          <header className="reports-header">
            <div className="header-left">
              <h1>Panel de Reportes</h1>
              <p className="subtitle">Datos de Temperatura</p>
            </div>
            <div className="reports-actions">
              <div className="date-selector-container">
                <CalendarIcon />
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="date-selector"
                >
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mes</option>
                  <option value="quarter">Este Trimestre</option>
                  <option value="year">Este Año</option>
                </select>
              </div>
              
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon />
                Filtros
              </button>
              
              <button className="export-btn">
                <DownloadIcon />
                Exportar PDF
              </button>
            </div>
          </header>

          {!isLoading && temperatureData.length === 0 && <NoDataMessage />}

          {!isLoading && temperatureData.length > 0 && (
            <>
              {/* Gráfica de temperatura */}
              <motion.div 
                className="chart-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="createdAt" 
                      tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} 
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(label) => new Date(label).toLocaleString()}
                      formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temperatura']}
                    />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Tabla de registros */}
              <motion.div 
                className="reports-table"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="table-header">
                  <h3>Registro Detallado</h3>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Temperatura</th>
                        <th>Tiempo de Inyección</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processDetailedRecords().map((record, index) => (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>{record.temperature}</td>
                          <td>{record.injectionTime}</td>
                          <td>
                            <span className={`status-badge ${record.status}`}>
                              {record.statusText}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Reports;