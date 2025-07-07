import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
// Importa tus videos locales (se cargarán bajo demanda)
import video1 from '../../public/video/videouno.mp4';
import video2 from '../../public/video/videodos.mp4';
import video3 from '../../public/video/videotres.mp4';
import './Help.css';

interface FAQ {
  question: string;
  answer: string;
}

// Diccionario de traducciones para internacionalización
const translations = {
  es: {
    guides: "Guías y Tutoriales",
    faq: "Preguntas Frecuentes",
    support: "Soporte Técnico",
    updates: "Actualizaciones",
    maintenance: "Mantenimiento",
    searchPlaceholder: "Buscar en FAQs...",
    chat: "Iniciar Chat",
    immediateHelp: "¿Necesitas ayuda inmediata?",
    ratingQuestion: "¿Fue útil esta respuesta?",
    yes: "Sí",
    no: "No",
    close: "Cerrar",
    ticket: "Crear Ticket",
    email: "Enviar Email",
    whatsapp: "Enviar por WhatsApp",
    systemStatus: "Estado del Sistema",
    notifications: "Notificaciones",
    externalResources: "Recursos Externos",
    userManual: "Manual de Usuario",
    maintenanceGuide: "Guía de Mantenimiento",
    productionOptimization: "Optimización de Producción",
    security: "Seguridad y Mejores Prácticas",
    language: "Idioma",
    english: "Inglés",
    spanish: "Español"
  },
  en: {
    guides: "Guides and Tutorials",
    faq: "FAQ",
    support: "Technical Support",
    updates: "Updates",
    maintenance: "Maintenance",
    searchPlaceholder: "Search FAQs...",
    chat: "Start Chat",
    immediateHelp: "Need immediate help?",
    ratingQuestion: "Was this answer helpful?",
    yes: "Yes",
    no: "No",
    close: "Close",
    ticket: "Create Ticket",
    email: "Send Email",
    whatsapp: "Send via WhatsApp",
    systemStatus: "System Status",
    notifications: "Notifications",
    externalResources: "External Resources",
    userManual: "User Manual",
    maintenanceGuide: "Maintenance Guide",
    productionOptimization: "Production Optimization",
    security: "Security and Best Practices",
    language: "Language",
    english: "English",
    spanish: "Spanish"
  }
};

const Help: React.FC<{ userType: 'user' | 'admin' }> = ({ userType }) => {
  // Estado para manejo de idioma
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = (key: string) => translations[language][key] || key;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('guides');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  // Para guardar la evaluación (rating) de cada FAQ
  const [faqRatings, setFaqRatings] = useState<{ [key: number]: 'yes' | 'no' | null }>({});

  const adminEmails = [
    'ola@ola.com',
    'admin2@example.com',
    'admin3@example.com'
  ];

  // Preguntas frecuentes
  const faqData: FAQ[] = [
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
      answer: "Si recibes una alerta de temperatura, verifica los sensores y el sistema de enfriamiento. Consulta el manual técnico, sección 3.2, para los pasos detallados."
    }
  ];

  // Videos tutoriales
  const videoTutorials = [
    {
      title: "Configuración Inicial",
      duration: "5:30"
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

  // Tips de mantenimiento
  const maintenanceTips = [
    { tip: "Realiza una limpieza regular de la inyectora para evitar obstrucciones." },
    { tip: "Verifica y calibra los sensores de temperatura y presión mensualmente." },
    { tip: "Reinicia el sistema en caso de fallos intermitentes y consulta el manual de resolución de problemas." },
    { tip: "Asegúrate de que el software de monitoreo esté actualizado a la última versión." }
  ];

  // Estado del sistema (simulación de datos en tiempo real)
  const [systemStatus, setSystemStatus] = useState({
    servers: 'green',
    api: 'green',
    database: 'green'
  });

  // Uso de useMemo para filtrar FAQs y evitar cálculos innecesarios
  const filteredFAQ = useMemo(() => {
    if (searchQuery.trim() === '') {
      return faqData;
    } else {
      return faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }, [searchQuery, faqData]);

  // Simula actualizaciones en el estado del sistema y recepción de notificaciones
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setSystemStatus({
        servers: Math.random() > 0.1 ? 'green' : 'red',
        api: Math.random() > 0.1 ? 'green' : 'red',
        database: Math.random() > 0.1 ? 'green' : 'red'
      });
    }, 10000);

    const notificationInterval = setInterval(() => {
      setNewNotificationCount(prev => prev + 1);
    }, 30000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(notificationInterval);
    };
  }, []);

  // Funciones para manejo del ticket de soporte
  const openTicketForm = () => {
    setShowTicketForm(true);
  };

  const closeTicketForm = () => {
    setShowTicketForm(false);
    setTicketSubject('');
    setTicketDescription('');
  };

  const handleSendTicketEmail = () => {
    const subject = `Ticket: ${ticketSubject}`;
    const body = `Descripción:\n${ticketDescription}`;
    const url = `mailto:${selectedAdmin}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const handleSendTicketWhatsApp = () => {
    const message = `Asunto: ${ticketSubject}\nDescripción: ${ticketDescription}`;
    const url = `https://wa.me/5511516339?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  const handleCall = () => {
    window.location.href = 'https://wa.me/5511516339?text=Hola,%20necesito%20soporte%20técnico.';
  };

  // Manejo del chat en vivo
  const openChat = () => {
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  const sendChatMessage = (message: string) => {
    setChatMessages(prev => [...prev, message]);
  };

  // Manejo de la evaluación de cada FAQ
  const handleRating = (index: number, rating: 'yes' | 'no') => {
    setFaqRatings(prev => ({ ...prev, [index]: rating }));
  };

  return (
    <motion.div 
      className="help-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="help-content">
        <aside className="help-sidebar" role="complementary">
          <nav className="help-nav">
            <button
              className={`nav-item ${activeSection === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveSection('guides')}
              aria-label={t('guides')}
            >
              <i className="fi fi-rr-book-alt"></i>
              {t('guides')}
            </button>
            {userType === 'user' && (
              <button
                className={`nav-item ${activeSection === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveSection('faq')}
                aria-label={t('faq')}
              >
                <i className="fi fi-rr-interrogation"></i>
                {t('faq')}
              </button>
            )}
            <button
              className={`nav-item ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => setActiveSection('support')}
              aria-label={t('support')}
            >
              <i className="fi fi-rr-headset"></i>
              {t('support')}
              {newNotificationCount > 0 && (
                <span className="notification-badge" aria-label={t('notifications')}>
                  {newNotificationCount}
                </span>
              )}
            </button>
            {userType === 'user' && (
              <>
                <button
                  className={`nav-item ${activeSection === 'updates' ? 'active' : ''}`}
                  onClick={() => setActiveSection('updates')}
                  aria-label={t('updates')}
                >
                  <i className="fi fi-rr-refresh"></i>
                  {t('updates')}
                </button>
                <button
                  className={`nav-item ${activeSection === 'maintenance' ? 'active' : ''}`}
                  onClick={() => setActiveSection('maintenance')}
                  aria-label={t('maintenance')}
                >
                  <i className="fi fi-rr-wrench"></i>
                  {t('maintenance')}
                </button>
              </>
            )}
          </nav>

          {/* Selector de idioma */}
          <div className="language-toggle">
            <span>{t('language')}: </span>
            <button onClick={() => setLanguage('es')} disabled={language === 'es'} aria-label="Español">
              {t('spanish')}
            </button>
            <button onClick={() => setLanguage('en')} disabled={language === 'en'} aria-label="English">
              {t('english')}
            </button>
          </div>

          <div className="quick-contact">
            <h3>{t('immediateHelp')}</h3>
            <button className="contact-btn" onClick={openChat} aria-label={t('chat')}>
              <i className="fi fi-rr-comment"></i>
              {t('chat')}
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
              <h2>{t('guides')}</h2>
              <div className="video-tutorials">
                <h3>Videos Tutoriales</h3>
                <div className="tutorials-grid">
                  <div className="tutorial-card">
                    <div className="video-container">
                      <video controls preload="none" aria-label={videoTutorials[0].title}>
                        <source src={video1} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </div>
                    <h4>{videoTutorials[0].title}</h4>
                  </div>
                  <div className="tutorial-card">
                    <div className="video-container">
                      <video controls preload="none" aria-label={videoTutorials[1].title}>
                        <source src={video2} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </div>
                    <h4>{videoTutorials[1].title}</h4>
                  </div>
                  <div className="tutorial-card">
                    <div className="video-container">
                      <video controls preload="none" aria-label={videoTutorials[2].title}>
                        <source src={video3} type="video/mp4" />
                        Tu navegador no soporta el elemento de video.
                      </video>
                    </div>
                    <h4>{videoTutorials[2].title}</h4>
                  </div>
                </div>
              </div>
              <div className="quick-guides">
                <h3>Guías Rápidas</h3>
                <div className="guides-grid">
                  <a href="/manuals" className="guide-item" aria-label={t('userManual')}>
                    <i className="fi fi-rr-document"></i>
                    <span>{t('userManual')}</span>
                  </a>
                  <a href="/guia-mantenimiento" className="guide-item" aria-label={t('maintenanceGuide')}>
                    <i className="fi fi-rr-tools"></i>
                    <span>{t('maintenanceGuide')}</span>
                  </a>
                  <a href="/optimizacion-produccion" className="guide-item" aria-label={t('productionOptimization')}>
                    <i className="fi fi-rr-stats"></i>
                    <span>{t('productionOptimization')}</span>
                  </a>
                  <a href="/seguridad" className="guide-item" aria-label={t('security')}>
                    <i className="fi fi-rr-shield-check"></i>
                    <span>{t('security')}</span>
                  </a>
                </div>
              </div>
              <div className="external-resources">
                <h3>{t('externalResources')}</h3>
                <ul>
                  <li>
                    <a href="https://example.com/documentation" target="_blank" rel="noopener noreferrer">
                      Documentación Técnica
                    </a>
                  </li>
                  <li>
                    <a href="https://forum.example.com" target="_blank" rel="noopener noreferrer">
                      Foro de la Comunidad
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeSection === 'faq' && userType === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="faq-section"
            >
              <h2>{t('faq')}</h2>
              {/* Campo de búsqueda para filtrar FAQs */}
              <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t('searchPlaceholder')}
              />
              <div className="faq-list">
                {filteredFAQ.length > 0 ? (
                  filteredFAQ.map((faq, index) => (
                    <div key={index} className="faq-item">
                      <h4>{faq.question}</h4>
                      <p>{faq.answer}</p>
                      <div className="faq-rating">
                        <span>{t('ratingQuestion')}</span>
                        <button 
                          onClick={() => handleRating(index, 'yes')}
                          aria-label={t('yes')}
                          className={faqRatings[index] === 'yes' ? 'selected' : ''}
                        >
                          {t('yes')}
                        </button>
                        <button 
                          onClick={() => handleRating(index, 'no')}
                          aria-label={t('no')}
                          className={faqRatings[index] === 'no' ? 'selected' : ''}
                        >
                          {t('no')}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No se encontraron resultados para "{searchQuery}"</p>
                )}
              </div>
            </motion.div>
          )}

          {activeSection === 'support' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="support-section"
            >
              <h2>{t('support')}</h2>
              <div className="support-options">
                <div className="support-card">
                  <i className="fi fi-rr-ticket"></i>
                  <h3>{t('ticket')}</h3>
                  <p>Reporta un problema o envía tu queja.</p>
                  <button className="support-btn" onClick={openTicketForm} aria-label={t('ticket')}>
                    {t('ticket')}
                  </button>
                </div>
                {userType === 'admin' && (
                  <div className="support-card">
                    <i className="fi fi-rr-phone-call"></i>
                    <h3>WhatsApp Soporte</h3>
                    <p>Contacta a un especialista vía WhatsApp.</p>
                    <button className="support-btn" onClick={handleCall} aria-label="WhatsApp Soporte">
                      Abrir WhatsApp
                    </button>
                  </div>
                )}
                <div className="support-card">
                  <i className="fi fi-rr-envelope"></i>
                  <h3>{t('email')}</h3>
                  <p>Envíanos un correo detallado.</p>
                  <button className="support-btn" onClick={handleSendTicketEmail} aria-label={t('email')}>
                    {t('email')}
                  </button>
                </div>
              </div>
              {userType === 'admin' && (
                <div className="support-status">
                  <h3>{t('systemStatus')}</h3>
                  <div className="status-indicators">
                    <div className="status-item">
                      <span className={`status-dot ${systemStatus.servers}`}></span>
                      <span>Servidores Operativos</span>
                    </div>
                    <div className="status-item">
                      <span className={`status-dot ${systemStatus.api}`}></span>
                      <span>API Funcionando</span>
                    </div>
                    <div className="status-item">
                      <span className={`status-dot ${systemStatus.database}`}></span>
                      <span>Base de Datos Estable</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeSection === 'updates' && userType === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="updates-section"
            >
              <h2>{t('updates')}</h2>
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

          {activeSection === 'maintenance' && userType === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="maintenance-section"
            >
              <h2>{t('maintenance')}</h2>
              <div className="maintenance-tips">
                {maintenanceTips.map((item, index) => (
                  <div key={index} className="maintenance-item">
                    <i className="fi fi-rr-info"></i>
                    <p>{item.tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Modal para creación de ticket */}
      {showTicketForm && (
        <div className="ticket-modal" role="dialog" aria-modal="true">
          <div className="ticket-form">
            <h2>{t('ticket')}</h2>
            <label>
              Asunto:
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                aria-label="Asunto del ticket"
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                aria-label="Descripción del ticket"
              />
            </label>
            {userType === 'user' && (
              <label>
                Enviar a:
                <select value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)} aria-label="Selecciona administrador">
                  {adminEmails.map((email, index) => (
                    <option key={index} value={email}>{email}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="ticket-actions">
              {userType === 'admin' && (
                <button onClick={handleSendTicketWhatsApp} aria-label={t('whatsapp')}>
                  {t('whatsapp')}
                </button>
              )}
              <button onClick={handleSendTicketEmail} aria-label={t('email')}>
                {t('email')}
              </button>
            </div>
            <button className="ticket-close" onClick={closeTicketForm} aria-label={t('close')}>
              {t('close')}
            </button>
          </div>
        </div>
      )}

      {/* Modal del chat en vivo */}
      {showChat && (
        <div className="chat-modal" role="dialog" aria-modal="true">
          <div className="chat-window">
            <h2>{t('chat')}</h2>
            <div className="chat-messages">
              {chatMessages.length > 0 ? (
                chatMessages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))
              ) : (
                <p>No hay mensajes aún.</p>
              )}
            </div>
            <div className="chat-input">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                    sendChatMessage(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                aria-label="Enviar mensaje de chat"
              />
              <button onClick={closeChat} aria-label={t('close')}>
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Help;
