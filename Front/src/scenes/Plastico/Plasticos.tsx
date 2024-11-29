import React from 'react';
import { useNavigate } from "react-router-dom";
import './plasticos.css';
import pet from "front/public/img/MONITOREO/pet.png";
import polipropileno from "front/public/img/MONITOREO/pp.png";

const Plasticos: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleClick = () => {
    navigate("../Moldes"); // Redirige a la ruta "/destino"
  };

  return (
    <div className='all'>
      <h1>Seleccione el plastico a emplear</h1>
      <div className='imagenes'>
        <div className='plastico'>
              <img src={polipropileno} alt="polipropileno" onClick={handleClick}/>
        </div>
        <div className='plastico'>
          <img src={pet} alt="pet" onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
};

export default Plasticos;