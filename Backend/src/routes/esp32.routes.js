import { Router } from 'express';
import { receiveESP32Data } from '../controllers/esp32_controller.js';
import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';

const router = Router();

// Define a schema for the sensor data
const sensorDataSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now }
});

// Create a model for sensor data
const SensorData = mongoose.model('SensorData', sensorDataSchema);

const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    const data = JSON.parse(message);
    // Create a new document in the database
    const sensorData = new SensorData(data);
    sensorData.save()
      .then(() => console.log('Datos del sensor guardados en la base de datos'))
      .catch(err => console.error('Error al guardar los datos del sensor:', err));
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Ruta para recibir datos del ESP32
router.post('/sensor-data', receiveESP32Data);

// Ruta para recibir datos de temperatura y humedad del Arduino
router.post('/datos', receiveESP32Data);

export default router;
