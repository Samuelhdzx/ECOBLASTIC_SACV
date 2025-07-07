// DataEntryForm.tsx
import React, { useState } from 'react';
import { useStartMonitoringMutation } from '@/state/api';
import { useNavigate } from 'react-router-dom';
import './DataEntryForm.css';

interface FormData {
  // Información básica del proceso
  polymerUsage: {
    pet: number;
    polypropylene: number;
  };
  moldUsage: {
    mold1: number;
    mold2: number;
    mold3: number;
  };
  
  // Datos de energía
  potentiometerEnergy: {
    used: number;
    remaining: number;
  };
  injectorEnergy: {
    used: number;
    remaining: number;
  };
  
  // Parámetros de inyección
  injectionPressure: number;
  injectionSpeed: number;
  holdingPressure: number;
  holdingTime: number;
  
  // Parámetros de enfriamiento
  coolingTime: number;
  coolingTemperature: number;
  
  // Control de calidad (se llena al final)
  cycleTime: number;
  partWeight: number;
  partDimensions: {
    length: number;
    width: number;
    height: number;
  };
  qualityStatus: string;
  defects: {
    warping: boolean;
    sinkMarks: boolean;
    flash: boolean;
    shortShot: boolean;
    other: string;
  };
  
  // Información del operador
  operatorName: string;
  shift: string;
  batchNumber: string;
  lotNumber: string;
  
  // Notas y observaciones
  notes: string;
  
  // Estado del proceso
  processStatus: string;
  
  // Tiempo de monitoreo (se calcula automáticamente)
  monitoringStartTime?: Date;
  monitoringEndTime?: Date;
  monitoringDuration?: number; // en segundos
  
  // --- NUEVOS CAMPOS AVANZADOS ---
  materialUsado?: number;
  materialDesperdiciado?: number;
  costoMaterialUsado?: number;
  costoMaterialDesperdiciado?: number;
  tiempoEnfriamiento?: number;
  tiempoOperacionEfectiva?: number;
  numeroAlertasTemperatura?: number;
  tiempoRespuestaAlertas?: number;
  costoTotalPorPieza?: number;
}

const DataEntryForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    polymerUsage: { pet: 0, polypropylene: 0 },
    moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
    potentiometerEnergy: { used: 0, remaining: 100 },
    injectorEnergy: { used: 0, remaining: 100 },
    injectionPressure: 0,
    injectionSpeed: 0,
    holdingPressure: 0,
    holdingTime: 0,
    coolingTime: 0,
    coolingTemperature: 0,
    cycleTime: 0,
    partWeight: 0,
    partDimensions: { length: 0, width: 0, height: 0 },
    qualityStatus: 'bueno',
    defects: { warping: false, sinkMarks: false, flash: false, shortShot: false, other: '' },
    operatorName: '',
    shift: 'mañana',
    batchNumber: '',
    lotNumber: '',
    notes: '',
    processStatus: 'en_proceso',
    materialUsado: 0,
    materialDesperdiciado: 0,
    costoMaterialUsado: 0,
    costoMaterialDesperdiciado: 0,
    tiempoEnfriamiento: 0,
    tiempoOperacionEfectiva: 0,
    numeroAlertasTemperatura: 0,
    tiempoRespuestaAlertas: 0,
    costoTotalPorPieza: 0
  });

  const [startMonitoring] = useStartMonitoringMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const nameParts = name.split('.');
    
    if (nameParts.length === 2) {
      const [category, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof FormData] as object),
          [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                   type === 'number' ? Number(value) : value,
        },
      }));
    } else if (nameParts.length === 3) {
      const [category, subcategory, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof FormData] as object),
          [subcategory]: {
            ...(prev[category as keyof FormData] as any)[subcategory],
            [field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                     type === 'number' ? Number(value) : value,
          },
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
                type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que se haya seleccionado un material
    if (formData.polymerUsage.pet === 0 && formData.polymerUsage.polypropylene === 0) {
      alert('Por favor selecciona un material antes de continuar');
      return;
    }
    
    // Validar que se haya seleccionado un molde
    if (formData.moldUsage.mold1 === 0 && formData.moldUsage.mold2 === 0 && formData.moldUsage.mold3 === 0) {
      alert('Por favor selecciona un molde antes de continuar');
      return;
    }
    
    try {
      // Guardar tiempo de inicio del monitoreo
      const startTime = new Date();
      
      // Preparar datos para enviar
      const dataToSend = {
        ...formData,
        monitoringStartTime: startTime,
        processStatus: 'monitoreando'
      };
      
      console.log('Enviando datos:', dataToSend);
      
      // Guardar datos iniciales y redirigir al dashboard
      const result = await startMonitoring(dataToSend).unwrap();
      
      console.log('Respuesta del servidor:', result);
      
      // Redirigir al dashboard con el ID del proceso para poder finalizarlo
      navigate('/dashboard', { 
        state: { 
          monitoringStartTime: startTime,
          processId: result.data?._id || 'temp-id'
        }
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error al iniciar el monitoreo. Por favor intenta de nuevo.');
    }
  };

  const renderProgressBar = () => (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>
      <div className="progress-steps">
        {['Material', 'Molde', 'Energía', 'Inyección', 'Configuración'].map((stepName, index) => (
          <div 
            key={index} 
            className={`progress-step ${step > index + 1 ? 'completed' : step === index + 1 ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <span className="step-label">{stepName}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Paso 1: Selección del material
  if (step === 1) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>🎯 Selección de Material</h2>
            <p>Selecciona el tipo de polímero que vas a utilizar</p>
          </div>
          <div className="material-selection">
            <div 
              className={`material-card ${formData.polymerUsage.pet === 1 ? 'selected' : ''}`}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  polymerUsage: { pet: 1, polypropylene: 0 },
                }));
                setStep(2);
              }}
            >
              <div className="material-icon">🥤</div>
              <h3>PET (Polietileno Tereftalato)</h3>
              <p>Material transparente, resistente y reciclable</p>
              <div className="material-properties">
                <span>• Temperatura: 250-280°C</span>
                <span>• Presión: 800-1200 bar</span>
                <span>• Tiempo: 15-30 seg</span>
              </div>
            </div>
            <div 
              className={`material-card ${formData.polymerUsage.polypropylene === 1 ? 'selected' : ''}`}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  polymerUsage: { pet: 0, polypropylene: 1 },
                }));
                setStep(2);
              }}
            >
              <div className="material-icon">🔄</div>
              <h3>Polipropileno (PP)</h3>
              <p>Material versátil, resistente al calor y químicos</p>
              <div className="material-properties">
                <span>• Temperatura: 200-250°C</span>
                <span>• Presión: 600-1000 bar</span>
                <span>• Tiempo: 20-40 seg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Selección del molde
  if (step === 2) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>🔧 Selección de Molde</h2>
            <p>Selecciona el molde que vas a utilizar</p>
          </div>
          <div className="mold-selection">
            {[
              { id: 'mold1', name: 'Molde 1', description: 'Molde pequeño - 50g', icon: '🔲' },
              { id: 'mold2', name: 'Molde 2', description: 'Molde mediano - 100g', icon: '🔲' },
              { id: 'mold3', name: 'Molde 3', description: 'Molde grande - 200g', icon: '🔲' }
            ].map((mold) => (
              <div 
                key={mold.id}
                className={`mold-card ${formData.moldUsage[mold.id as keyof typeof formData.moldUsage] === 1 ? 'selected' : ''}`}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    moldUsage: { 
                      mold1: mold.id === 'mold1' ? 1 : 0, 
                      mold2: mold.id === 'mold2' ? 1 : 0, 
                      mold3: mold.id === 'mold3' ? 1 : 0 
                    },
                  }));
                  setStep(3);
                }}
              >
                <div className="mold-icon">{mold.icon}</div>
                <h3>{mold.name}</h3>
                <p>{mold.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Paso 3: Datos de energía
  if (step === 3) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>⚡ Control de Energía</h2>
            <p>Registra los niveles de energía del sistema</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="energy-form">
            <div className="form-grid">
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🔋</span> Energía del Potenciómetro
                </h3>
                <div className="input-group">
                  <label className="input-label">Energía Utilizada (%)</label>
                  <input
                    type="number"
                    name="potentiometerEnergy.used"
                    value={formData.potentiometerEnergy.used}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="100"
                    required
                  />
                  <div className="energy-bar">
                    <div 
                      className="energy-fill" 
                      style={{ width: `${formData.potentiometerEnergy.used}%` }}
                    ></div>
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Energía Restante (%)</label>
                  <input
                    type="number"
                    name="potentiometerEnergy.remaining"
                    value={formData.potentiometerEnergy.remaining}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🔌</span> Energía del Inyector
                </h3>
                <div className="input-group">
                  <label className="input-label">Energía Utilizada (%)</label>
                  <input
                    type="number"
                    name="injectorEnergy.used"
                    value={formData.injectorEnergy.used}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="100"
                    required
                  />
                  <div className="energy-bar">
                    <div 
                      className="energy-fill" 
                      style={{ width: `${formData.injectorEnergy.used}%` }}
                    ></div>
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Energía Restante (%)</label>
                  <input
                    type="number"
                    name="injectorEnergy.remaining"
                    value={formData.injectorEnergy.remaining}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setStep(2)} className="btn-secondary">
                ← Anterior
              </button>
              <button type="submit" className="btn-primary">
                Siguiente →
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Paso 4: Parámetros de inyección
  if (step === 4) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>💉 Parámetros de Inyección</h2>
            <p>Configura los parámetros del proceso de inyección</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(5); }} className="injection-form">
            <div className="form-grid">
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">⏱️</span> Tiempos
                </h3>
                <div className="input-group">
                  <label className="input-label">Tiempo de Mantenimiento (s)</label>
                  <input
                    type="number"
                    name="holdingTime"
                    value={formData.holdingTime}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Tiempo de Enfriamiento (s)</label>
                  <input
                    type="number"
                    name="coolingTime"
                    value={formData.coolingTime}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📊</span> Presiones y Velocidad
                </h3>
                <div className="input-group">
                  <label className="input-label">Presión de Inyección (bar)</label>
                  <input
                    type="number"
                    name="injectionPressure"
                    value={formData.injectionPressure}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="2000"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Presión de Mantenimiento (bar)</label>
                  <input
                    type="number"
                    name="holdingPressure"
                    value={formData.holdingPressure}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="2000"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Velocidad de Inyección (mm/s)</label>
                  <input
                    type="number"
                    name="injectionSpeed"
                    value={formData.injectionSpeed}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="500"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Temperatura de Enfriamiento (°C)</label>
                  <input
                    type="number"
                    name="coolingTemperature"
                    value={formData.coolingTemperature}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setStep(3)} className="btn-secondary">
                ← Anterior
              </button>
              <button type="submit" className="btn-primary">
                Siguiente →
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Paso 5: Configuración final (agregar campos avanzados)
  if (step === 5) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>⚙️ Configuración Final</h2>
            <p>Completa los datos avanzados para el análisis profesional</p>
          </div>
          <form onSubmit={handleSubmit} className="final-form">
            <div className="form-grid">
              {/* Campos avanzados */}
              <div className="input-group">
                <label className="input-label">Material Usado (kg)</label>
                <input type="number" name="materialUsado" value={formData.materialUsado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Material Desperdiciado (kg)</label>
                <input type="number" name="materialDesperdiciado" value={formData.materialDesperdiciado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Costo Material Usado (MXN)</label>
                <input type="number" name="costoMaterialUsado" value={formData.costoMaterialUsado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Costo Material Desperdiciado (MXN)</label>
                <input type="number" name="costoMaterialDesperdiciado" value={formData.costoMaterialDesperdiciado} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Tiempo de Enfriamiento (s)</label>
                <input type="number" name="tiempoEnfriamiento" value={formData.tiempoEnfriamiento} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Tiempo de Operación Efectiva (min)</label>
                <input type="number" name="tiempoOperacionEfectiva" value={formData.tiempoOperacionEfectiva} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Número de Alertas de Temperatura</label>
                <input type="number" name="numeroAlertasTemperatura" value={formData.numeroAlertasTemperatura} onChange={handleInputChange} className="input-field" min="0" step="1" required />
              </div>
              <div className="input-group">
                <label className="input-label">Tiempo de Respuesta ante Alertas (s)</label>
                <input type="number" name="tiempoRespuestaAlertas" value={formData.tiempoRespuestaAlertas} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
              <div className="input-group">
                <label className="input-label">Costo Total por Pieza (MXN)</label>
                <input type="number" name="costoTotalPorPieza" value={formData.costoTotalPorPieza} onChange={handleInputChange} className="input-field" min="0" step="0.01" required />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setStep(4)} className="btn-secondary">
                ← Anterior
              </button>
              <button type="submit" className="btn-primary">
                Finalizar Monitoreo
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default DataEntryForm;
