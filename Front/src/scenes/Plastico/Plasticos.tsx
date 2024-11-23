import React from 'react';
import './plasticos.css';
import pet from "front/public/img/MONITOREO/pet.png";
import polipropileno from "front/public/img/MONITOREO/pp.png";



const Plasticos: React.FC = () => {
  return (
    <div className='all'>
      <h1>Seleccione el plastico a emplear</h1>
      <div className='imagenes'>
        <div className='plastico'>
          <a href="../Datos">
              <img src={polipropileno} alt="polipropileno"/>
          </a>
        </div>
        <div className='plastico'>
          <a href="../Inicio">
            <img src={pet} alt="pet"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Plasticos;