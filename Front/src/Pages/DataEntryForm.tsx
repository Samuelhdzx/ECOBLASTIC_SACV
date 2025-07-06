// DataEntryForm.tsx
import React, { useState } from 'react';
import { useAddSensorDataMutation } from '@/state/api';
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
  
  // Parámetros de temperatura
  temperature: number;
  temperatureZone1: number;
  temperatureZone2: number;
  temperatureZone3: number;
  
  // Parámetros de inyección
  injectionTime: number;
  injectionPressure: number;
  injectionSpeed: number;
  holdingPressure: number;
  holdingTime: number;
  
  // Parámetros de enfriamiento
  coolingTime: number;
  coolingTemperature: number;
  
  // Control de calidad
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
}

const DataEntryForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    polymerUsage: { pet: 0, polypropylene: 0 },
    moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
    potentiometerEnergy: { used: 0, remaining: 100 },
    injectorEnergy: { used: 0, remaining: 100 },
    temperature: 0,
    temperatureZone1: 0,
    temperatureZone2: 0,
    temperatureZone3: 0,
    injectionTime: 0,
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
    processStatus: 'en_proceso'
  });

  const [addSensorData] = useAddSensorDataMutation();

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
    try {
      await addSensorData(formData).unwrap();
      setFormData({
        polymerUsage: { pet: 0, polypropylene: 0 },
        moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
        potentiometerEnergy: { used: 0, remaining: 100 },
        injectorEnergy: { used: 0, remaining: 100 },
        temperature: 0,
        temperatureZone1: 0,
        temperatureZone2: 0,
        temperatureZone3: 0,
        injectionTime: 0,
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
        processStatus: 'en_proceso'
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const renderProgressBar = () => (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(step / 7) * 100}%` }}
        ></div>
      </div>
      <div className="progress-steps">
        {['Material', 'Molde', 'Energía', 'Temperatura', 'Inyección', 'Calidad', 'Resumen'].map((stepName, index) => (
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

  // Paso 4: Parámetros de temperatura
  if (step === 4) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>🌡️ Control de Temperatura</h2>
            <p>Registra las temperaturas del sistema</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(5); }} className="temperature-form">
            <div className="form-grid">
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🔥</span> Temperatura General
                </h3>
                <div className="input-group">
                  <label className="input-label">Temperatura Principal (°C)</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="500"
                    required
                  />
                </div>
              </div>
              
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">🌡️</span> Zonas de Temperatura
                </h3>
                <div className="input-group">
                  <label className="input-label">Zona 1 (°C)</label>
                  <input
                    type="number"
                    name="temperatureZone1"
                    value={formData.temperatureZone1}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="500"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Zona 2 (°C)</label>
                  <input
                    type="number"
                    name="temperatureZone2"
                    value={formData.temperatureZone2}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="500"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Zona 3 (°C)</label>
                  <input
                    type="number"
                    name="temperatureZone3"
                    value={formData.temperatureZone3}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    max="500"
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

  // Paso 5: Parámetros de inyección
  if (step === 5) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>💉 Parámetros de Inyección</h2>
            <p>Configura los parámetros del proceso de inyección</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(6); }} className="injection-form">
            <div className="form-grid">
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">⏱️</span> Tiempos
                </h3>
                <div className="input-group">
                  <label className="input-label">Tiempo de Inyección (s)</label>
                  <input
                    type="number"
                    name="injectionTime"
                    value={formData.injectionTime}
                    onChange={handleInputChange}
                    className="input-field"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
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
                <div className="input-group">
                  <label className="input-label">Tiempo de Ciclo Total (s)</label>
                  <input
                    type="number"
                    name="cycleTime"
                    value={formData.cycleTime}
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
              <button type="button" onClick={() => setStep(4)} className="btn-secondary">
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

  // Paso 6: Control de calidad y información adicional
  if (step === 6) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>✅ Control de Calidad</h2>
            <p>Registra información de calidad y datos adicionales</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setStep(7); }} className="quality-form">
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
                    value={formData.partWeight}
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
                      value={formData.partDimensions.length}
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
                      value={formData.partDimensions.width}
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
                      value={formData.partDimensions.height}
                      onChange={handleInputChange}
                      className="input-field"
                      min="0"
                      step="0.1"
                    />
                  </div>
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
                    value={formData.qualityStatus}
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
                        checked={formData.defects.warping}
                        onChange={handleInputChange}
                      />
                      <span>Deformación (Warping)</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="defects.sinkMarks"
                        checked={formData.defects.sinkMarks}
                        onChange={handleInputChange}
                      />
                      <span>Hundimientos (Sink Marks)</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="defects.flash"
                        checked={formData.defects.flash}
                        onChange={handleInputChange}
                      />
                      <span>Rebaba (Flash)</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="defects.shortShot"
                        checked={formData.defects.shortShot}
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
                      value={formData.defects.other}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Describe otros defectos..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">
                <span className="section-icon">👤</span> Información del Operador
              </h3>
              <div className="operator-grid">
                <div className="input-group">
                  <label className="input-label">Nombre del Operador</label>
                  <input
                    type="text"
                    name="operatorName"
                    value={formData.operatorName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Turno</label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Número de Lote</label>
                  <input
                    type="text"
                    name="lotNumber"
                    value={formData.lotNumber}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: LOT-2024-001"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Número de Batch</label>
                  <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Ej: BATCH-001"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">
                <span className="section-icon">📝</span> Notas y Observaciones
              </h3>
              <div className="input-group">
                <label className="input-label">Notas Adicionales</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="textarea-field"
                  rows={4}
                  placeholder="Agrega cualquier observación importante sobre el proceso..."
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setStep(5)} className="btn-secondary">
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

  // Paso 7: Resumen final
  if (step === 7) {
    return (
      <div className="form-container">
        {renderProgressBar()}
        <div className="step-content">
          <div className="step-header">
            <h2>📋 Resumen del Proceso</h2>
            <p>Revisa todos los datos antes de enviar</p>
          </div>
          
          <div className="summary-container">
            <div className="summary-grid">
              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">🎯</span> Configuración Básica
                </h3>
                <div className="summary-item">
                  <span className="summary-label">Material:</span>
                  <span className="summary-value">
                    {formData.polymerUsage.pet === 1 ? 'PET' : 'Polipropileno'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Molde:</span>
                  <span className="summary-value">
                    {formData.moldUsage.mold1 === 1 ? 'Molde 1' : 
                     formData.moldUsage.mold2 === 1 ? 'Molde 2' : 'Molde 3'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Operador:</span>
                  <span className="summary-value">{formData.operatorName || 'No especificado'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Turno:</span>
                  <span className="summary-value">{formData.shift}</span>
                </div>
              </div>

              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">⚡</span> Energía
                </h3>
                <div className="summary-item">
                  <span className="summary-label">Potenciómetro:</span>
                  <span className="summary-value">{formData.potentiometerEnergy.used}% usado</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Inyector:</span>
                  <span className="summary-value">{formData.injectorEnergy.used}% usado</span>
                </div>
              </div>

              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">🌡️</span> Temperatura
                </h3>
                <div className="summary-item">
                  <span className="summary-label">Principal:</span>
                  <span className="summary-value">{formData.temperature}°C</span>
                </div>
                {formData.temperatureZone1 > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Zona 1:</span>
                    <span className="summary-value">{formData.temperatureZone1}°C</span>
                  </div>
                )}
                {formData.temperatureZone2 > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Zona 2:</span>
                    <span className="summary-value">{formData.temperatureZone2}°C</span>
                  </div>
                )}
                {formData.temperatureZone3 > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Zona 3:</span>
                    <span className="summary-value">{formData.temperatureZone3}°C</span>
                  </div>
                )}
              </div>

              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">💉</span> Inyección
                </h3>
                <div className="summary-item">
                  <span className="summary-label">Tiempo:</span>
                  <span className="summary-value">{formData.injectionTime}s</span>
                </div>
                {formData.injectionPressure > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Presión:</span>
                    <span className="summary-value">{formData.injectionPressure} bar</span>
                  </div>
                )}
                {formData.injectionSpeed > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Velocidad:</span>
                    <span className="summary-value">{formData.injectionSpeed} mm/s</span>
                  </div>
                )}
                {formData.cycleTime > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Ciclo Total:</span>
                    <span className="summary-value">{formData.cycleTime}s</span>
                  </div>
                )}
              </div>

              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">✅</span> Calidad
                </h3>
                <div className="summary-item">
                  <span className="summary-label">Estado:</span>
                  <span className={`summary-value quality-${formData.qualityStatus}`}>
                    {formData.qualityStatus.charAt(0).toUpperCase() + formData.qualityStatus.slice(1)}
                  </span>
                </div>
                {formData.partWeight > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Peso:</span>
                    <span className="summary-value">{formData.partWeight}g</span>
                  </div>
                )}
                {formData.partDimensions.length > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Dimensiones:</span>
                    <span className="summary-value">
                      {formData.partDimensions.length}×{formData.partDimensions.width}×{formData.partDimensions.height} mm
                    </span>
                  </div>
                )}
              </div>

              <div className="summary-section">
                <h3 className="summary-title">
                  <span className="summary-icon">📝</span> Información Adicional
                </h3>
                {formData.lotNumber && (
                  <div className="summary-item">
                    <span className="summary-label">Lote:</span>
                    <span className="summary-value">{formData.lotNumber}</span>
                  </div>
                )}
                {formData.batchNumber && (
                  <div className="summary-item">
                    <span className="summary-label">Batch:</span>
                    <span className="summary-value">{formData.batchNumber}</span>
                  </div>
                )}
                {formData.notes && (
                  <div className="summary-item">
                    <span className="summary-label">Notas:</span>
                    <span className="summary-value notes">{formData.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setStep(6)} className="btn-secondary">
                ← Editar Datos
              </button>
              <button onClick={handleSubmit} className="btn-primary">
                <span className="button-icon">📊</span> Generar Gráficas y Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DataEntryForm;
