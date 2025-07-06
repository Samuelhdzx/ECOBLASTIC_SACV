import React from 'react';
import './ProcessSummary.css';

interface ProcessSummaryProps {
  processData: any;
  onClose: () => void;
}

const ProcessSummary: React.FC<ProcessSummaryProps> = ({ processData, onClose }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getQualityColor = (status: string) => {
    switch (status) {
      case 'excelente': return '#10b981';
      case 'bueno': return '#3b82f6';
      case 'regular': return '#f59e0b';
      case 'defectuoso': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="process-summary-container">
      <div className="summary-content">
        <div className="summary-header">
          <h2>🎉 Proceso Completado</h2>
          <p>Resumen completo del proceso de inyección</p>
          <div className="completion-badge">
            <span className="badge-icon">✅</span>
            <span className="badge-text">Monitoreo Finalizado</span>
          </div>
        </div>

        <div className="summary-grid">
          {/* Información Básica */}
          <div className="summary-section">
            <h3 className="summary-title">
              <span className="summary-icon">🎯</span> Configuración Inicial
            </h3>
            <div className="summary-item">
              <span className="summary-label">Material:</span>
              <span className="summary-value">
                {processData.polymerUsage?.pet === 1 ? 'PET' : 'Polipropileno'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Molde:</span>
              <span className="summary-value">
                {processData.moldUsage?.mold1 === 1 ? 'Molde 1' : 
                 processData.moldUsage?.mold2 === 1 ? 'Molde 2' : 'Molde 3'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Operador:</span>
              <span className="summary-value">{processData.operatorName || 'No especificado'}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Turno:</span>
              <span className="summary-value">{processData.shift}</span>
            </div>
          </div>

          {/* Tiempo de Monitoreo */}
          <div className="summary-section highlight">
            <h3 className="summary-title">
              <span className="summary-icon">⏱️</span> Tiempo de Monitoreo
            </h3>
            <div className="monitoring-time-display">
              <div className="time-circle">
                <span className="time-value">{formatDuration(processData.monitoringDuration || 0)}</span>
                <span className="time-label">Duración Total</span>
              </div>
            </div>
            <div className="time-details">
              <div className="time-detail">
                <span className="detail-label">Inicio:</span>
                <span className="detail-value">
                  {processData.monitoringStartTime ? new Date(processData.monitoringStartTime).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="time-detail">
                <span className="detail-label">Fin:</span>
                <span className="detail-value">
                  {processData.monitoringEndTime ? new Date(processData.monitoringEndTime).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Energía */}
          <div className="summary-section">
            <h3 className="summary-title">
              <span className="summary-icon">⚡</span> Consumo de Energía
            </h3>
            <div className="summary-item">
              <span className="summary-label">Potenciómetro:</span>
              <span className="summary-value">{processData.potentiometerEnergy?.used || 0}% usado</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Inyector:</span>
              <span className="summary-value">{processData.injectorEnergy?.used || 0}% usado</span>
            </div>
          </div>

          {/* Parámetros de Inyección */}
          <div className="summary-section">
            <h3 className="summary-title">
              <span className="summary-icon">💉</span> Parámetros de Inyección
            </h3>
            {processData.injectionPressure > 0 && (
              <div className="summary-item">
                <span className="summary-label">Presión:</span>
                <span className="summary-value">{processData.injectionPressure} bar</span>
              </div>
            )}
            {processData.injectionSpeed > 0 && (
              <div className="summary-item">
                <span className="summary-label">Velocidad:</span>
                <span className="summary-value">{processData.injectionSpeed} mm/s</span>
              </div>
            )}
            {processData.holdingPressure > 0 && (
              <div className="summary-item">
                <span className="summary-label">Presión Mantenimiento:</span>
                <span className="summary-value">{processData.holdingPressure} bar</span>
              </div>
            )}
            {processData.cycleTime > 0 && (
              <div className="summary-item">
                <span className="summary-label">Ciclo Total:</span>
                <span className="summary-value">{processData.cycleTime}s</span>
              </div>
            )}
          </div>

          {/* Control de Calidad */}
          <div className="summary-section">
            <h3 className="summary-title">
              <span className="summary-icon">✅</span> Control de Calidad
            </h3>
            <div className="summary-item">
              <span className="summary-label">Estado:</span>
              <span 
                className="summary-value quality-status"
                style={{ color: getQualityColor(processData.qualityStatus) }}
              >
                {processData.qualityStatus?.charAt(0).toUpperCase() + processData.qualityStatus?.slice(1) || 'No evaluado'}
              </span>
            </div>
            {processData.partWeight > 0 && (
              <div className="summary-item">
                <span className="summary-label">Peso:</span>
                <span className="summary-value">{processData.partWeight}g</span>
              </div>
            )}
            {processData.partDimensions?.length > 0 && (
              <div className="summary-item">
                <span className="summary-label">Dimensiones:</span>
                <span className="summary-value">
                  {processData.partDimensions.length}×{processData.partDimensions.width}×{processData.partDimensions.height} mm
                </span>
              </div>
            )}
          </div>

          {/* Información Adicional */}
          <div className="summary-section">
            <h3 className="summary-title">
              <span className="summary-icon">📝</span> Información Adicional
            </h3>
            {processData.lotNumber && (
              <div className="summary-item">
                <span className="summary-label">Lote:</span>
                <span className="summary-value">{processData.lotNumber}</span>
              </div>
            )}
            {processData.batchNumber && (
              <div className="summary-item">
                <span className="summary-label">Batch:</span>
                <span className="summary-value">{processData.batchNumber}</span>
              </div>
            )}
            {processData.notes && (
              <div className="summary-item">
                <span className="summary-label">Notas:</span>
                <span className="summary-value notes">{processData.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div className="summary-actions">
          <button onClick={onClose} className="btn-primary">
            <span className="button-icon">🏠</span> Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessSummary; 