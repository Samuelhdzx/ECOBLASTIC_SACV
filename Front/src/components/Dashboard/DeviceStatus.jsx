import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Switch,
    FormControlLabel,
    Button,
    Divider
} from '@mui/material';
import {
    ThermostatAuto,
    WaterDrop,
    AccessTime,
    LocationOn,
    Schedule,
    CloudDownload
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { deviceService } from '../../services/device.service';
import ScheduleDialog from './ScheduleDialog';
import ExportDialog from './ExportDialog';
import toast from 'react-hot-toast';

const DeviceStatus = ({ device }) => {
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);

    if (!device) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    Selecciona un dispositivo para ver sus detalles
                </Typography>
            </Box>
        );
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const handleCalibrate = async () => {
        try {
            await deviceService.calibrateSensor(device.deviceId);
            toast.success('Sensor calibrado exitosamente');
        } catch (error) {
            toast.error('Error al calibrar el sensor');
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Estado del Dispositivo
            </Typography>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <ThermostatAuto color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Última Temperatura: {device.lastTemperature}°C
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <WaterDrop color="secondary" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Última Humedad: {device.lastHumidity}%
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AccessTime color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Última Actualización: {formatDate(device.lastSeen)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LocationOn color="error" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Ubicación: {device.location || 'No especificada'}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 2 }} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={device.monitoring}
                                            onChange={() => {/* Implementar toggle monitoreo */}}
                                            color="primary"
                                        />
                                    }
                                    label="Monitoreo Activo"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleCalibrate}
                                    sx={{ mb: 1 }}
                                >
                                    Calibrar Sensor
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    startIcon={<Schedule />}
                                    onClick={() => setScheduleOpen(true)}
                                    sx={{ mb: 1 }}
                                >
                                    Programar Monitoreo
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="info"
                                    fullWidth
                                    startIcon={<CloudDownload />}
                                    onClick={() => setExportOpen(true)}
                                >
                                    Exportar Datos
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </motion.div>

            <ScheduleDialog
                open={scheduleOpen}
                onClose={() => setScheduleOpen(false)}
                deviceId={device.deviceId}
            />

            <ExportDialog
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                deviceId={device.deviceId}
            />
        </Box>
    );
};

export default DeviceStatus;
