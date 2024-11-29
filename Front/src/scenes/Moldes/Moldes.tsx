import React from 'react';
import './Moldes.css';
import molde1 from "front/public/img/MONITOREO/molde1.png";
import molde2 from "front/public/img/MONITOREO/molde2.png";

const Moldes: React.FC = () => {
  return (
    <div className='all'>
      <h1>Seleccione el molde a emplear</h1>
      <div className='imagenes-Molde'>
        <div className='molde'>
            <img src={molde1} alt="molde1"/>
            <p className='tipo'>Molde 1</p>
        </div>
        <div className='molde'>
            <img src={molde2} alt="molde2"/>
            <p className='tipo'>Molde2</p>
        </div>
      </div>
    </div>
  );
};

export default Moldes;