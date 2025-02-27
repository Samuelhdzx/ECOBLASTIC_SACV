import { useGetSensorDataQuery } from '@/state/api';
import { useState } from 'react';
import './Profile.css';

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

const Profile = () => {
  const { data: records, isLoading } = useGetSensorDataQuery({});
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('all'); // 'all', 'day', 'month', 'year'

  const filterRecords = (records: SensorRecord[]) => {
    if (!searchDate) return records;

    return records?.filter((record) => {
      const recordDate = new Date(record.date);
      const searchDateObj = new Date(searchDate);

      switch (searchType) {
        case 'day':
          return (
            recordDate.getUTCDate() === searchDateObj.getUTCDate() &&
            recordDate.getUTCMonth() === searchDateObj.getUTCMonth() &&
            recordDate.getUTCFullYear() === searchDateObj.getUTCFullYear()
          );
        case 'month':
          return (
            recordDate.getUTCMonth() === searchDateObj.getUTCMonth() &&
            recordDate.getUTCFullYear() === searchDateObj.getUTCFullYear()
          );
        case 'year':
          return recordDate.getUTCFullYear() === searchDateObj.getUTCFullYear();
        default:
          return true;
      }
    });
  };

  if (isLoading) return <div>Loading records...</div>;

  const filteredRecords = filterRecords(records || []);

  return (
    <div className="profile-container">
      <div className="header-section">
      <h1 className="header-title">Historial de Registros</h1>

        <p className="header-subtitle">Sistema de Monitoreo de Parámetros</p>

        {/* Search Menu */}
        <div className="search-section">
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

          <input
            type={
              searchType === 'day'
                ? 'date'
                : searchType === 'month'
                ? 'month'
                : 'year'
            }
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="results-summary">
          Registros encontrados: {filteredRecords.length}
        </div>
      </div>

      <div className="records-grid">
        {filteredRecords.map((record: SensorRecord, index: number) => (
          <div key={index} className="record-card">
            <div className="record-header">
              <span className="record-number">Registro #{index + 1}</span>
              <span className="record-date">
                {new Date(record.date).toLocaleString()}
              </span>
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

export default Profile;
