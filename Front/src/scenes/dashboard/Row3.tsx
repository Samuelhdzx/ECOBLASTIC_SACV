import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, LineChart, AreaChart, Area, Line } from 'recharts';
import BoxHeader from '@/components/BoxHeader';

const Row3 = () => {
  const { data } = useGetSensorDataQuery(undefined, {
    pollingInterval: 3000
  });
  
  console.log("All records from MongoDB:", data);
  
  // Find the most recent record
  const latestRecord = data ? data[data.length - 1] : null;
  console.log("Latest record:", latestRecord);
  
  // const chartData7 = latestRecord ? [
  //   {
  //     name: 'Temperature',
  //     value: latestRecord.temperature,
  //     fill: palette.secondary[100]
  //   },
  // ] : [];
  // const chartData8 = latestRecord ? [
  //   {
  //     name: 'Tiempo',
  //     value: latestRecord.injectionTime,
  //     fill: palette.secondary[600]
  //   },
  // ] : [];

  
  return (
    <>
    <DashboardBox  gridArea="h">
    <BoxHeader
      title="Grafico de Temperatura">
    </BoxHeader>
    <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
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