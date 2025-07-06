// ============================================
// Import Dependencies
// ============================================
import data_sensorsSchema from "../models/data_sensors.js";

// ============================================
// ESP32 Data Controller
// ============================================

/**
 * Receive and store sensor data from ESP32
 * @param {Request} req - Express request object containing sensor data
 * @param {Response} res - Express response object
 */
export const receiveESP32Data = async (req, res) => {
    try {
        const { temperature } = req.body;
        
        // Validate temperature data
        if (temperature === undefined) {
            return res.status(400).json({ message: "Temperature data is required" });
        }

        // Create new data entry
        const newData = new data_sensorsSchema({
            temperature,
            // Establecemos valores por defecto para los otros campos
            polymerUsage: {
                pet: 0,
                polypropylene: 0
            },
            potentiometerEnergy: {
                used: 0,
                remaining: 100
            },
            injectorEnergy: {
                used: 0,
                remaining: 100
            },
            moldUsage: {
                mold1: 0,
                mold2: 0,
                mold3: 0
            },
            injectionTime: 0,
            // Asignamos a un usuario por defecto o dejamos null si no es necesario
            user: null
        });
        
        const savedData = await newData.save();
        res.json(savedData);
    } catch (error) {
        console.error('Error saving ESP32 data:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Add sensor data from the frontend form
 * @param {Request} req - Express request object containing form data
 * @param {Response} res - Express response object
 */
export const addSensorData = async (req, res) => {
    try {
        const {
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            temperature,
            temperatureZone1,
            temperatureZone2,
            temperatureZone3,
            injectionTime,
            injectionPressure,
            injectionSpeed,
            holdingPressure,
            holdingTime,
            coolingTime,
            coolingTemperature,
            cycleTime,
            partWeight,
            partDimensions,
            qualityStatus,
            defects,
            operatorName,
            shift,
            batchNumber,
            lotNumber,
            notes,
            processStatus,
            user
        } = req.body;

        // Validate required fields
        if (!polymerUsage || !moldUsage || !potentiometerEnergy || !injectorEnergy || temperature === undefined || injectionTime === undefined) {
            return res.status(400).json({ 
                message: "Los campos requeridos son: polymerUsage, moldUsage, potentiometerEnergy, injectorEnergy, temperature, injectionTime" 
            });
        }

        // Create new data entry with all fields
        const newData = new data_sensorsSchema({
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            temperature,
            temperatureZone1: temperatureZone1 || 0,
            temperatureZone2: temperatureZone2 || 0,
            temperatureZone3: temperatureZone3 || 0,
            injectionTime,
            injectionPressure: injectionPressure || 0,
            injectionSpeed: injectionSpeed || 0,
            holdingPressure: holdingPressure || 0,
            holdingTime: holdingTime || 0,
            coolingTime: coolingTime || 0,
            coolingTemperature: coolingTemperature || 0,
            cycleTime: cycleTime || 0,
            partWeight: partWeight || 0,
            partDimensions: {
                length: partDimensions?.length || 0,
                width: partDimensions?.width || 0,
                height: partDimensions?.height || 0
            },
            qualityStatus: qualityStatus || 'bueno',
            defects: {
                warping: defects?.warping || false,
                sinkMarks: defects?.sinkMarks || false,
                flash: defects?.flash || false,
                shortShot: defects?.shortShot || false,
                other: defects?.other || ''
            },
            operatorName: operatorName || '',
            shift: shift || 'mañana',
            batchNumber: batchNumber || '',
            lotNumber: lotNumber || '',
            notes: notes || '',
            processStatus: processStatus || 'en_proceso',
            user: user || null
        });
        
        const savedData = await newData.save();
        res.status(201).json({
            success: true,
            message: "Datos guardados exitosamente",
            data: savedData
        });
    } catch (error) {
        console.error('Error saving sensor data:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al guardar los datos",
            error: error.message 
        });
    }
};

/**
 * Get all sensor data
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getAllSensorData = async (req, res) => {
    try {
        const data = await data_sensorsSchema.find()
            .populate('user', 'username email')
            .sort({ date: -1 });
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al obtener los datos",
            error: error.message 
        });
    }
};

/**
 * Get sensor data by ID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getSensorDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await data_sensorsSchema.findById(id)
            .populate('user', 'username email');
        
        if (!data) {
            return res.status(404).json({ 
                success: false,
                message: "Datos no encontrados" 
            });
        }
        
        res.json({
            success: true,
            data: data
        });
    } catch (error) {
        console.error('Error fetching sensor data by ID:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al obtener los datos",
            error: error.message 
        });
    }
};

// Controlador para recibir datos de temperatura y humedad del Arduino
export const recibirDatos = (req, res) => {
    const { temperatura, humedad } = req.body;
    console.log(`Datos recibidos: Temperatura = ${temperatura}°C, Humedad = ${humedad}%`);
    // Aquí puedes agregar lógica para manejar los datos, como guardarlos en una base de datos
    res.status(200).send('Datos recibidos correctamente');
};
