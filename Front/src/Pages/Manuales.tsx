import React from 'react';
import './Manuales.css';

// Asumimos que los archivos PDF están en las mismas rutas
import manualTecnico from '../../public/pdf/ECOBLASTIC manual (3) (1).pdf';
import manualUsuario from '../../public/pdf/MANUAL INYECTORA.pdf';

const Manuales = () => {
  return (
    <div className="manuales-container">
      {/* Encabezado con efecto de glassmorphism */}
      <header className="manual-header">
        <h1 className="header-title">Guía Técnica de Materiales y Procesos</h1>
        <p className="header-subtitle">Información detallada sobre plásticos, moldes y procedimientos</p>
      </header>

      {/* Sección de información técnica */}
      <div className="info-section">
        {/* Tarjeta de Plásticos */}
        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">🔬</span>
            <h2>Plásticos Utilizados</h2>
          </div>
          <div className="card-content">
            <div className="material-group">
              <h3>PET (Tereftalato de Polietileno)</h3>
              <p>Material versátil con excelentes propiedades:</p>
              <ul className="feature-list">
                <li><span className="feature-highlight">Temperatura de fusión:</span> 260°C</li>
                <li><span className="feature-highlight">Resistencia al impacto:</span> Alta</li>
                <li><span className="feature-highlight">Transparencia:</span> Excepcional</li>
                <li><span className="feature-highlight">Reciclabilidad:</span> 100%</li>
              </ul>
            </div>
            
            <div className="material-group">
              <h3>Polipropileno (PP)</h3>
              <p>Termoplástico de alta resistencia:</p>
              <ul className="feature-list">
                <li><span className="feature-highlight">Temperatura de fusión:</span> 170°C</li>
                <li><span className="feature-highlight">Resistencia química:</span> Excelente</li>
                <li><span className="feature-highlight">Costo de producción:</span> Bajo</li>
                <li><span className="feature-highlight">Durabilidad:</span> Alta</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta de Sistema de Moldes */}
        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">🔧</span>
            <h2>Sistema de Moldes</h2>
          </div>
          <div className="card-content">
            <div className="material-group">
              <h3>Características Principales</h3>
              <ul className="feature-list">
                <li><span className="feature-highlight">Diseño:</span> Modular intercambiable</li>
                <li><span className="feature-highlight">Refrigeración:</span> Sistema optimizado</li>
                <li><span className="feature-highlight">Acabado superficial:</span> Alta calidad</li>
                <li><span className="feature-highlight">Mantenimiento:</span> Preventivo programado</li>
              </ul>
            </div>
            
            <div className="material-group">
              <h3>Especificaciones Técnicas</h3>
              <ul className="feature-list">
                <li><span className="feature-highlight">Presión máxima:</span> 200 MPa</li>
                <li><span className="feature-highlight">Temperatura máxima:</span> 300°C</li>
                <li><span className="feature-highlight">Tiempo de ciclo:</span> 15-45 segundos</li>
                <li><span className="feature-highlight">Vida útil estimada:</span> 100,000 ciclos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tarjeta de Proceso de Inyección */}
        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">⚡</span>
            <h2>Proceso de Inyección</h2>
          </div>
          <div className="card-content">
            <div className="material-group">
              <h3>Parámetros Críticos</h3>
              <ul className="feature-list">
                <li><span className="feature-highlight">Temperatura:</span> Control preciso</li>
                <li><span className="feature-highlight">Presión:</span> Inyección controlada</li>
                <li><span className="feature-highlight">Enfriamiento:</span> Tiempo optimizado</li>
                <li><span className="feature-highlight">Velocidad:</span> Ajustable</li>
              </ul>
            </div>
            
            <div className="material-group">
              <h3>Recomendaciones</h3>
              <ul className="feature-list">
                <li><span className="feature-highlight">Material:</span> Precalentamiento</li>
                <li><span className="feature-highlight">Sistema:</span> Limpieza regular</li>
                <li><span className="feature-highlight">Equipos:</span> Calibración periódica</li>
                <li><span className="feature-highlight">Operación:</span> Monitoreo constante</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de descarga de manuales */}
      <div className="download-container">
        <h2 className="section-title">Manuales Disponibles</h2>
        <p className="section-description">Descarga nuestros manuales completos en formato PDF</p>
        
        <div className="download-cards">
          <a href={manualTecnico} download className="download-card">
            <div className="manual-icon technical">
              <span>📘</span>
            </div>
            <div className="manual-info">
              <h3>Manual Técnico</h3>
              <p>Especificaciones detalladas y guía de mantenimiento exhaustiva para técnicos e ingenieros.</p>
              <button className="download-button">
                <span className="download-icon">↓</span>
                Descargar PDF
              </button>
            </div>
          </a>

          <a href={manualUsuario} download className="download-card">
            <div className="manual-icon user">
              <span>📗</span>
            </div>
            <div className="manual-info">
              <h3>Manual de Usuario</h3>
              <p>Guía completa de operación, solución de problemas y mejores prácticas para operadores.</p>
              <button className="download-button">
                <span className="download-icon">↓</span>
                Descargar PDF
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Manuales;