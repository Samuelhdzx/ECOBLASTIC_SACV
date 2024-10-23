import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine, Line} from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from '@mui/material';

const Row3 = () => {
  const { palette } = useTheme();
  const { data } = useGetSensorDataQuery(undefined, {
    pollingInterval: 3000
  });
  
  console.log("All records from MongoDB:", data);
  
  // Find the most recent record
  const latestRecord = data ? data[data.length - 1] : null;
  console.log("Latest record:", latestRecord);
  
  const chartData5 = latestRecord ? [
    {
      name: 'Temperature',
      value: latestRecord.temperature,
      fill: palette.secondary[100]
    },
  ] : [];
  const chartData6 = latestRecord ? [
    {
      name: 'Tiempo',
      value: latestRecord.injectionTime,
      fill: palette.secondary[600]
    },
  ] : [];

  return (
    <>
    <DashboardBox  gridArea="h">
    <BoxHeader
      title="Grafico de Temperatura">
    </BoxHeader>
    <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox  gridArea="i">
    <BoxHeader
      title="Grafico de Tiempo">
    </BoxHeader>
    <ResponsiveContainer width="100%" height="90%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="injectionTime" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    </DashboardBox>
    </>
  )

}

export default Row3;