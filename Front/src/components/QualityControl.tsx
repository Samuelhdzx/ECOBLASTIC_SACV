import React, { useState } from 'react';
import './QualityControl.css';

interface QualityControlProps {
  onComplete: (qualityData: any) => void;
  onBack: () => void;
  monitoringDuration: number;
}

const QualityControl: React.FC<QualityControlProps> = ({ onComplete, onBack, monitoringDuration }) => {
  const [qualityData, setQualityData] = useState({
    cycleTime: 0,
    partWeight: 0,
    partDimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    qualityStatus: 'bueno',
    defects: {
      warping: false,
      sinkMarks: false,
      flash: false,
      shortShot: false,
      other: ''
    },
    additionalNotes: '',
    materialUsado: 0,
    materialDesperdiciado: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      const [category, field] = nameParts;
      setQualityData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof typeof qualityData] as object),
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                   type === 'number' ? Number(value) : value,
        },
      }));
    } else {
      setQualityData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                type === 'number' ? Number(value) : value,
      }));
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(qualityData);
  };

  return (
    <div className="quality-control-container">
      <div className="quality-header">
        <h2>✅ Control de Calidad</h2>
        <p>Evalúa la calidad del producto después del proceso de monitoreo</p>
        <div className="monitoring-time">
          <span className="time-label">⏱️ Tiempo de Monitoreo:</span>
          <span className="time-value">{formatDuration(monitoringDuration)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="quality-form">
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">📏</span> Dimensiones y Peso
            </h3>
            <div className="input-group">
              <label className="input-label">Peso de la Pieza (g)</label>
              <input
                type="number"
                name="partWeight"
                value={qualityData.partWeight}
                onChange={handleInputChange}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>
            <div className="dimensions-grid">
              <div className="input-group">
                <label className="input-label">Longitud (mm)</label>
                <input
                  type="number"
                  name="partDimensions.length"
                  value={qualityData.partDimensions.length}
                  onChange={handleInputChange}
                  className="input-field"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Ancho (mm)</label>
                <input
                  type="number"
                  name="partDimensions.width"
                  value={qualityData.partDimensions.width}
                  onChange={handleInputChange}
                  className="input-field"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Altura (mm)</label>
                <input
                  type="number"
                  name="partDimensions.height"
                  value={qualityData.partDimensions.height}
                  onChange={handleInputChange}
                  className="input-field"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Tiempo de Ciclo Total (s)</label>
              <input
                type="number"
                name="cycleTime"
                value={qualityData.cycleTime}
                onChange={handleInputChange}
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">🔍</span> Estado de Calidad
            </h3>
            <div className="input-group">
              <label className="input-label">Estado de Calidad</label>
              <select
                name="qualityStatus"
                value={qualityData.qualityStatus}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="excelente">Excelente</option>
                <option value="bueno">Bueno</option>
                <option value="regular">Regular</option>
                <option value="defectuoso">Defectuoso</option>
              </select>
            </div>
            <div className="defects-section">
              <h4>Defectos Detectados</h4>
              <div className="defects-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="defects.warping"
                    checked={qualityData.defects.warping}
                    onChange={handleInputChange}
                  />
                  <span>Deformación (Warping)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="defects.sinkMarks"
                    checked={qualityData.defects.sinkMarks}
                    onChange={handleInputChange}
                  />
                  <span>Hundimientos (Sink Marks)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="defects.flash"
                    checked={qualityData.defects.flash}
                    onChange={handleInputChange}
                  />
                  <span>Rebaba (Flash)</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="defects.shortShot"
                    checked={qualityData.defects.shortShot}
                    onChange={handleInputChange}
                  />
                  <span>Inyección Incompleta</span>
                </label>
              </div>
              <div className="input-group">
                <label className="input-label">Otros Defectos</label>
                <input
                  type="text"
                  name="defects.other"
                  value={qualityData.defects.other}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Describe otros defectos..."
                />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3 className="section-title">
              <span className="section-icon">📊</span> Datos Avanzados del Proceso
            </h3>
            <div className="input-group">
              <label className="input-label">Material Usado (kg)</label>
              <input type="number" name="materialUsado" value={qualityData.materialUsado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
            </div>
            <div className="input-group">
              <label className="input-label">Material Desperdiciado (kg)</label>
              <input type="number" name="materialDesperdiciado" value={qualityData.materialDesperdiciado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h3 className="section-title">
            <span className="section-icon">📝</span> Notas Finales
          </h3>
          <div className="input-group">
            <label className="input-label">Observaciones del Proceso</label>
            <textarea
              name="additionalNotes"
              value={qualityData.additionalNotes}
              onChange={handleInputChange}
              className="textarea-field"
              rows={4}
              placeholder="Agrega observaciones sobre la calidad del producto y el proceso..."
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onBack} className="btn-secondary">
            ← Volver al Dashboard
          </button>
          <button type="submit" className="btn-primary">
            <span className="button-icon">✅</span> Completar Proceso
          </button>
        </div>
      </form>
    </div>
  );
};

export default QualityControl; 