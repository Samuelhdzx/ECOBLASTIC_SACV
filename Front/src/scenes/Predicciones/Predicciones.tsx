import React, { useState } from 'react';
import './Predicciones.css';

// Importamos las imágenes (ajusta las rutas según tu estructura de proyecto)
import gramaje from 'front/public/img/MONITOREO/gramaje.png';
import temperatura from 'front/public/img/MONITOREO/temperatura.png';
import tiempo from 'front/public/img/MONITOREO/tiempo.png';

const Predicciones: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('PET');
  const [selectedParameter, setSelectedParameter] = useState('gramaje');

  // Base de datos con la información de los materiales y parámetros
  const getContent = (material: string, parameter: string) => {
    const content = {
      PET: {
        gramaje: { 
          text: "Densidad: 1.34-1.39 g/cm³", 
          image: gramaje,
          energiaEmpleada: "350-400 kWh/ton",
          eficiencia: "92%"
        },
        temperatura: { 
          text: "Temperatura de fusión: 260°C", 
          image: temperatura,
          rangoDePresion: "80-100 bar",
          tiempoDeEnfriamiento: "8-12s"
        },
        tiempo: { 
          text: "Tiempo de ciclo: 15-30 segundos", 
          image: tiempo,
          presion: "40-60 MPa",
          tasaDeCalidad: "98%"
        }
      },
      POLIPROPILENO: {
        gramaje: { 
          text: "Densidad: 0.90-0.91 g/cm³", 
          image: gramaje,
          energiaEmpleada: "280-320 kWh/ton",
          eficiencia: "95%"
        },
        temperatura: { 
          text: "Temperatura de fusión: 165°C", 
          image: temperatura,
          rangoDePresion: "60-80 bar",
          tiempoDeEnfriamiento: "6-10s"
        },
        tiempo: { 
          text: "Tiempo de ciclo: 10-25 segundos", 
          image: tiempo,
          presion: "30-50 MPa",
          tasaDeCalidad: "97%"
        }
      }
    };
    return content[material as keyof typeof content][parameter as keyof typeof content.PET];
  };

  const currentContent = getContent(selectedMaterial, selectedParameter);

  // Obtener el icono adecuado según el parámetro seleccionado
  const getParameterIcon = () => {
    switch (selectedParameter) {
      case 'gramaje':
        return '⚖️';
      case 'temperatura':
        return '🌡️';
      case 'tiempo':
        return '⏱️';
      default:
        return '📊';
    }
  };
  
  // Obtener el color del gradiente según el material seleccionado
  const getMaterialColor = () => {
    return selectedMaterial === 'PET' ? 
      'from-blue-500 via-indigo-500 to-purple-600' : 
      'from-teal-400 via-cyan-500 to-blue-500';
  };

  // Obtener el color del indicador según el parámetro
  const getParameterColor = () => {
    switch (selectedParameter) {
      case 'gramaje':
        return 'bg-blue-500';
      case 'temperatura':
        return 'bg-red-500';
      case 'tiempo':
        return 'bg-purple-500';
      default:
        return 'bg-indigo-500';
    }
  };

  // Formatear el título de la métrica (convertir camelCase a palabras)
  const formatMetricTitle = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="predicciones-container">
      {/* Encabezado con efecto de glassmorphism */}
      <header className="predicciones-header">
        <h1 className="header-title">Predicciones de Material</h1>
        <p className="header-subtitle">Análisis predictivo para optimización de procesos de inyección</p>
      </header>

      {/* Panel principal */}
      <div className="predicciones-panel">
        {/* Selector de material con efecto neomórfico */}
        <div className="selector-section">
          <h2 className="selector-title">Seleccionar Material</h2>
          <div className="material-selector">
            <button 
              className={`material-btn ${selectedMaterial === 'PET' ? 'selected' : ''}`}
              onClick={() => setSelectedMaterial('PET')}
            >
              <div className="material-icon pet">PET</div>
              <span>Tereftalato de Polietileno</span>
            </button>
            <button 
              className={`material-btn ${selectedMaterial === 'POLIPROPILENO' ? 'selected' : ''}`}
              onClick={() => setSelectedMaterial('POLIPROPILENO')}
            >
              <div className="material-icon pp">PP</div>
              <span>Polipropileno</span>
            </button>
          </div>

          {/* Selector de parámetros */}
          <h2 className="selector-title">Seleccionar Parámetro</h2>
          <div className="parameter-selector">
            <button 
              className={`parameter-btn ${selectedParameter === 'temperatura' ? 'selected' : ''}`}
              onClick={() => setSelectedParameter('temperatura')}
            >
              <span className="parameter-icon">🌡️</span>
              <span>Temperatura</span>
            </button>
            <button 
              className={`parameter-btn ${selectedParameter === 'gramaje' ? 'selected' : ''}`}
              onClick={() => setSelectedParameter('gramaje')}
            >
              <span className="parameter-icon">⚖️</span>
              <span>Gramaje</span>
            </button>
            <button 
              className={`parameter-btn ${selectedParameter === 'tiempo' ? 'selected' : ''}`}
              onClick={() => setSelectedParameter('tiempo')}
            >
              <span className="parameter-icon">⏱️</span>
              <span>Tiempo</span>
            </button>
          </div>
        </div>

        {/* Visualización de datos */}
        <div className="data-visualization">
          {/* Tarjeta de datos principal */}
          <div className="primary-data-card">
            <div className={`data-icon ${getParameterColor()}`}>
              <span>{getParameterIcon()}</span>
            </div>
            <h3 className="primary-data-value">{currentContent.text}</h3>
            <div className={`material-badge ${getMaterialColor()}`}>
              {selectedMaterial}
            </div>
          </div>

          {/* Métricas adicionales */}
          <div className="metrics-container">
            <h3 className="metrics-title">Parámetros Asociados</h3>
            <div className="metrics-grid">
              {Object.entries(currentContent)
                .filter(([key]) => key !== 'text' && key !== 'image')
                .map(([key, value]) => (
                  <div key={key} className="metric-card">
                    <div className="metric-header">
                      <div className="metric-dot"></div>
                      <h4 className="metric-title">{formatMetricTitle(key)}</h4>
                    </div>
                    <div className="metric-value">{value}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="info-banner">
        <div className="info-icon">💡</div>
        <p className="info-text">
          Los valores mostrados son referencias basadas en condiciones óptimas de operación. 
          Ajuste según las especificaciones de su equipo y material.
        </p>
      </div>
    </div>
  );
};

export default Predicciones;