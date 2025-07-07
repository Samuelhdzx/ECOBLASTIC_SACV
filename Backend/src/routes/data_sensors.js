import {Router} from "express";
import { validateToken } from "../middlewares/validateToken.js";
import data_sensorsSchema from "../models/data_sensors.js";
import { getDatas, getData, createData, updateData, deleteData, getAllDataForAnalysis } from "../controllers/dash_controller.js";
import { addSensorData, getAllSensorData, getSensorDataById, finalizeMonitoring, getActiveMonitoring } from "../controllers/esp32_controller.js";

const router = Router();

//ENDPOINTS EXISTENTES
// get all dates
router.get('/data_sensors', validateToken, getDatas);

// get all data for advanced analysis (admin only)
router.get('/data_sensors-analysis', validateToken, getAllDataForAnalysis);

// get a date
router.get('/data_sensors/:id', validateToken, getData);

//create date
router.post('/data_sensors', validateToken, createData);

// update a date
router.put('/data_sensors/:id', validateToken, updateData);

// delete a date
router.delete('/data_sensors/:id', validateToken, deleteData);

// NUEVOS ENDPOINTS PARA EL FORMULARIO MEJORADO
// Add sensor data from frontend form (inicio del monitoreo)
router.post('/sensor-data', validateToken, addSensorData);

// Get all sensor data (nuevo endpoint)
router.get('/sensor-data', validateToken, getAllSensorData);

// Get sensor data by ID (nuevo endpoint)
router.get('/sensor-data/:id', validateToken, getSensorDataById);

// Finalizar monitoreo y agregar datos de calidad
router.put('/sensor-data/:id/finalize', validateToken, finalizeMonitoring);

// Get active monitoring processes
router.get('/active-monitoring', validateToken, getActiveMonitoring);

export default router;