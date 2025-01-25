import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './help.css';

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('guides');

  const faqData = [
    {
      question: "¿Cómo inicio un nuevo ciclo de producción?",
      answer: "Para iniciar un nuevo ciclo, dirígete al panel principal y selecciona 'Nuevo Ciclo'. Sigue las instrucciones en pantalla para configurar los parámetros iniciales."
    },
    {
      question: "¿Cómo exporto mis reportes?",
      answer: "Los reportes pueden exportarse en formato PDF o Excel desde la sección 'Reportes'. Usa el botón 'Exportar' y selecciona el formato deseado."
    },
    {
      question: "¿Qué hacer si hay una alerta de temperatura?",
      answer: "Si recibes una alerta de temperatura, verifica los sensores y el sistema de enfriamiento. Consulta el manual técnico sección 3.2 para los pasos detallados."
    }
  ];

  const videoTutorials = [
    {
      title: "Configuración Inicial",
      duration: "5:30",
      thumbnail: "thumbnail1.jpg"
    },
    {
      title: "Mantenimiento Básico",
      duration: "8:45",
      thumbnail: "thumbnail2.jpg"
    },
    {
      title: "Generación de Reportes",
      duration: "4:15",
      thumbnail: "thumbnail3.jpg"
    }
  ];

  return (
    <motion.div 
      className="help-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="help-header">
        <h1>Centro de Ayuda</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar ayuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">
            <i className="fi fi-rr-search"></i>
          </button>
        </div>
      </header>

      <div className="help-content">
        <aside className="help-sidebar">
          <nav className="help-nav">
            <button
              className={`nav-item ${activeSection === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveSection('guides')}
            >
              <i className="fi fi-rr-book-alt"></i>
              Guías y Tutoriales
            </button>
            <button
              className={`nav-item ${activeSection === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveSection('faq')}
            >
              <i className="fi fi-rr-interrogation"></i>
              Preguntas Frecuentes
            </button>
            <button
              className={`nav-item ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => setActiveSection('support')}
            >
              <i className="fi fi-rr-headset"></i>
              Soporte Técnico
            </button>
            <button
              className={`nav-item ${activeSection === 'updates' ? 'active' : ''}`}
              onClick={() => setActiveSection('updates')}
            >
              <i className="fi fi-rr-refresh"></i>
              Actualizaciones
            </button>
          </nav>

          <div className="quick-contact">
            <h3>¿Necesitas ayuda inmediata?</h3>
            <button className="contact-btn">
              <i className="fi fi-rr-comment"></i>
              Iniciar Chat
            </button>
            <p>Horario de atención: 24/7</p>
          </div>
        </aside>

        <main className="help-main">
          {activeSection === 'guides' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="guides-section"
            >
              <h2>Guías y Tutoriales</h2>
              
              <div className="video-tutorials">
                <h3>Videos Tutoriales</h3>
                <div className="tutorials-grid">
                  {videoTutorials.map((video, index) => (
                    <div key={index} className="tutorial-card">
                      <div className="thumbnail">
                        <img src={video.thumbnail} alt={video.title} />
                        <span className="duration">{video.duration}</span>
                      </div>
                      <h4>{video.title}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-guides">
                <h3>Guías Rápidas</h3>
                <div className="guides-grid">
                  <a href="#" className="guide-item">
                    <i className="fi fi-rr-document"></i>
                    <span>Manual de Usuario</span>
                  </a>
                  <a href="#" className="guide-item">
                    <i className="fi fi-rr-tools"></i>
                    <span>Guía de Mantenimiento</span>
                  </a>
                  <a href="#" className="guide-item">
                    <i className="fi fi-rr-stats"></i>
                    <span>Optimización de Producción</span>
                  </a>
                  <a href="#" className="guide-item">
                    <i className="fi fi-rr-shield-check"></i>
                    <span>Seguridad y Mejores Prácticas</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="faq-section"
            >
              <h2>Preguntas Frecuentes</h2>
              <div className="faq-list">
                {faqData.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="support-section"
            >
              <h2>Soporte Técnico</h2>
              
              <div className="support-options">
                <div className="support-card">
                  <i className="fi fi-rr-ticket"></i>
                  <h3>Crear Ticket</h3>
                  <p>Reporta un problema o solicita asistencia técnica</p>
                  <button className="support-btn">Crear Ticket</button>
                </div>

                <div className="support-card">
                  <i className="fi fi-rr-phone-call"></i>
                  <h3>Llamada Directa</h3>
                  <p>Habla con un especialista ahora</p>
                  <button className="support-btn">Llamar</button>
                </div>

                <div className="support-card">
                  <i className="fi fi-rr-envelope"></i>
                  <h3>Email</h3>
                  <p>Envíanos un correo detallado</p>
                  <button className="support-btn">Enviar Email</button>
                </div>
              </div>

              <div className="support-status">
                <h3>Estado del Sistema</h3>
                <div className="status-indicators">
                  <div className="status-item">
                    <span className="status-dot green"></span>
                    <span>Servidores Operativos</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot green"></span>
                    <span>API Funcionando</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot green"></span>
                    <span>Base de Datos Estable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'updates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="updates-section"
            >
              <h2>Actualizaciones del Sistema</h2>
              
              <div className="update-timeline">
                <div className="update-item">
                  <div className="update-date">15 Enero 2024</div>
                  <div className="update-content">
                    <h4>Versión 2.1.0</h4>
                    <ul>
                      <li>Mejoras en el rendimiento del dashboard</li>
                      <li>Nuevos gráficos de análisis</li>
                      <li>Corrección de errores menores</li>
                    </ul>
                  </div>
                </div>

                <div className="update-item">
                  <div className="update-date">1 Enero 2024</div>
                  <div className="update-content">
                    <h4>Versión 2.0.0</h4>
                    <ul>
                      <li>Nueva interfaz de usuario</li>
                      <li>Sistema de reportes mejorado</li>
                      <li>Integración con API actualizada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  );
};

export default Help;
