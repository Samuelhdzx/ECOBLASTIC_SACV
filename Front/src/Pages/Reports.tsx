import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './reports.css';

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

interface DetailRecord {
  date: string;
  production: string;
  efficiency: string;
  energy: string;
  status: 'success' | 'warning' | 'danger';
  statusText: string;
}

interface DistributionData {
  name: string;
  value: number;
  color: string;
}

const Reports: React.FC = () => {
  // Estados
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('production');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedChart, setSelectedChart] = useState('line');
  
  // Datos de ejemplo - producción
  const productionData: MetricData[] = [
    { name: 'Lun', value: 400 },
    { name: 'Mar', value: 300 },
    { name: 'Mie', value: 500 },
    { name: 'Jue', value: 280 },
    { name: 'Vie', value: 590 },
    { name: 'Sab', value: 320 },
    { name: 'Dom', value: 250 }
  ];
  
  // Datos de ejemplo - energía
  const energyData: MetricData[] = [
    { name: 'Lun', value: 190 },
    { name: 'Mar', value: 210 },
    { name: 'Mie', value: 300 },
    { name: 'Jue', value: 250 },
    { name: 'Vie', value: 380 },
    { name: 'Sab', value: 240 },
    { name: 'Dom', value: 160 }
  ];
  
  // Datos de ejemplo - distribución
  const distributionData: DistributionData[] = [
    { name: 'Plástico PET', value: 45, color: '#9A48FD' },
    { name: 'Plástico HDPE', value: 25, color: '#14B8A6' },
    { name: 'Plástico PP', value: 20, color: '#FBBF24' },
    { name: 'Otros', value: 10, color: '#EF4444' }
  ];
  
  // Datos de ejemplo - registros detallados
  const detailedRecords: DetailRecord[] = [
    {
      date: '2024-01-15',
      production: '450 unidades',
      efficiency: '96%',
      energy: '280 kWh',
      status: 'success',
      statusText: 'Óptimo'
    },
    {
      date: '2024-01-14',
      production: '425 unidades',
      efficiency: '94%',
      energy: '275 kWh',
      status: 'success',
      statusText: 'Óptimo'
    },
    {
      date: '2024-01-13',
      production: '440 unidades',
      efficiency: '95%',
      energy: '278 kWh',
      status: 'success',
      statusText: 'Óptimo'
    },
    {
      date: '2024-01-12',
      production: '380 unidades',
      efficiency: '87%',
      energy: '290 kWh',
      status: 'warning',
      statusText: 'Revisión'
    },
    {
      date: '2024-01-11',
      production: '320 unidades',
      efficiency: '78%',
      energy: '300 kWh',
      status: 'danger',
      statusText: 'Atención'
    }
  ];

  // Simula carga de datos
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simula carga de datos
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };
    
    loadData();
  }, [dateRange, reportType]);

  // Función para generar PDF
  const generatePDF = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const doc = new jsPDF();
      
      // Título del reporte
      doc.setFontSize(20);
      doc.text('Reporte de Producción ECOBLASTIC', 20, 20);
      
      // Información del reporte
      doc.setFontSize(12);
      doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 20, 30);
      doc.text(`Período: ${getDateRangeText()}`, 20, 40);
      
      // Métricas principales
      doc.setFontSize(14);
      doc.text('Métricas Principales', 20, 55);
      doc.setFontSize(12);
      doc.text('Producción Total: 2,840', 20, 65);
      doc.text('Eficiencia: 95.8%', 20, 75);
      doc.text('Tiempo Activo: 168h', 20, 85);
      doc.text('Alertas: 12', 20, 95);
  
      // Tabla de producción
      const tableData = productionData.map(item => [
        item.name,
        item.value.toString(),
        '95%',
        'Óptimo'
      ]);
  
      doc.autoTable({
        head: [['Día', 'Producción', 'Eficiencia', 'Estado']],
        body: tableData,
        startY: 110,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [154, 72, 253] }
      });
      
      // Guardar el PDF
      doc.save('reporte-ecoblastic.pdf');
      setIsLoading(false);
    }, 1000);
  };
  
  // Obtiene texto descriptivo del rango de fechas seleccionado
  const getDateRangeText = () => {
    switch(dateRange) {
      case 'week': return 'Esta Semana (15 Abr - 21 Abr 2025)';
      case 'month': return 'Este Mes (Abril 2025)';
      case 'quarter': return 'Este Trimestre (Q2 2025)';
      case 'year': return 'Este Año (2025)';
      default: return 'Personalizado';
    }
  };
  
  // Maneja el cambio de rango de fechas
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setDateRange(e.target.value);
    // Simulación de carga
    setTimeout(() => setIsLoading(false), 800);
  };
  
  // Maneja el cambio de tipo de informe
  const handleReportTypeChange = (type: string) => {
    setIsLoading(true);
    setReportType(type);
    // Simulación de carga
    setTimeout(() => setIsLoading(false), 800);
  };
  
  // Calcula el total del valor de producción
  const totalProduction = productionData.reduce((sum, item) => sum + item.value, 0);
  
  // Calcula el color de la barra según el valor (para el gráfico de barras)
  const getBarColor = (value: number) => {
    if (value >= 500) return 'url(#barGradientHigh)';
    if (value >= 300) return 'url(#barGradientMedium)';
    return 'url(#barGradientLow)';
  };
  
  // Renderiza el gráfico seleccionado (línea, área o barras)
  const renderSelectedChart = () => {
    switch(selectedChart) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9A48FD" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9A48FD" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(37, 39, 50, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#9A48FD" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#areaGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <defs>
                <linearGradient id="barGradientHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9A48FD" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#6925B9" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="barGradientMedium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0D9488" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="barGradientLow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#D97706" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(37, 39, 50, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {productionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9A48FD" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(37, 39, 50, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="url(#lineGradient)" 
                strokeWidth={3}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#14B8A6' }}
                dot={{ r: 4, strokeWidth: 0, fill: '#9A48FD' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

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

      {/* Header Section */}
      <header className="reports-header">
        <div className="header-left">
          <h1>Panel de Reportes</h1>
          <p className="subtitle">{getDateRangeText()}</p>
        </div>
        <div className="reports-actions">
          <div className="date-selector-container">
            <CalendarIcon />
            <select 
              value={dateRange} 
              onChange={handleDateRangeChange}
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
          
          <button className="export-btn" onClick={generatePDF}>
            <DownloadIcon />
            Exportar PDF
          </button>
        </div>
      </header>
      
      {/* Filters Section - Collapsible */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="filters-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-group">
              <h3>Tipo de Reporte</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${reportType === 'production' ? 'active' : ''}`}
                  onClick={() => handleReportTypeChange('production')}
                >Producción</button>
                <button 
                  className={`filter-option ${reportType === 'efficiency' ? 'active' : ''}`}
                  onClick={() => handleReportTypeChange('efficiency')}
                >Eficiencia</button>
                <button 
                  className={`filter-option ${reportType === 'energy' ? 'active' : ''}`}
                  onClick={() => handleReportTypeChange('energy')}
                >Energía</button>
                <button 
                  className={`filter-option ${reportType === 'alerts' ? 'active' : ''}`}
                  onClick={() => handleReportTypeChange('alerts')}
                >Alertas</button>
              </div>
            </div>
            
            <div className="filter-group">
              <h3>Tipo de Gráfico</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${selectedChart === 'line' ? 'active' : ''}`}
                  onClick={() => setSelectedChart('line')}
                >Líneas</button>
                <button 
                  className={`filter-option ${selectedChart === 'bar' ? 'active' : ''}`}
                  onClick={() => setSelectedChart('bar')}
                >Barras</button>
                <button 
                  className={`filter-option ${selectedChart === 'area' ? 'active' : ''}`}
                  onClick={() => setSelectedChart('area')}
                >Área</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Summary Cards */}
      <div className="metrics-grid">
        <motion.div 
          className="metric-card"
          whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="metric-icon production-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 14H14V21H21V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14H3V21H10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3H14V10H21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 3H3V10H10V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Producción Total</h3>
          <p className="metric-value">2,840</p>
          <div className="metric-footer">
            <span className="metric-trend positive">↑ 12.5%</span>
            <span className="metric-period">vs semana anterior</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="metric-card"
          whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="metric-icon efficiency-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6L12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Eficiencia</h3>
          <p className="metric-value">95.8%</p>
          <div className="metric-footer">
            <span className="metric-trend positive">↑ 3.2%</span>
            <span className="metric-period">vs semana anterior</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="metric-card"
          whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="metric-icon time-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Tiempo Activo</h3>
          <p className="metric-value">168h</p>
          <div className="metric-footer">
            <span className="metric-trend neutral">→ 0%</span>
            <span className="metric-period">sin cambios</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="metric-card"
          whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="metric-icon alert-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Alertas</h3>
          <p className="metric-value">12</p>
          <div className="metric-footer">
            <span className="metric-trend negative">↓ 25%</span>
            <span className="metric-period">vs semana anterior</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <motion.div 
          className="chart-container"
          whileHover={{ 
            y: -5, 
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="chart-header">
            <h3>Tendencia de Producción</h3>
            <div className="chart-actions">
              <button 
                className={`chart-action-btn ${selectedChart === 'line' ? 'active' : ''}`} 
                onClick={() => setSelectedChart('line')}
                title="Ver gráfico de líneas"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L8.5 7L13 10.5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 20L8.5 15L13 18.5L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`chart-action-btn ${selectedChart === 'bar' ? 'active' : ''}`} 
                onClick={() => setSelectedChart('bar')}
                title="Ver gráfico de barras"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`chart-action-btn ${selectedChart === 'area' ? 'active' : ''}`} 
                onClick={() => setSelectedChart('area')}
                title="Ver gráfico de área"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18L7 13L11 15L21 7V18H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 7L11 15L7 13L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          {renderSelectedChart()}
        </motion.div>

        <motion.div 
          className="chart-container"
          whileHover={{ 
            y: -5, 
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="chart-header">
            <h3>Consumo Energético</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#9A48FD' }}></span>
                <span>Consumo kWh</span>
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={energyData}>
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#0D9488" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
              <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(37, 39, 50, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              <Bar dataKey="value" fill="url(#energyGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        <motion.div 
          className="chart-container distribution-chart"
          whileHover={{ 
            y: -5, 
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="chart-header">
            <h3>Distribución de Producción</h3>
          </div>
          <div className="chart-with-legend">
            <div className="pie-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(37, 39, 50, 0.95)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                    formatter={(value) => [`${value}%`, 'Porcentaje']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="distribution-legend">
              {distributionData.map((item, index) => (
                <div className="legend-row" key={index}>
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <div className="legend-label">{item.name}</div>
                  <div className="legend-value">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="chart-container productivity-trends"
          whileHover={{ 
            y: -5, 
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="chart-header">
            <h3>Indicadores Clave</h3>
          </div>
          <div className="kpi-container">
            <div className="kpi-item">
              <div className="kpi-icon success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="kpi-info">
                <h4>Productividad</h4>
                <div className="kpi-value-container">
                  <span className="kpi-value">27.4</span>
                  <span className="kpi-unit">unid/hora</span>
                </div>
                <div className="kpi-progress-bar">
                  <div className="kpi-progress" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="kpi-item">
              <div className="kpi-icon warning-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="kpi-info">
                <h4>Tiempo de Ciclo</h4>
                <div className="kpi-value-container">
                  <span className="kpi-value">2.2</span>
                  <span className="kpi-unit">min/unidad</span>
                </div>
                <div className="kpi-progress-bar">
                  <div className="kpi-progress" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="kpi-item">
              <div className="kpi-icon danger-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="kpi-info">
                <h4>Tasa de Rechazo</h4>
                <div className="kpi-value-container">
                  <span className="kpi-value">3.8</span>
                  <span className="kpi-unit">%</span>
                </div>
                <div className="kpi-progress-bar">
                  <div className="kpi-progress" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="kpi-item">
              <div className="kpi-icon info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H7L10 20L14 4L17 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="kpi-info">
                <h4>OEE</h4>
                <div className="kpi-value-container">
                  <span className="kpi-value">92.5</span>
                  <span className="kpi-unit">%</span>
                </div>
                <div className="kpi-progress-bar">
                  <div className="kpi-progress" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Records Table */}
      <motion.div 
        className="reports-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="table-header">
          <h3>Registro Detallado</h3>
          <div className="table-actions">
            <button className="table-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filtrar
            </button>
            <button className="table-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Exportar
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producción</th>
                <th>Eficiencia</th>
                <th>Energía</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detailedRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.production}</td>
                  <td>{record.efficiency}</td>
                  <td>{record.energy}</td>
                  <td>
                    <span className={`status-badge ${record.status}`}>
                      {record.statusText}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-button" title="Ver detalles">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="icon-button" title="Editar registro">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="pagination">
            <button className="pagination-btn" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-separator">...</span>
            <button className="pagination-btn">10</button>
            <button className="pagination-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="items-per-page">
            <span>Mostrar</span>
            <select>
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>por página</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;