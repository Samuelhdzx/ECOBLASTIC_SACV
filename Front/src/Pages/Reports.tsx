import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './reports.css';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('production');

  // Datos de ejemplo
  const productionData = [
    { name: 'Lun', value: 400 },
    { name: 'Mar', value: 300 },
    { name: 'Mie', value: 500 },
    { name: 'Jue', value: 280 },
    { name: 'Vie', value: 590 },
    { name: 'Sab', value: 320 },
    { name: 'Dom', value: 250 }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Título del reporte
    doc.setFontSize(20);
    doc.text('Reporte de Producción ECOBLASTIC', 20, 20);
    
    // Información del reporte
    doc.setFontSize(12);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Período: ${dateRange}`, 20, 40);
    
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
      headStyles: { fillColor: [99, 102, 241] }
    });
    
    // Guardar el PDF
    doc.save('reporte-ecoblastic.pdf');
  };

  return (
    <motion.div 
      className="reports-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="reports-header">
        <h1>Panel de Reportes</h1>
        <div className="reports-actions">
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
          <button className="export-btn" onClick={generatePDF}>
            <i className="fi fi-rr-download"></i>
            Exportar PDF
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Producción Total</h3>
          <p className="metric-value">2,840</p>
          <span className="metric-trend positive">↑ 12.5%</span>
        </div>
        <div className="metric-card">
          <h3>Eficiencia</h3>
          <p className="metric-value">95.8%</p>
          <span className="metric-trend positive">↑ 3.2%</span>
        </div>
        <div className="metric-card">
          <h3>Tiempo Activo</h3>
          <p className="metric-value">168h</p>
          <span className="metric-trend neutral">→ 0%</span>
        </div>
        <div className="metric-card">
          <h3>Alertas</h3>
          <p className="metric-value">12</p>
          <span className="metric-trend negative">↓ 25%</span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Tendencia de Producción</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Consumo Energético</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="reports-table">
        <h3>Registro Detallado</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producción</th>
              <th>Eficiencia</th>
              <th>Energía</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01-15</td>
              <td>450 unidades</td>
              <td>96%</td>
              <td>280 kWh</td>
              <td><span className="status-badge success">Óptimo</span></td>
            </tr>
            <tr>
              <td>2024-01-14</td>
              <td>425 unidades</td>
              <td>94%</td>
              <td>275 kWh</td>
              <td><span className="status-badge success">Óptimo</span></td>
            </tr>
            <tr>
              <td>2024-01-13</td>
              <td>440 unidades</td>
              <td>95%</td>
              <td>278 kWh</td>
              <td><span className="status-badge success">Óptimo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Reports;
