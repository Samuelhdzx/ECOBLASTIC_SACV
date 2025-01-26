import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    LinearProgress
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { deviceService } from '../../services/device.service';
import toast from 'react-hot-toast';

const ExportDialog = ({ open, onClose, deviceId }) => {
    const [loading, setLoading] = useState(false);
    const [exportConfig, setExportConfig] = useState({
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Último día
        endDate: new Date(),
        format: 'csv'
    });

    const handleExport = async () => {
        try {
            setLoading(true);
            await deviceService.exportData(
                deviceId,
                exportConfig.startDate,
                exportConfig.endDate,
                exportConfig.format
            );
            toast.success('Datos exportados exitosamente');
            onClose();
        } catch (error) {
            toast.error('Error al exportar los datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Exportar Datos</DialogTitle>
            <DialogContent>
                {loading && <LinearProgress sx={{ mb: 2 }} />}
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Selecciona el rango de fechas y el formato para exportar los datos del dispositivo.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Fecha de inicio"
                                value={exportConfig.startDate}
                                onChange={(newValue) => setExportConfig(prev => ({
                                    ...prev,
                                    startDate: newValue
                                }))}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Fecha de fin"
                                value={exportConfig.endDate}
                                onChange={(newValue) => setExportConfig(prev => ({
                                    ...prev,
                                    endDate: newValue
                                }))}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Formato de exportación</InputLabel>
                            <Select
                                value={exportConfig.format}
                                label="Formato de exportación"
                                onChange={(e) => setExportConfig(prev => ({
                                    ...prev,
                                    format: e.target.value
                                }))}
                            >
                                <MenuItem value="csv">CSV</MenuItem>
                                <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                                <MenuItem value="json">JSON</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleExport}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    Exportar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportDialog;
