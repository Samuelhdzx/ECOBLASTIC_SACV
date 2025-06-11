import { Grid } from '@mui/material';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardBox, BoxHeader } from '../DashboardBox';
import { useGetSensorDataQuery } from '@/state/api';

const QualitySection = () => {
  const { data: sensorData, isLoading, error } = useGetSensorDataQuery();

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (error || !sensorData || !Array.isArray(sensorData) || sensorData.length === 0) {
    return <div>Error al cargar los datos</div>;
  }

  console.log('Datos del sensor:', sensorData); // Añade este log

  // Modifica el mapeo para ver la estructura
  const qualityData = sensorData.map(record => {
    console.log('Registro individual:', record);
    return {
      defectRate: record?.quality?.defectRate || 0,
      goodPieces: record?.quality?.defectRate ? (100 - record.quality.defectRate) : 100
    };
  });

  console.log('Datos procesados:', qualityData);

  // Procesar datos para el gráfico de barras de material con valores predeterminados
  const materialData = sensorData.map(record => ({
    type: 'Material',
    used: (record?.polymerUsage?.pet || 0) + (record?.polymerUsage?.polypropylene || 0),
    waste: record?.quality?.materialWaste || 0
  }));

  // Usar el primer registro de datos para el gráfico circular
  const pieChartData = [
    { 
      name: 'Piezas Correctas', 
      value: qualityData[0]?.goodPieces || 100 
    },
    { 
      name: 'Piezas Defectuosas', 
      value: qualityData[0]?.defectRate || 0 
    }
  ];

  return (
    <>
      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Porcentaje de Defectos" />
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                label
                fill="#8884d8"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <DashboardBox>
          <BoxHeader title="Consumo de Material" />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="used" fill="#3a86ff" name="Material Utilizado" />
              <Bar dataKey="waste" fill="#ff006e" name="Material Desperdiciado" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
      </Grid>
    </>
  );
};

export default QualitySection;
