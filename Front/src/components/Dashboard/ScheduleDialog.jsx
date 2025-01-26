import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    FormControlLabel,
    Checkbox,
    TextField,
    Typography,
    Box
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { deviceService } from '../../services/device.service';
import toast from 'react-hot-toast';

const ScheduleDialog = ({ open, onClose, deviceId }) => {
    const [schedule, setSchedule] = useState({
        enabled: false,
        days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        },
        startTime: new Date(),
        endTime: new Date(),
        interval: 5
    });

    useEffect(() => {
        if (deviceId && open) {
            loadSchedule();
        }
    }, [deviceId, open]);

    const loadSchedule = async () => {
        try {
            const currentSchedule = await deviceService.getMonitoringSchedule(deviceId);
            setSchedule(currentSchedule);
        } catch (error) {
            toast.error('Error al cargar la programación');
        }
    };

    const handleSave = async () => {
        try {
            await deviceService.setMonitoringSchedule(deviceId, schedule);
            toast.success('Programación guardada exitosamente');
            onClose();
        } catch (error) {
            toast.error('Error al guardar la programación');
        }
    };

    const handleDayChange = (day) => {
        setSchedule(prev => ({
            ...prev,
            days: {
                ...prev.days,
                [day]: !prev.days[day]
            }
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Programar Monitoreo</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={schedule.enabled}
                                    onChange={(e) => setSchedule(prev => ({
                                        ...prev,
                                        enabled: e.target.checked
                                    }))}
                                    color="primary"
                                />
                            }
                            label="Habilitar programación"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            Días de monitoreo
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {Object.entries(schedule.days).map(([day, checked]) => (
                                <FormControlLabel
                                    key={day}
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={() => handleDayChange(day)}
                                            color="primary"
                                        />
                                    }
                                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Hora de inicio"
                                value={schedule.startTime}
                                onChange={(newValue) => setSchedule(prev => ({
                                    ...prev,
                                    startTime: newValue
                                }))}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                label="Hora de fin"
                                value={schedule.endTime}
                                onChange={(newValue) => setSchedule(prev => ({
                                    ...prev,
                                    endTime: newValue
                                }))}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Intervalo de medición (minutos)"
                            value={schedule.interval}
                            onChange={(e) => setSchedule(prev => ({
                                ...prev,
                                interval: parseInt(e.target.value)
                            }))}
                            InputProps={{ inputProps: { min: 1, max: 60 } }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleDialog;
