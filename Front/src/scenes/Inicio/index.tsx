import React from 'react';
import './inicio.css';


const Inicio: React.FC = () => {
  return (
        <div className='inicio'>
            <section>
            <div className='cont'>
                <div className='info'>
                    <h1>Inyecta eficiencia en tu produccion</h1>
                    <p>ECOBLASTIC es una aplicación innovadora que te permite monitorear tu inyectora de plástico desde cualquier lugar, de una manera eficaz y completamente segura.</p>
                </div>
                <div className='img'>
                    <i className="fi fi-bs-digital-payment"></i>
                </div>
            </div>
            </section>
            <section>
            <div className='cont'>
                <div className='img-2'>
                    <i className="fi fi-rr-dashboard-monitor"></i>
                </div>
                <div className='info-2'>
                    <h1>Simplifica tu proceso de inyeccion con Ecoblastic</h1>
                    <p>En el mundo de la industria, optimizar los procedimientos es una clave importante. En ECOBLASTIC entendemos la importancia de una producción efectiva en los procesos de inyección de plástico. Nuestra plataforma está diseñada para mejorar la producción industrial desde un aparato móvil. Únete a nosotros y descubre cómo nuestra aplicación optimiza tu tiempo y facilita el proceso de tu inyectora de plástico.</p>
                </div>
            </div>
            </section>
            <section className='contener'>

                <h1>¿Que hacemos?</h1>
                
            <div className='hacemos'>
                <div className='contenedor'>
                    <div className='img'>
                    <i className="fi fi-br-temperature-up"></i>
                    </div>
                    <div className='info'>
                        <p>Calculamos la temperatura de fusión y enfriamiento de la inyectora en tiempo real.</p>
                    </div>
                </div>
                <div className='contenedor'>
                    <div className='img'>
                        <i className="fi fi-rr-clock-five"></i>
                    </div>
                    <div className='info'>
                        <p>Medimos el tiempo de espera para la formación correcta de la pieza.</p>
                    </div>
                </div>
                <div className='contenedor'>
                    <div className='img'>
                        <i className="fi fi-ss-chart-histogram"></i>
                    </div>
                    <div className='info'>
                        <p>Llevamos registros del uso de la inyectora y del consumo de energía que le queda para que realice su proceso completo.</p>
                    </div>
                </div>
                <div className='contenedor'>
                    <div className='img'>
                        <i className="fi fi-rr-business-time"></i>
                    </div>
                    <div className='info'>
                        <p>Medimos el tiempo de espera para la formación correcta de la pieza.</p>
                    </div>
                </div>
            </div>
            </section>
        </div>
    );
};



export default Inicio;