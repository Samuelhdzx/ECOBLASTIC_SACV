import React, { useState } from 'react';

interface PropiedadesSeleccionMaterial {
    onSelection: (material: string, molde: string) => void;
  }
  
  const FormularioSeleccionMaterial: React.FC<PropiedadesSeleccionMaterial> = ({ onSelection }) => {
    const [material, setMaterial] = useState('');
    const [molde, setMolde] = useState('');
  
    const materiales = [
      { id: 'pet', nombre: 'PET' },
      { id: 'polipropileno', nombre: 'Polipropileno' }
    ];
  
    const moldes = [
      { id: 'molde1', nombre: 'Molde Tipo A' },
      { id: 'molde2', nombre: 'Molde Tipo B' },
      { id: 'molde3', nombre: 'Molde Tipo C' }
    ];
  
    const manejarEnvio = (e: React.FormEvent) => {
      e.preventDefault();
      if (material && molde) {
        onSelection(material, molde);
      }
    };
  
    return (
      <form onSubmit={manejarEnvio} className="formulario-seleccion-material">
        <div className="grupo-formulario">
          <label>Seleccionar Material:</label>
          <select 
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
          >
            <option value="">Seleccione un material</option>
            {materiales.map(material => (
              <option key={material.id} value={material.id}>
                {material.nombre}
              </option>
            ))}
          </select>
        </div>
  
        <div className="grupo-formulario">
          <label>Seleccionar Molde:</label>
          <select 
            value={molde}
            onChange={(e) => setMolde(e.target.value)}
            required
          >
            <option value="">Seleccione un molde</option>
            {moldes.map(molde => (
              <option key={molde.id} value={molde.id}>
                {molde.nombre}
              </option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="boton-primario">
          Continuar al Monitoreo
        </button>
      </form>
    );
  };

  export default FormularioSeleccionMaterial;
