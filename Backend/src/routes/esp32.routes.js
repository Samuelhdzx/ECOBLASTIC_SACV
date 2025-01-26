import { Router } from 'express';
import {
    getDevices,
    getDeviceById,
    updateDevice,
    getDeviceData,
    calibrateSensor,
    getSchedule,
    updateSchedule,
    exportData
} from '../controllers/esp32_controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

// Rutas protegidas con autenticación
router.use(authRequired);

// Dispositivos
router.get('/devices', async (req, res) => {
    try {
        const devices = await getDevices();
        res.json(devices);
    } catch (error) {
        console.error('Error fetching devices:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

router.get('/devices/:id', async (req, res) => {
    try {
        const device = await getDeviceById(req.params.id);
        if (!device) {
            res.status(404).json({ message: 'Device not found' });
        } else {
            res.json(device);
        }
    } catch (error) {
        console.error('Error fetching device:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

router.put('/devices/:id', async (req, res) => {
    try {
        const device = await updateDevice(req.params.id, req.body);
        res.json(device);
    } catch (error) {
        console.error('Error updating device:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

router.get('/devices/:id/data', async (req, res) => {
    try {
        const data = await getDeviceData(req.params.id);
        res.json(data);
    } catch (error) {
        console.error('Error fetching device data:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

// Calibración
router.post('/devices/:id/calibrate', async (req, res) => {
    try {
        const result = await calibrateSensor(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        console.error('Error calibrating sensor:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

// Programación
router.get('/devices/:id/schedule', async (req, res) => {
    try {
        const schedule = await getSchedule(req.params.id);
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

router.post('/devices/:id/schedule', async (req, res) => {
    try {
        const result = await updateSchedule(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        console.error('Error updating schedule:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

// Exportación
router.get('/devices/:id/export', async (req, res) => {
    try {
        const data = await exportData(req.params.id);
        res.json(data);
    } catch (error) {
        console.error('Error exporting data:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Internal Server Error' });
    }
});

export default router;
