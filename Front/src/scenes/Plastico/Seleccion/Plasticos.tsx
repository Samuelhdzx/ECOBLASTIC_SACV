import React from 'react';
import './plasticos.css';


const Plasticos: React.FC = () => {
  return (
    <div className='all'>
      <h1>Seleccione el plastico a emplear</h1>
      <div className='imagenes'>
        <div className='plastico'>
          <i className="fi fi-rr-recycle"></i>
          <p>Polipropileno</p>
        </div>
        <div className='plastico'>
          <i className="fi fi-ts-bio-leaves"></i>
          <p>PET</p>
        </div>
      </div>
    </div>
  );
};

export default Plasticos;


