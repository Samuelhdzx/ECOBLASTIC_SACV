import React from 'react';
import './plasticos.css';
import molde1 from "front/public/img/MONITOREO/molde1.png";
import molde2 from "front/public/img/MONITOREO/molde2.png";

const Moldes: React.FC = () => {
  return (
    <div className='all'>
      <h1>Seleccione el plastico a emplear</h1>
      <div className='imagenes'>
        <div className='plastico'>
              <img src={molde1} alt="molde1"/>
        </div>
        <div className='plastico'>
          <a href="../Inicio">
            <img src={molde2} alt="molde2"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Moldes;