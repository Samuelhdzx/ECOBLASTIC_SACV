import React, { useState } from 'react';
import { useGetSensorDataQuery } from '@/state/api';
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';

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
  const theme = useTheme();

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

  if (isLoading) return <Box p={3}><Typography>Loading records...</Typography></Box>;

  const filteredRecords = filterRecords(records || []);

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Encabezado y sección de búsqueda */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Historial de Registros
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          Sistema de Monitoreo de Parámetros
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Buscar por</InputLabel>
              <Select
                label="Buscar por"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <MenuItem value="all">Todos los registros</MenuItem>
                <MenuItem value="day">Por día</MenuItem>
                <MenuItem value="month">Por mes</MenuItem>
                <MenuItem value="year">Por año</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Fecha"
              type={searchType === 'day' ? 'date' : searchType === 'month' ? 'month' : searchType === 'year' ? 'number' : 'text'}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Registros encontrados: {filteredRecords.length}
        </Typography>
      </Box>

      {/* Grid de tarjetas con registros */}
      <Grid container spacing={3}>
        {filteredRecords.map((record: SensorRecord, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Registro #{index + 1}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {format(new Date(record.date), 'PPpp')}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  🔬 Polímeros Usados
                </Typography>
                <Typography variant="body2">PET: {record.polymerUsage.pet} kg</Typography>
                <Typography variant="body2">
                  Polipropileno: {record.polymerUsage.polypropylene} kg
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  ⚡ Energía del Potenciómetro
                </Typography>
                <Typography variant="body2">
                  Utilizada: {record.potentiometerEnergy.used}%
                </Typography>
                <Typography variant="body2">
                  Restante: {record.potentiometerEnergy.remaining}%
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  🔌 Energía del Inyector
                </Typography>
                <Typography variant="body2">
                  Utilizada: {record.injectorEnergy.used}%
                </Typography>
                <Typography variant="body2">
                  Restante: {record.injectorEnergy.remaining}%
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  🔧 Uso de Moldes
                </Typography>
                <Typography variant="body2">Molde 1: {record.moldUsage.mold1} usos</Typography>
                <Typography variant="body2">Molde 2: {record.moldUsage.mold2} usos</Typography>
                <Typography variant="body2">Molde 3: {record.moldUsage.mold3} usos</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  🌡️ Parámetros Adicionales
                </Typography>
                <Typography variant="body2">
                  Temperatura: {record.temperature}°C
                </Typography>
                <Typography variant="body2">
                  Tiempo de Inyección: {record.injectionTime}s
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Profile;
