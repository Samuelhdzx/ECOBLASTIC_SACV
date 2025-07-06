import {Router} from "express";
import { authRequired } from "../middlewares/validateToken.js";
import data_sensorsSchema from "../models/data_sensors.js";
import { getDatas, getData, createData, updateData, deleteData } from "../controllers/dash_controller.js";
import { addSensorData, getAllSensorData, getSensorDataById } from "../controllers/esp32_controller.js";

const router = Router();

//ENDPOINTS EXISTENTES
// get all dates
router.get('/data_sensors', authRequired, getDatas);

// get a date
router.get('/data_sensors/:id', authRequired, getData);

//create date
router.post('/data_sensors', authRequired, createData);

// update a date
router.put('/data_sensors/:id', authRequired, updateData);

// delete a date
router.delete('/data_sensors/:id', authRequired, deleteData);

// NUEVOS ENDPOINTS PARA EL FORMULARIO MEJORADO
// Add sensor data from frontend form
router.post('/sensor-data', authRequired, addSensorData);

// Get all sensor data (nuevo endpoint)
router.get('/sensor-data', authRequired, getAllSensorData);

// Get sensor data by ID (nuevo endpoint)
router.get('/sensor-data/:id', authRequired, getSensorDataById);

export default router;