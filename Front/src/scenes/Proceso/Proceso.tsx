import React from "react";
import "./Proceso.css";

const Proceso: React.FC = () => {
  return (
    <div className="container">
      {/* Texto centrado */}
      <h1 className="text">El Proceso se ha Registrado con exito</h1>

      {/* Botón debajo del texto */}
      <button
        className="button-center"
        onClick={() => alert("Botón debajo del texto presionado")}
      >
        Continuar
      </button>

      {/* Botón en la esquina inferior izquierda */}
      <button
        className="button-bottom-left"
        onClick={() => alert("Botón en la esquina inferior izquierda presionado")}
      >
        Cancelar
      </button>
    </div>
  );
};

export default Proceso;
