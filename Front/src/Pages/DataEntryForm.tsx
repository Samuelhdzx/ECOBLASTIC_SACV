import React from 'react';
import './DataEntryForm.css';
import { useAddSensorDataMutation } from '@/state/api';
import { useNavigate } from 'react-router-dom';

interface FormData {
  polymerUsage: {
    pet: number;
    polypropylene: number;
  };
  potentiometerEnergy: {
    used: number;
    remaining: number;
  };
  injectorEnergy: {
    used: number;
    remaining: number;
  };
  moldUsage: {
    mold1: number;
    mold2: number;
    mold3: number;
  };
  temperature: number;
  injectionTime: number;
}

const DataEntryForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = React.useState<FormData>({
    polymerUsage: {
      pet: 0,
      polypropylene: 0
    },
    potentiometerEnergy: {
      used: 0,
      remaining: 100
    },
    injectorEnergy: {
      used: 0,
      remaining: 100
    },
    moldUsage: {
      mold1: 0,
      mold2: 0,
      mold3: 0
    },
    temperature: 0,
    injectionTime: 0
  });

  const [addSensorData] = useAddSensorDataMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');
    
    if (nameParts.length === 2) {
      const [category, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof FormData] as object),
          [field]: Number(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSensorData(formData).unwrap();
      setFormData({
        polymerUsage: { pet: 0, polypropylene: 0 },
        potentiometerEnergy: { used: 0, remaining: 100 },
        injectorEnergy: { used: 0, remaining: 100 },
        moldUsage: { mold1: 0, mold2: 0, mold3: 0 },
        temperature: 0,
        injectionTime: 0
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Control de Inyección</h1>
        <p>Sistema de Monitoreo de Parámetros</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h2 className="section-title">
            <span className="section-icon">🔬</span>
            Uso de Polímeros
          </h2>
          <div className="grid-2">
            <div className="input-group">
              <label className="input-label">PET (kg)</label>
              <input
                type="number"
                name="polymerUsage.pet"
                value={formData.polymerUsage.pet}
                onChange={handleChange}
                className="input-field"
                min="0"
                step="0.1"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Polipropileno (kg)</label>
              <input
                type="number"
                name="polymerUsage.polypropylene"
                value={formData.polymerUsage.polypropylene}
                onChange={handleChange}
                className="input-field"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <span className="section-icon">⚡</span>
            Energía del Potenciómetro
          </h2>
          <div className="grid-2">
            <div className="input-group">
              <label className="input-label">Energía Utilizada (%)</label>
              <input
                type="number"
                name="potentiometerEnergy.used"
                value={formData.potentiometerEnergy.used}
                onChange={handleChange}
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
                onChange={handleChange}
                className="input-field"
                min="0"
                max="100"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <span className="section-icon">🔌</span>
            Energía del Inyector
          </h2>
          <div className="grid-2">
            <div className="input-group">
              <label className="input-label">Energía Utilizada (%)</label>
              <input
                type="number"
                name="injectorEnergy.used"
                value={formData.injectorEnergy.used}
                onChange={handleChange}
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
                onChange={handleChange}
                className="input-field"
                min="0"
                max="100"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <span className="section-icon">🔧</span>
            Uso de Moldes
          </h2>
          <div className="grid-3">
            <div className="input-group">
              <label className="input-label">Molde 1 (usos)</label>
              <input
                type="number"
                name="moldUsage.mold1"
                value={formData.moldUsage.mold1}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Molde 2 (usos)</label>
              <input
                type="number"
                name="moldUsage.mold2"
                value={formData.moldUsage.mold2}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Molde 3 (usos)</label>
              <input
                type="number"
                name="moldUsage.mold3"
                value={formData.moldUsage.mold3}
                onChange={handleChange}
                className="input-field"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">
            <span className="section-icon">🌡️</span>
            Parámetros Adicionales
          </h2>
          <div className="grid-2">
            <div className="input-group">
              <label className="input-label">Temperatura (°C)</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
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
                onChange={handleChange}
                className="input-field"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
      <span className="button-icon">📊</span>
      Generar Gráficas
    </button>
      </form>
    </div>
  );
};

export default DataEntryForm;