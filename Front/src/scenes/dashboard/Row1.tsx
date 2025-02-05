import DashboardBox from '@/components/DashboardBox'
import { useGetSensorDataQuery } from '@/state/api';
import { ResponsiveContainer, PieChart,  Pie } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
        name: 'Utilizada',
        value: latestRecord.potentiometerEnergy.used,
        fill: palette.secondary[200]
      },
      {
        name: 'Restante',
        value: latestRecord.potentiometerEnergy.remaining,
        fill : palette.primary[700]
      }
    ] : [];

    const chartData3 = latestRecord ? [
      {
        name: 'Utilizada',
        value: latestRecord.injectorEnergy.used,
        fill: palette.secondary[200]
      },
      {
        name: 'Restante',
        value: latestRecord.injectorEnergy.remaining,
        fill : palette.primary[600]
      }
    ] : [];

    const [sensorData, setSensorData] = useState<{ temperature: number; humidity: number; timestamp: string }[]>([]);

    useEffect(() => {
      const ws = new WebSocket('ws://localhost:8000');

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Data received:', data);
        setSensorData((prevData) => [...prevData, data]);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        ws.close();
      };
    }, []);

    const chartData4 = {
      labels: sensorData.map((d) => new Date(d.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Temperature',
          data: sensorData.map((d) => d.temperature),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Humidity',
          data: sensorData.map((d) => d.humidity),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };

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
          <Pie data={chartData2} dataKey="value" cx="50%" cy="50%" innerRadius={130} outerRadius={150}  label />
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
          <Pie data={chartData3} dataKey="value" cx="50%" cy="50%" innerRadius={130} outerRadius={150}  label />
        </PieChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="d">
        <h2>Sensor Data - DHT22</h2>
        <Line data={chartData4} />
      </DashboardBox>
    </>
  )
}

export default Row1;