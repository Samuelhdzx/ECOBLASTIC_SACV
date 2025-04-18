import React, { useState } from 'react';
import { useGetSensorDataQuery } from '@/state/api';
import { format } from 'date-fns';
import './profile.css';

interface SensorRecord {
  date: string;
  polymerUsage: {
    pet: number;
    polypropylene: number;
  };
  potentiometerEnergy: {
    used: number;
    remaining: number;
  };
  injectorEnergy: {
    used: number;
    remaining: number;
  };
  moldUsage: {
    mold1: number;
    mold2: number;
    mold3: number;
  };
  temperature: number;
  injectionTime: number;
}

// Función que genera una cadena en formato "yyyy-MM-dd" en hora local
const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Profile = () => {
  const { data: records, isLoading } = useGetSensorDataQuery({});
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('all'); // 'all', 'day', 'month', 'year'
  const [activeRecord, setActiveRecord] = useState<number | null>(null);

  const filterRecords = (records: SensorRecord[]) => {
    if (!searchDate) return records;
    return records.filter((record) => {
      const recordDateStr = getLocalDateString(new Date(record.date));
      // searchDate ya viene en formato "yyyy-MM-dd" cuando type="date"
      switch (searchType) {
        case 'day':
          return recordDateStr === searchDate;
        case 'month':
          return recordDateStr.slice(0, 7) === searchDate.slice(0, 7);
        case 'year':
          return recordDateStr.slice(0, 4) === searchDate.slice(0, 4);
        default:
          return true;
      }
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Cargando datos de producción...</p>
      </div>
    );
  }

  const filteredRecords = filterRecords(records || []);
  
  // Formatear la fecha para mostrar con hora
  const formatRecordDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy HH:mm'); // Formato con día, mes, año y hora
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  return (
    <div className="profile-container">
      {/* Encabezado */}
      <header className="header-section">
        <div className="header-content">
          <h1 className="header-title">Sistema de Monitoreo Industrial</h1>
          <p className="header-subtitle">Panel de Control de Parámetros</p>
        </div>
        <div className="header-indicator">
          <div className="indicator-dot"></div>
          <span>Sistema activo</span>
        </div>
      </header>

      {/* Sección de búsqueda */}
      <div className="search-section">
        <div className="search-title">
          <span className="search-icon">🔍</span>
          <h2>Filtrar Registros</h2>
        </div>
        
        <div className="search-controls">
          <div className="search-group">
            <label htmlFor="search-type">Tipo de búsqueda</label>
            <select
              id="search-type"
              className="search-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">Todos los registros</option>
              <option value="day">Por día</option>
              <option value="month">Por mes</option>
              <option value="year">Por año</option>
            </select>
          </div>
          
          <div className="search-group">
            <label htmlFor="search-date">Fecha</label>
            <input
              id="search-date"
              className="search-input"
              type={searchType === 'day' ? 'date' : searchType === 'month' ? 'month' : searchType === 'year' ? 'number' : 'text'}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder={searchType === 'year' ? 'Ingrese el año' : ''}
            />
          </div>
        </div>
        
        <div className="results-badge">
          <div className="results-icon">
            <span>📊</span>
          </div>
          <div className="results-text">
            <span className="results-count">{filteredRecords.length}</span>
            <span className="results-label">registros encontrados</span>
          </div>
        </div>
      </div>

      {/* Grid de registros */}
      {filteredRecords.length > 0 ? (
        <div className="records-wrapper">
          <div className="record-tabs">
            {filteredRecords.map((record, index) => (
              <div 
                key={`tab-${index}`} 
                className={`record-tab ${activeRecord === index ? 'active' : ''}`}
                onClick={() => setActiveRecord(index)}
              >
                <div className="tab-content">
                  <span className="tab-number">{index + 1}</span>
                  <div className="tab-datetime">
                    <span className="tab-date">{formatRecordDate(record.date).split(' ')[0]}</span>
                    <span className="tab-time">{formatRecordDate(record.date).split(' ')[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="records-container">
            {filteredRecords.map((record, index) => (
              <div 
                key={`record-${index}`} 
                className={`record-grid ${activeRecord === index ? 'active' : ''}`}
              >
                {/* Tarjeta de polímeros */}
                <div className="data-card polymer-card">
                  <div className="card-header">
                    <span className="card-icon">🧪</span>
                    <h3 className="card-title">Polímeros Utilizados</h3>
                  </div>
                  <div className="card-content">
                    <div className="data-grid">
                      <div className="data-item">
                        <div className="data-label">PET</div>
                        <div className="data-value">{record.polymerUsage.pet} kg</div>
                      </div>
                      <div className="data-item">
                        <div className="data-label">Polipropileno</div>
                        <div className="data-value">{record.polymerUsage.polypropylene} kg</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                                  {/* Tarjeta de estado energético */}
                <div className="data-card energy-card">
                  <div className="card-header">
                    <span className="card-icon">⚡</span>
                    <h3 className="card-title">Estado Energético</h3>
                  </div>
                  <div className="card-content">
                    <div className="energy-meters">
                      <div className="energy-meter">
                        <div className="meter-label">
                          <span>Potenciómetro</span>
                          <span className="meter-percentage">{record.potentiometerEnergy.used}%</span>
                        </div>
                        <div className="meter-bar">
                          <div 
                            className={`meter-fill ${record.potentiometerEnergy.used > 75 ? 'high' : record.potentiometerEnergy.used > 50 ? 'medium' : record.potentiometerEnergy.used > 25 ? 'low' : 'safe'}`}
                            style={{ width: `${record.potentiometerEnergy.used}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="energy-meter">
                        <div className="meter-label">
                          <span>Inyector</span>
                          <span className="meter-percentage">{record.injectorEnergy.used}%</span>
                        </div>
                        <div className="meter-bar">
                          <div 
                            className={`meter-fill ${record.injectorEnergy.used > 75 ? 'high' : record.injectorEnergy.used > 50 ? 'medium' : record.injectorEnergy.used > 25 ? 'low' : 'safe'}`}
                            style={{ width: `${record.injectorEnergy.used}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tarjeta de uso de moldes */}
                <div className="data-card mold-card">
                  <div className="card-header">
                    <span className="card-icon">🔧</span>
                    <h3 className="card-title">Uso de Moldes</h3>
                  </div>
                  <div className="card-content">
                    <div className="mold-grid">
                      <div className="mold-item">
                        <div className="mold-label">Molde 1</div>
                        <div className="mold-value">{record.moldUsage.mold1}</div>
                        <div className="mold-unit">usos</div>
                      </div>
                      <div className="mold-item">
                        <div className="mold-label">Molde 2</div>
                        <div className="mold-value">{record.moldUsage.mold2}</div>
                        <div className="mold-unit">usos</div>
                      </div>
                      <div className="mold-item">
                        <div className="mold-label">Molde 3</div>
                        <div className="mold-value">{record.moldUsage.mold3}</div>
                        <div className="mold-unit">usos</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tarjeta de parámetros adicionales */}
                <div className="data-card parameters-card">
                  <div className="card-header">
                    <span className="card-icon">📊</span>
                    <h3 className="card-title">Parámetros Adicionales</h3>
                  </div>
                  <div className="card-content">
                    <div className="parameters-grid">
                      <div className="parameter-item">
                        <div className="parameter-icon">🌡️</div>
                        <div className="parameter-info">
                          <div className="parameter-label">Temperatura</div>
                          <div className="parameter-value">{record.temperature}°C</div>
                        </div>
                      </div>
                      <div className="parameter-item">
                        <div className="parameter-icon">⏱️</div>
                        <div className="parameter-info">
                          <div className="parameter-label">Tiempo Inyección</div>
                          <div className="parameter-value">{record.injectionTime}s</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Mensaje cuando no hay registros
        <div className="no-records">
          <div className="no-records-icon">📊</div>
          <h3>No se encontraron registros</h3>
          <p>Intenta cambiar los criterios de búsqueda o verifica que existan datos para el período seleccionado.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;