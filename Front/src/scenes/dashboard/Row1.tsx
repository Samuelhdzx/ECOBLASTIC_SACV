import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, PieChart,  Pie } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from '@mui/material';

  const Row1 = () => {
    const { palette } = useTheme();
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
        fill: palette.secondary[100]
      },
      {
        name: 'Polipropileno',
        value: latestRecord.polymerUsage.polypropylene,
        fill : palette.primary[200]
      }
    ] : [];

    const chartData2 = latestRecord ? [
      {
        name: 'Energia Utilizada',
        value: latestRecord.potentiometerEnergy.used,
        fill: palette.secondary[200]
      },
      {
        name: 'Energia Restante',
        value: latestRecord.potentiometerEnergy.remaining,
        fill : palette.primary[700]
      }
    ] : [];

    const chartData3 = latestRecord ? [
      {
        name: 'Energia Utilizada',
        value: latestRecord.injectorEnergy.used,
        fill: palette.secondary[200]
      },
      {
        name: 'Energia Restante',
        value: latestRecord.injectorEnergy.remaining,
        fill : palette.primary[600]
      }
    ] : [];




  return (
    <>
      <DashboardBox gridArea="a">
      <BoxHeader
      title="Plasticos Empleados"
      />
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={300} height={300}>
          <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={10} label={({name}) => `${name}`} />
          <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={130} outerRadius={150}  label />
        </PieChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
      <BoxHeader
      title="Energía del Potenciómetro"
      />
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={300} height={300}>
          <Pie data={chartData2} dataKey="value" cx="50%" cy="50%" outerRadius={10} label={({name}) => `${name}`} />
          <Pie data={chartData2} dataKey="value" cx="50%" cy="50%" innerRadius={160} outerRadius={180}  label />
        </PieChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
      <BoxHeader
      title="Energia de la Resistencia  "
      />
      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={300} height={300}>
          <Pie data={chartData3} dataKey="value" cx="50%" cy="50%" outerRadius={10} label={({name}) => `${name}`} />
          <Pie data={chartData3} dataKey="value" cx="50%" cy="50%" innerRadius={160} outerRadius={180}  label />
        </PieChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1;
