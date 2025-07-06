import React from 'react';
import './ProcessStats.css';

interface ProcessStatsProps {
  currentTemperature: number;
  targetTemperature: number;
  injectionPressure: number;
  cycleTime: number;
  efficiency: number;
  qualityScore: number;
  isRunning: boolean;
}

const ProcessStats: React.FC<ProcessStatsProps> = ({
  currentTemperature,
  targetTemperature,
  injectionPressure,
  cycleTime,
  efficiency,
  qualityScore,
  isRunning
}) => {
  const getTemperatureStatus = () => {
    const diff = Math.abs(currentTemperature - targetTemperature);
    if (diff <= 5) return 'optimal';
    if (diff <= 10) return 'warning';
    return 'critical';
  };

  const getEfficiencyColor = () => {
    if (efficiency >= 90) return '#10b981';
    if (efficiency >= 75) return '#f59e0b';
    return '#ef4444';
  };

  const getQualityColor = () => {
    if (qualityScore >= 95) return '#10b981';
    if (qualityScore >= 85) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="process-stats">
      <div className="stats-header">
        <h3>📊 Estadísticas del Proceso</h3>
        <div className={`status-indicator ${isRunning ? 'running' : 'stopped'}`}>
          <div className="status-dot"></div>
          <span>{isRunning ? 'En Proceso' : 'Detenido'}</span>
        </div>
      </div>

      <div className="stats-grid">
        {/* Temperatura */}
        <div className="stat-card temperature">
          <div className="stat-header">
            <span className="stat-icon">🌡️</span>
            <span className="stat-title">Temperatura</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">
              <span className="current">{currentTemperature}°C</span>
              <span className="target">/ {targetTemperature}°C</span>
            </div>
            <div className={`temperature-bar ${getTemperatureStatus()}`}>
              <div 
                className="temperature-fill" 
                style={{ 
                  width: `${Math.min((currentTemperature / targetTemperature) * 100, 100)}%` 
                }}
              ></div>
            </div>
            <div className="stat-status">
              {getTemperatureStatus() === 'optimal' && '✅ Óptima'}
              {getTemperatureStatus() === 'warning' && '⚠️ Atención'}
              {getTemperatureStatus() === 'critical' && '🚨 Crítica'}
            </div>
          </div>
        </div>

        {/* Presión de Inyección */}
        <div className="stat-card pressure">
          <div className="stat-header">
            <span className="stat-icon">💉</span>
            <span className="stat-title">Presión</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">
              <span className="current">{injectionPressure}</span>
              <span className="unit"> bar</span>
            </div>
            <div className="pressure-gauge">
              <div className="gauge-background">
                <div 
                  className="gauge-fill" 
                  style={{ 
                    width: `${Math.min((injectionPressure / 1500) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <div className="gauge-labels">
                <span>0</span>
                <span>1500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiempo de Ciclo */}
        <div className="stat-card cycle">
          <div className="stat-header">
            <span className="stat-icon">⏱️</span>
            <span className="stat-title">Ciclo</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">
              <span className="current">{cycleTime}</span>
              <span className="unit">s</span>
            </div>
            <div className="cycle-timer">
              <div className="timer-circle">
                <svg className="timer-svg" viewBox="0 0 36 36">
                  <path
                    className="timer-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="timer-fill"
                    strokeDasharray={`${(cycleTime / 60) * 100}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="timer-text">{cycleTime}s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Eficiencia */}
        <div className="stat-card efficiency">
          <div className="stat-header">
            <span className="stat-icon">⚡</span>
            <span className="stat-title">Eficiencia</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">
              <span className="current" style={{ color: getEfficiencyColor() }}>
                {efficiency}%
              </span>
            </div>
            <div className="efficiency-bar">
              <div 
                className="efficiency-fill" 
                style={{ 
                  width: `${efficiency}%`,
                  backgroundColor: getEfficiencyColor()
                }}
              ></div>
            </div>
            <div className="stat-status">
              {efficiency >= 90 && '🎯 Excelente'}
              {efficiency >= 75 && efficiency < 90 && '👍 Buena'}
              {efficiency < 75 && '📉 Mejorar'}
            </div>
          </div>
        </div>

        {/* Calidad */}
        <div className="stat-card quality">
          <div className="stat-header">
            <span className="stat-icon">✅</span>
            <span className="stat-title">Calidad</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">
              <span className="current" style={{ color: getQualityColor() }}>
                {qualityScore}%
              </span>
            </div>
            <div className="quality-indicator">
              <div className="quality-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${qualityScore >= star * 20 ? 'filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="stat-status">
              {qualityScore >= 95 && '🏆 Premium'}
              {qualityScore >= 85 && qualityScore < 95 && '✨ Alta'}
              {qualityScore < 85 && '🔧 Revisar'}
            </div>
          </div>
        </div>

        {/* Estado General */}
        <div className="stat-card overall">
          <div className="stat-header">
            <span className="stat-icon">📈</span>
            <span className="stat-title">Estado General</span>
          </div>
          <div className="stat-content">
            <div className="overall-score">
              <div className="score-circle">
                <span className="score-value">
                  {Math.round((efficiency + qualityScore) / 2)}%
                </span>
              </div>
            </div>
            <div className="overall-status">
              {Math.round((efficiency + qualityScore) / 2) >= 90 && '🟢 Óptimo'}
              {Math.round((efficiency + qualityScore) / 2) >= 75 && Math.round((efficiency + qualityScore) / 2) < 90 && '🟡 Bueno'}
              {Math.round((efficiency + qualityScore) / 2) < 75 && '🔴 Requiere Atención'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStats; 