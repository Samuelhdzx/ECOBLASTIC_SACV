import React, { useState } from 'react';

interface FormularioSeleccionMaterialProps {
  onSelection: (material: string, molde: string) => void;
}

export const FormularioSeleccionMaterial: React.FC<FormularioSeleccionMaterialProps> = ({ onSelection }) => {
  const [materialSeleccionado, setMaterialSeleccionado] = useState('');
  const [moldeSeleccionado, setMoldeSeleccionado] = useState('');
  
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
    if (materialSeleccionado && moldeSeleccionado) {
      onSelection(materialSeleccionado, moldeSeleccionado);
    }
  };
  
  return (
    <form onSubmit={manejarEnvio} className="formulario-seleccion-material">
      <div className="grupo-formulario">
        <label>Seleccionar Material:</label>
        <select 
          value={materialSeleccionado}
          onChange={(e) => setMaterialSeleccionado(e.target.value)}
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
          value={moldeSeleccionado}
          onChange={(e) => setMoldeSeleccionado(e.target.value)}
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
