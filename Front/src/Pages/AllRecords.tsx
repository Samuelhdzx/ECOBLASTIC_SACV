import { useState, useEffect } from 'react';
import { useGetSensorDataQuery, useGetAllUsersQuery } from '@/state/api';
import './AllRecords.css';

interface User {
  _id: string;
  username: string;
  email: string;
}

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
  user: User;
}

const AllRecords = () => {
  const { data: records = [], isLoading, error } = useGetSensorDataQuery({}) as {
    data: SensorRecord[];
    isLoading: boolean;
    error: any;
  };
  const { data: allUsers = [] } = useGetAllUsersQuery({});
  const [searchUsername, setSearchUsername] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('all');

  // Debug logs
  useEffect(() => {
    console.log('Records:', records);
    console.log('Users:', allUsers);
    console.log('API Error:', error);
  }, [records, allUsers, error]);

  const filterRecords = (records: SensorRecord[]): SensorRecord[] => {
    if (!Array.isArray(records)) return [];
    
    return records.filter(record => {
      // Username matching
      const usernameMatch = !searchUsername || 
        record.user.username.toLowerCase().includes(searchUsername.toLowerCase());

      // Date matching
      let dateMatch = true;
      if (searchDate && searchType !== 'all') {
        const recordDate = new Date(record.date);
        const searchDateObj = new Date(searchDate);

        switch (searchType) {
          case 'day':
            dateMatch = recordDate.getDate() === searchDateObj.getDate() &&
                       recordDate.getMonth() === searchDateObj.getMonth() &&
                       recordDate.getFullYear() === searchDateObj.getFullYear();
            break;
          case 'month':
            dateMatch = recordDate.getMonth() === searchDateObj.getMonth() &&
                       recordDate.getFullYear() === searchDateObj.getFullYear();
            break;
          case 'year':
            dateMatch = recordDate.getFullYear() === searchDateObj.getFullYear();
            break;
        }
      }

      return usernameMatch && dateMatch;
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando registros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error al cargar los registros: {error.message}</p>
      </div>
    );
  }

  const filteredRecords = filterRecords(records);

  return (
    <div className="all-records-container">
      <div className="header-section">
        <h1 className="header-title">Registros Globales</h1>
        <p className="header-subtitle">Historial de Todos los Usuarios</p>

        <div className="search-controls">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className="search-input"
          />

          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="search-select"
          >
            <option value="all">Todos los registros</option>
            <option value="day">Buscar por día</option>
            <option value="month">Buscar por mes</option>
            <option value="year">Buscar por año</option>
          </select>

          {searchType !== 'all' && (
            <input
              type={searchType === 'day' ? 'date' : searchType === 'month' ? 'month' : 'number'}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="search-input"
              min={searchType === 'year' ? '2000' : undefined}
              max={searchType === 'year' ? '2100' : undefined}
            />
          )}
        </div>

        <div className="results-summary">
          Total registros encontrados: {filteredRecords.length}
        </div>
      </div>

      <div className="records-grid">
        {filteredRecords.map((record, index) => (
          <div key={index} className="record-card">
            <div className="record-header">
              <span className="record-number">Registro #{index + 1}</span>
              <span className="record-date">{new Date(record.date).toLocaleString()}</span>
              <span className="record-user">{record.user.username}</span>
            </div>

            <div className="record-content">
              <div className="data-section">
                <h3 className="section-title">🔬 Polímeros Usados</h3>
                <div className="data-value">
                  <span>PET:</span>
                  <span>{record.polymerUsage.pet} kg</span>
                </div>
                <div className="data-value">
                  <span>Polipropileno:</span>
                  <span>{record.polymerUsage.polypropylene} kg</span>
                </div>
              </div>

              <div className="data-section">
                <h3 className="section-title">⚡ Energía del Potenciómetro</h3>
                <div className="data-value">
                  <span>Utilizada:</span>
                  <span>{record.potentiometerEnergy.used}%</span>
                </div>
                <div className="data-value">
                  <span>Restante:</span>
                  <span>{record.potentiometerEnergy.remaining}%</span>
                </div>
              </div>

              <div className="data-section">
                <h3 className="section-title">🔌 Energía del Inyector</h3>
                <div className="data-value">
                  <span>Utilizada:</span>
                  <span>{record.injectorEnergy.used}%</span>
                </div>
                <div className="data-value">
                  <span>Restante:</span>
                  <span>{record.injectorEnergy.remaining}%</span>
                </div>
              </div>

              <div className="data-section">
                <h3 className="section-title">🔧 Uso de Moldes</h3>
                <div className="data-value">
                  <span>Molde 1:</span>
                  <span>{record.moldUsage.mold1} usos</span>
                </div>
                <div className="data-value">
                  <span>Molde 2:</span>
                  <span>{record.moldUsage.mold2} usos</span>
                </div>
                <div className="data-value">
                  <span>Molde 3:</span>
                  <span>{record.moldUsage.mold3} usos</span>
                </div>
              </div>

              <div className="data-section">
                <h3 className="section-title">🌡️ Parámetros Adicionales</h3>
                <div className="data-value">
                  <span>Temperatura:</span>
                  <span>{record.temperature}°C</span>
                </div>
                <div className="data-value">
                  <span>Tiempo de Inyección:</span>
                  <span>{record.injectionTime}s</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecords;
