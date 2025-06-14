// DataEntryForm.tsx
import React, { useState } from 'react';
import { useAddSensorDataMutation } from '@/state/api';
import { useNavigate } from 'react-router-dom';
import './DataEntryForm.css';

interface FormData {
  // Aquí usamos flags para el material y el molde:
  polymerUsage: {
    pet: number;          // 1 si se eligió PET, 0 si no
    polypropylene: number;  // 1 si se eligió Polipropileno, 0 si no
  };
  moldUsage: {
    mold1: number;        // 1 si se eligió Molde 1, etc.
    mold2: number;
    mold3: number;
  };
  // Los demás datos:
  potentiometerEnergy: {
    used: number;
    remaining: number;
  };
  injectorEnergy: {
    used: number;
    remaining: number;
  };
  temperature: number;
  injectionTime: number;

  // Nuevos campos para producción
  production: {
    hourlyProduction: number;
    piecesProduced: number;
    defectivePieces: number;
    efficiency: number;
  };
  quality: {
    defectRate: number;
    materialWaste: number;
    qualityRate: number;
  };
  costs: {
    materialCost: number;
    operationalCost: number;
    wasteCost: number;
  };
  machine: {
    cycleTime: number;
    oee: number;
    mtbf: number;
    maintenanceStatus: 'good' | 'warning' | 'critical';
  };
  operator: {
    id: string;
    name: string;
    responseTime: number;
    productivity: number;
  };
}

const DataEntryForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    polymerUsage: { pet: 0, polypropylene: 0 },
    moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
    potentiometerEnergy: { used: 0, remaining: 100 },
    injectorEnergy: { used: 0, remaining: 100 },
    temperature: 0,
    injectionTime: 0,

    production: {
      hourlyProduction: 0,
      piecesProduced: 0,
      defectivePieces: 0,
      efficiency: 0
    },
    quality: {
      defectRate: 0,
      materialWaste: 0,
      qualityRate: 100
    },
    costs: {
      materialCost: 0,
      operationalCost: 0,
      wasteCost: 0
    },
    machine: {
      cycleTime: 0,
      oee: 0,
      mtbf: 0,
      maintenanceStatus: 'good'
    },
    operator: {
      id: '',
      name: '',
      responseTime: 0,
      productivity: 0
    }
  });

  const [addSensorData] = useAddSensorDataMutation();

  // Manejo de cambios para los datos restantes (energía, temperatura, tiempo)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      const [category, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof FormData] as object),
          [field]: Number(value),
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Se envía un objeto que incluye los flags y los demás datos
      await addSensorData(formData).unwrap();
      // Reiniciamos el formulario (ajusta si lo necesitas)
      setFormData({
        polymerUsage: { pet: 0, polypropylene: 0 },
        moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
        potentiometerEnergy: { used: 0, remaining: 100 },
        injectorEnergy: { used: 0, remaining: 100 },
        temperature: 0,
        injectionTime: 0,

        production: {
          hourlyProduction: 0,
          piecesProduced: 0,
          defectivePieces: 0,
          efficiency: 0
        },
        quality: {
          defectRate: 0,
          materialWaste: 0,
          qualityRate: 100
        },
        costs: {
          materialCost: 0,
          operationalCost: 0,
          wasteCost: 0
        },
        machine: {
          cycleTime: 0,
          oee: 0,
          mtbf: 0,
          maintenanceStatus: 'good'
        },
        operator: {
          id: '',
          name: '',
          responseTime: 0,
          productivity: 0
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Paso 1: Selección del material
  if (step === 1) {
    return (
      <div className="form-container">
        <h2>Seleccione el material</h2>
        <div className="selection-buttons">
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                polymerUsage: { pet: 1, polypropylene: 0 },
              }));
              setStep(2);
            }}
          >
            PET
          </button>
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                polymerUsage: { pet: 0, polypropylene: 1 },
              }));
              setStep(2);
            }}
          >
            Polipropileno
          </button>
        </div>
      </div>
    );
  }

  // Paso 2: Selección del molde
  if (step === 2) {
    return (
      <div className="form-container">
        <h2>Seleccione el molde</h2>
        <div className="selection-buttons">
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                moldUsage: { mold1: 1, mold2: 0, mold3: 0 },
              }));
              setStep(3);
            }}
          >
            Molde 1
          </button>
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                moldUsage: { mold1: 0, mold2: 1, mold3: 0 },
              }));
              setStep(3);
            }}
          >
            Molde 2
          </button>
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                moldUsage: { mold1: 0, mold2: 0, mold3: 1 },
              }));
              setStep(3);
            }}
          >
            Molde 3
          </button>
        </div>
      </div>
    );
  }

  // Paso 3: Formulario para datos de energía, temperatura e inyección
  if (step === 3) {
    return (
      <div className="form-container">
        <div className="form-header">
          <h1>Control de Inyección</h1>
          <p>Sistema de Monitoreo de Parámetros</p>
          <p>
            Material:{' '}
            {formData.polymerUsage.pet === 1 ? 'PET' : 'Polipropileno'} | Molde:{' '}
            {formData.moldUsage.mold1 === 1
              ? 'Molde 1'
              : formData.moldUsage.mold2 === 1
              ? 'Molde 2'
              : 'Molde 3'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          {/* Energía del Potenciómetro */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">⚡</span> Energía del Potenciómetro
            </h2>
            <div className="grid-2">
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
          </div>
          {/* Energía del Inyector */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">🔌</span> Energía del Inyector
            </h2>
            <div className="grid-2">
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
          {/* Temperatura e Inyección */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">🌡️</span> Parámetros Adicionales
            </h2>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Temperatura (°C)</label>
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
            </div>
          </div>
          {/* Nuevos campos para KPIs */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">📊</span> Métricas de Producción
            </h2>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Producción por Hora</label>
                <input
                  type="number"
                  name="production.hourlyProduction"
                  value={formData.production.hourlyProduction}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Eficiencia (%)</label>
                <input
                  type="number"
                  name="production.efficiency"
                  value={formData.production.efficiency}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
          {/* Nueva sección de calidad */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">🎯</span> Métricas de Calidad
            </h2>
            <div className="grid-2">
              <div className="input-group">
                <label className="input-label">Tasa de Defectos (%)</label>
                <input
                  type="number"
                  name="quality.defectRate"
                  value={formData.quality.defectRate}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Desperdicio de Material (kg)</label>
                <input
                  type="number"
                  name="quality.materialWaste"
                  value={formData.quality.materialWaste}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
          {/* Nueva sección de costos */}
          <div className="form-section">
            <h2 className="section-title">
              <span className="section-icon">💰</span> Costos
            </h2>
            <div className="grid-3">
              <div className="input-group">
                <label className="input-label">Costo de Material</label>
                <input
                  type="number"
                  name="costs.materialCost"
                  value={formData.costs.materialCost}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">Costo Operacional</label>
                <input
                  type="number"
                  name="costs.operationalCost"
                  value={formData.costs.operationalCost}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button">
            <span className="button-icon">📊</span> Generar Gráficas
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default DataEntryForm;
