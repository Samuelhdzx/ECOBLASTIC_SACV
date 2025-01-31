import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import DeviceList from '../../components/Dashboard/DeviceList';
import TemperatureChart from '../../components/Dashboard/TemperatureChart';
import HumidityChart from '../../components/Dashboard/HumidityChart';
import DeviceStatus from '../../components/Dashboard/DeviceStatus';
import AlertsPanel from '../../components/Dashboard/AlertsPanel';
import { wsService } from '../../services/websocket.service';

const Dashboard = () => {
    const [devices, setDevices] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = React.useState(null);
    const [sensorData, setSensorData] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);

    React.useEffect(() => {
        // Cargar dispositivos iniciales
        fetchDevices();

        // Suscribirse a actualizaciones
        const sensorSub = wsService.subscribe('sensor_data', handleSensorData);
        const statusSub = wsService.subscribe('device_status', handleDeviceStatus);
        const alertSub = wsService.subscribe('temperature_alert', handleAlert);

        return () => {
            sensorSub();
            statusSub();
            alertSub();
        };
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/esp32/devices');
            const data = await response.json();
            setDevices(data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const handleSensorData = (data) => {
        setSensorData(prev => [...prev, data].slice(-100)); // Mantener últimos 100 registros
    };

    const handleDeviceStatus = (data) => {
        setDevices(prev => prev.map(device => 
            device.deviceId === data.deviceId 
                ? { ...device, status: data.status }
                : device
        ));
    };

    const handleAlert = (alert) => {
        setAlerts(prev => [...prev, alert].slice(-10)); // Mantener últimas 10 alertas
    };

    const handleDeviceSelect = (device) => {
        setSelectedDevice(device);
        wsService.subscribeToDevice(device.deviceId);
    };

    return (
        <Container maxWidth="xl">
            <Toaster position="top-right" />
            
            <Box sx={{ py: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" gutterBottom>
                        ECOBLASTIC Monitor
                    </Typography>
                </motion.div>

                <Grid container spacing={3}>
                    {/* Lista de Dispositivos */}
                    <Grid item xs={12} md={3}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <DeviceList
                                devices={devices}
                                selectedDevice={selectedDevice}
                                onDeviceSelect={handleDeviceSelect}
                            />
                        </motion.div>
                    </Grid>

                    {/* Gráficos y Estado */}
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <TemperatureChart data={sensorData} />
                                </motion.div>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <HumidityChart data={sensorData} />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Estado y Alertas */}
                    <Grid item xs={12} md={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <DeviceStatus device={selectedDevice} />
                                </motion.div>
                            </Grid>
                            <Grid item xs={12}>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                >
                                    <AlertsPanel alerts={alerts} />
                                </motion.div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
