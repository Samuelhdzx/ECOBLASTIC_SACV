import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

// Corregir rutas de imágenes
import celular from '../../../public/img/PÁGINA PRINCIPAL/celular.png';
import computadora from '../../../public/img/PÁGINA PRINCIPAL/compu.png';

const InicioAut: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Función para animar elementos al hacer scroll
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Activar inicialmente los elementos visibles
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      <div className="gradient-overlay">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Control Industrial <span className="hero-highlight">Inteligente</span></h1>
              <p className="hero-description">
                Potencia tu producción con <span className="brand-name">ECOBLASTIC</span>. Monitoreo en tiempo real, análisis predictivo y control total de tu inyectora de plástico.
              </p>
              <div className="action-buttons">
                <Link 
                  to={localStorage.getItem('user') ? '/data-entry' : '/register'} 
                  className="primary-btn"
                >
                  <span className="btn-icon">🚀</span>
                  <span>{localStorage.getItem('user') ? 'Ingresar Datos' : 'Iniciar Ahora'}</span>
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <img src={celular} alt="ECOBLASTIC Móvil" className="floating" />
              <div className="visual-highlight"></div>
            </div>
          </div>
        </section>

        {/* Widgets Grid */}
        <section className="widgets-grid">
          <div className="widget">
            <h3>Notificaciones en Tiempo Real</h3>
            <div className="notification-list">
              <div className="notification-item">
                <div>Temperatura óptima alcanzada</div>
                <div className="notification-time">2 min</div>
              </div>
              <div className="notification-item">
                <div>Ciclo completado exitosamente</div>
                <div className="notification-time">15 min</div>
              </div>
              <div className="notification-item">
                <div>Mantenimiento programado</div>
                <div className="notification-time">1 hr</div>
              </div>
            </div>
          </div>
          
          <div className="widget">
            <h3>Actividad Reciente</h3>
            <div className="activity-stats">
              <div className="stat-row">
                <div>Eficiencia de ciclo</div>
                <div className="stat-value">98.5%</div>
              </div>
              <div className="stat-row">
                <div>Temperatura promedio</div>
                <div className="stat-value">235°C</div>
              </div>
              <div className="stat-row">
                <div>Piezas producidas</div>
                <div className="stat-value">1,245</div>
              </div>
            </div>
          </div>
          
          <div className="widget">
            <h3>Acceso Rápido</h3>
            <div className="quick-access-grid">
              <Link to="/profile" className="quick-access-item">
                <i className="fi fi-rr-dashboard"></i>
                <span>Dashboard</span>
              </Link>
              <Link to="/predicciones" className="quick-access-item">
                <i className="fi fi-rr-stats"></i>
                <span>Predicciones</span>
              </Link>
              <Link to="/manuales" className="quick-access-item">
                <i className="fi fi-rr-book"></i>
                <span>Manuales</span>
              </Link>
              <Link to="/data-entry" className="quick-access-item">
                <i className="fi fi-rr-input-numeric"></i>
                <span>Datos</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features" ref={featuresRef}>
          <div className="section-wrapper">
            <h2 className="section-title reveal">Características Principales</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal">
              <i className="fi fi-rr-temperature-high"></i>
              <h3>Control Térmico</h3>
              <p>Monitoreo en tiempo real de temperatura con alertas automáticas y ajustes predictivos</p>
            </div>
            <div className="feature-card reveal">
              <i className="fi fi-rr-time-fast"></i>
              <h3>Optimización</h3>
              <p>Mejora continua de ciclos productivos con aprendizaje automático y análisis histórico</p>
            </div>
            <div className="feature-card reveal">
              <i className="fi fi-rr-chart-line-up"></i>
              <h3>Análisis</h3>
              <p>Reportes detallados y visualización de datos para toma de decisiones informadas</p>
            </div>
            <div className="feature-card reveal">
              <i className="fi fi-rr-settings-sliders"></i>
              <h3>Gestión</h3>
              <p>Control integral de todos los parámetros del proceso desde una interfaz centralizada</p>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="dashboard-preview" ref={dashboardRef}>
          <div className="preview-content reveal">
            <div className="preview-text">
              <h2>Interfaz Intuitiva y Potente</h2>
              <p>Visualiza, controla y optimiza todos tus procesos desde una única plataforma centralizada diseñada para maximizar tu productividad.</p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">✓</span>
                  Dashboard personalizable con métricas en tiempo real
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Sistema de alertas configurables para prevención de fallos
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Generación automática de reportes periódicos
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Control remoto seguro desde cualquier dispositivo
                </li>
              </ul>
              <Link to="/profile" className="preview-btn">
                Ver Dashboard
                <span className="preview-btn-icon">→</span>
              </Link>
            </div>
            <div className="preview-image">
              <img src={computadora} alt="Dashboard" className="dashboard-img reveal" />
              <div className="preview-overlay"></div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats" ref={statsRef}>
          <div className="stats-container">
            <div className="stat-item reveal">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Precisión en Control</div>
            </div>
            <div className="stat-item reveal">
              <div className="stat-value">50%</div>
              <div className="stat-label">Ahorro Energético</div>
            </div>
            <div className="stat-item reveal">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Monitoreo Continuo</div>
            </div>
            <div className="stat-item reveal">
              <div className="stat-value">+1000</div>
              <div className="stat-label">Usuarios Activos</div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="cta-section reveal">
          <h2>¿Listo para revolucionar tu producción?</h2>
          <p>Únete a más de 1,000 empresas que ya confían en ECOBLASTIC para optimizar sus procesos industriales.</p>
          <Link to="/register" className="cta-button">
            Comenzar Ahora
            <span className="cta-icon">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default InicioAut;