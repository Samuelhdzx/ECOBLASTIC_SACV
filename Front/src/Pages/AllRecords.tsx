import { useState } from 'react';
import { useGetSensorDataQuery, useGetAllUsersQuery } from '@/state/api';
import './AllRecords.css';
import { UserRecords } from './UserRecors';
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
  const { data: users } = useGetAllUsersQuery({});
  const { data: records, isLoading } = useGetSensorDataQuery({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (isLoading) return <div>Cargando registros...</div>;

  return (
    <div className="all-records-container">
      <div className="header-section">
        <h1 className="header-title">Registros Globales</h1>
        <p className="header-subtitle">Historial de Todos los Usuarios</p>

        <div className="users-overview">
          <h2>Usuarios Registrados</h2>
          <div className="users-grid">
            {users?.map((user: User) => (
              <div 
                key={user._id} 
                className="user-summary-card"
                onClick={() => setSelectedUser(user)}
              >
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p>Total registros: {records?.filter((record: SensorRecord) => record.user._id === user._id).length || 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserRecords 
          user={selectedUser}
          records={records || []}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default AllRecords;
