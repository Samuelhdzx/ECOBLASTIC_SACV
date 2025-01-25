import { Router } from 'express';
import { receiveESP32Data } from '../controllers/esp32_controller.js';

const router = Router();

// Ruta para recibir datos del ESP32
router.post('/sensor-data', receiveESP32Data);

export default router;
