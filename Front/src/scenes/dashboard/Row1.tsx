import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

const Row1 = () => {
  const { data } = useGetSensorDataQuery(undefined, {
    pollingInterval: 3000
  });
  
  console.log("All records from MongoDB:", data);
  
  // Find the most recent record
  const latestRecord = data ? data[data.length - 1] : null;
  console.log("Latest record:", latestRecord);
  
  const chartData = latestRecord ? [
    {
      name: 'PET',
      value: latestRecord.polymerUsage.pet,
      fill: '#8884d8'
    },
    {
      name: 'Polipropileno',
      value: latestRecord.polymerUsage.polypropylene,
      fill: '#83a6ed'
    }
  ] : [];

  console.log("Chart data:", chartData);

  const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px'
  };

  return (
    <>
      <DashboardBox gridArea="a">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="10%" 
            outerRadius="80%" 
            barSize={10} 
            data={chartData}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="value"
            />
            <Legend 
              iconSize={10} 
              layout="vertical" 
              verticalAlign="middle" 
              wrapperStyle={style} 
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
      <DashboardBox gridArea="d"></DashboardBox>
    </>
  )
}

export default Row1;
