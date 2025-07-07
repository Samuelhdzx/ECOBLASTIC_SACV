import React, { useState } from 'react';

export const DataEntryForm: React.FC = () => {
  const [showMaterialSelection, setShowMaterialSelection] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedMold, setSelectedMold] = useState('');
  const [formData, setFormData] = useState({
    temperatura: '',
    presion: '',
    velocidad: '',
    tiempoCiclo: ''
  });

  const MaterialMoldSelection = () => (
    <div className="material-mold-selection">
      <h2>Selección de Material y Molde</h2>
      <div className="selection-container">
        <div className="form-group">
          <label>Material:</label>
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            required
          >
            <option value="">Seleccione el material</option>
            <option value="PET">PET</option>
            <option value="polipropileno">Polipropileno</option>
          </select>
        </div>

        <div className="form-group">
          <label>Molde:</label>
          <select 
            value={selectedMold}
            onChange={(e) => setSelectedMold(e.target.value)}
            required
          >
            <option value="">Seleccione el molde</option>
            <option value="molde1">Molde Tipo A</option>
            <option value="molde2">Molde Tipo B</option>
            <option value="molde3">Molde Tipo C</option>
          </select>
        </div>

        <button 
          className="btn-primary"
          onClick={() => {
            if (selectedMaterial && selectedMold) {
              setShowMaterialSelection(false);
            }
          }}
        >
          Continuar al Monitoreo
        </button>
      </div>
    </div>
  );

  return (
    <div className="data-entry-container">
      {showMaterialSelection ? (
        <MaterialMoldSelection />
      ) : (
        <form className="monitoring-form">
          <h2>Monitoreo de {selectedMaterial} - {selectedMold}</h2>
          {/* Resto de tu formulario existente */}
        </form>
      )}
    </div>
  );
};
