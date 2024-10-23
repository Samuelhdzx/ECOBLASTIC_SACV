import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from '@mui/material';

const Row2 = () => {

  const { palette } = useTheme();
  const { data } = useGetSensorDataQuery(undefined, {
    pollingInterval: 3000
  });

  const latestRecord = data ? data[data.length - 1] : null;

  const COLORS = [palette.primary[500], palette.secondary[500], palette.tertiary[500]];

  const chartData4 = latestRecord ? [
    {
      name: 'Molde 1',
      value: latestRecord.moldUsage.mold1,
    },
    {
      name: 'Molde 2',
      value: latestRecord.moldUsage.mold2,
    },
    {
      name: 'Molde 3',
      value: latestRecord.moldUsage.mold3,
    }
  ] : [];

    const renderCustomizedLabel = ({ cx, cy, percent, innerRadius, outerRadius, midAngle}) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
   

  return (
    <>
      <DashboardBox gridArea="d">
       <BoxHeader
      title="Veces de uso por molde"
      /> 

        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData4}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              dataKey="value"
            >
              {chartData4.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2;
