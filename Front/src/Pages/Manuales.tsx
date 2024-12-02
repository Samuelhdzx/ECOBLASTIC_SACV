import './Manuales.css';
import manualTecnico from '../../public/pdf/ECOBLASTIC manual (3) (1).pdf';
import manualUsuario from '../../public/pdf/MANUAL INYECTORA.pdf';

const Manuales = () => {
  return (
    <div className="manuales-container">
      <header className="manuales-header">
        <h1>Guía Técnica de Materiales y Procesos</h1>
        <p>Información detallada sobre plásticos, moldes y procedimientos</p>
      </header>

      <section className="info-sectionM">
        <div className="info-cardM">
          <h2>🔬 Plásticos Utilizados</h2>
          <div className="info-contentM">
            <h3>PET (Tereftalato de Polietileno)</h3>
            <p>Material versátil con excelentes propiedades:</p>
            <ul>
              <li>Temperatura de fusión: 260°C</li>
              <li>Resistencia al impacto alta</li>
              <li>Transparencia y brillo excepcional</li>
              <li>100% Reciclable</li>
            </ul>

            <h3>Polipropileno (PP)</h3>
            <p>Termoplástico de alta resistencia:</p>
            <ul>
              <li>Temperatura de fusión: 170°C</li>
              <li>Excelente resistencia química</li>
              <li>Bajo costo de producción</li>
              <li>Alta durabilidad</li>
            </ul>
          </div>
        </div>

        <div className="info-cardM">
          <h2>🔧 Sistema de Moldes</h2>
          <div className="info-contentM">
            <h3>Características Principales</h3>
            <ul>
              <li>Diseño modular intercambiable</li>
              <li>Sistema de refrigeración optimizado</li>
              <li>Acabado superficial de alta calidad</li>
              <li>Mantenimiento preventivo programado</li>
            </ul>

            <h3>Especificaciones Técnicas</h3>
            <ul>
              <li>Presión máxima: 200 MPa</li>
              <li>Temperatura máxima: 300°C</li>
              <li>Tiempo de ciclo: 15-45 segundos</li>
              <li>Vida útil estimada: 100,000 ciclos</li>
            </ul>
          </div>
        </div>

        <div className="info-cardM">
          <h2>⚡ Proceso de Inyección</h2>
          <div className="info-contentM">
            <h3>Parámetros Críticos</h3>
            <ul>
              <li>Control preciso de temperatura</li>
              <li>Presión de inyección controlada</li>
              <li>Tiempo de enfriamiento optimizado</li>
              <li>Velocidad de inyección ajustable</li>
            </ul>

            <h3>Recomendaciones</h3>
            <ul>
              <li>Precalentamiento de material</li>
              <li>Limpieza regular del sistema</li>
              <li>Calibración periódica</li>
              <li>Monitoreo constante</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="download-section">
        <h2>Manuales Disponibles</h2>
        <div className="download-cards">
          <a href={manualTecnico} download className="download-card">
            <span className="download-icon">📘</span>
            <h3>Manual Técnico</h3>
            <p>Especificaciones detalladas y guía de mantenimiento</p>
            <button className="download-button">Descargar PDF</button>
          </a>

          <a href={manualUsuario} download className="download-card">
            <span className="download-icon">📗</span>
            <h3>Manual de Usuario</h3>
            <p>Guía de operación y mejores prácticas</p>
            <button className="download-button">Descargar PDF</button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Manuales;
