// ============================================
// Import Dependencies
// ============================================
import Device from "../models/device.model.js";         // Modelo para los dispositivos
import SensorData from "../models/sensor.model.js";     // Modelo para los datos del sensor
import mqttService from "../services/mqtt.service.js";  // Servicio MQTT para comunicación
import scheduleService from '../services/schedule.service.js';  // Servicio de programación
import exportService from '../services/export.service.js';      // Servicio de exportación

/**
 * Recibe y almacena los datos del sensor ESP32
 * Esta función se llama cada vez que el ESP32 envía nuevos datos
 */
export const receiveESP32Data = async (req, res) => {
    try {
        // Aceptar ambos formatos de ID (deviceId o device_id)
        const deviceId = req.body.deviceId || req.body.device_id;
        const { temperature, humidity } = req.body;
        
        // Validar que todos los campos requeridos estén presentes
        if (!deviceId || !temperature || !humidity) {
            console.error('Missing required fields:', { deviceId, temperature, humidity });
            return res.status(400).json({ 
                message: 'Missing required fields', 
                required: ['deviceId/device_id', 'temperature', 'humidity'], 
                error: 'Invalid request' 
            });
        }

        // Validar que los datos sean numéricos
        if (isNaN(temperature) || isNaN(humidity)) {
            console.error('Invalid data types:', { temperature, humidity });
            return res.status(400).json({ 
                message: 'Invalid data types', 
                required: ['temperature', 'humidity'], 
                error: 'Invalid request' 
            });
        }

        // Guardar los datos del sensor en la base de datos
        const newData = new SensorData({
            deviceId,
            temperature,
            humidity,
            timestamp: new Date()
        });
        await newData.save();

        // Actualizar el estado del dispositivo
        await Device.findOneAndUpdate(
            { deviceId },
            {
                lastTemperature: temperature,
                lastHumidity: humidity,
                lastSeen: new Date(),
                status: 'online'
            },
            { upsert: true }  // Crear el dispositivo si no existe
        );

        res.json(newData);
    } catch (error) {
        console.error('Error saving sensor data:', error);
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene los últimos 100 registros de datos de sensores
 */
export const getSensorData = async (req, res) => {
    try {
        const data = await SensorData.find()
            .sort({ timestamp: -1 })  // Ordenar por fecha descendente
            .limit(100);              // Limitar a 100 registros
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene la lista de todos los dispositivos registrados
 */
export const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene la información de un dispositivo específico
 */
export const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findOne({ deviceId: req.params.id });
        if (!device) {
            return res.status(404).json({ message: 'Device not found', error: 'Not Found' });
        }
        res.json(device);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Actualiza la información de un dispositivo
 */
export const updateDevice = async (req, res) => {
    try {
        const device = await Device.findOneAndUpdate(
            { deviceId: req.params.id },
            req.body,
            { new: true }  // Devolver el documento actualizado
        );
        if (!device) {
            return res.status(404).json({ message: 'Device not found', error: 'Not Found' });
        }
        res.json(device);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene los datos históricos de un dispositivo específico
 */
export const getDeviceData = async (req, res) => {
    try {
        const data = await SensorData.find({ deviceId: req.params.id })
            .sort({ timestamp: -1 })
            .limit(100);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Envía un comando de calibración al dispositivo vía MQTT
 */
export const calibrateSensor = async (req, res) => {
    try {
        const deviceId = req.params.id;
        const device = await Device.findOne({ deviceId });
        
        if (!device) {
            return res.status(404).json({ message: 'Device not found', error: 'Not Found' });
        }

        // Enviar comando de calibración vía MQTT
        mqttService.sendCommand(deviceId, {
            action: 'calibrate'
        });

        res.json({ message: 'Calibration command sent' });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene la programación actual de un dispositivo
 */
export const getSchedule = async (req, res) => {
    try {
        const schedule = await scheduleService.getSchedule(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found', error: 'Not Found' });
        }
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Actualiza la programación de un dispositivo
 */
export const updateSchedule = async (req, res) => {
    try {
        await scheduleService.updateSchedule(req.params.id, req.body);
        res.json({ message: 'Schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Exporta los datos históricos de un dispositivo en diferentes formatos
 */
export const exportData = async (req, res) => {
    try {
        const { startDate, endDate, format } = req.query;
        const deviceId = req.params.id;

        // Usar el servicio de exportación para generar el archivo
        const result = await exportService.exportData(
            deviceId,
            startDate,
            endDate,
            format
        );

        // Configurar headers para descarga
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename=device_${deviceId}_data.${format}`);
        res.send(result.data);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Controla un dispositivo específico
 */
export const controlDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const command = req.body;

        // Enviar comando a través de MQTT
        mqttService.sendCommand(deviceId, command);

        res.json({ message: 'Comando enviado' });
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};

/**
 * Obtiene la lista de dispositivos activos
 */
export const getActiveDevices = async (req, res) => {
    try {
        const activeDevices = mqttService.getActiveDevices();
        res.json(activeDevices);
    } catch (error) {
        res.status(500).json({ message: error.message, error: 'Internal Server Error' });
    }
};
