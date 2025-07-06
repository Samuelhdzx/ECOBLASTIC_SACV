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
 * Add sensor data from the frontend form (inicio del monitoreo)
 * @param {Request} req - Express request object containing form data
 * @param {Response} res - Express response object
 */
export const addSensorData = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        
        const {
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            injectionPressure,
            injectionSpeed,
            holdingPressure,
            holdingTime,
            coolingTime,
            coolingTemperature,
            operatorName,
            shift,
            batchNumber,
            lotNumber,
            notes,
            processStatus,
            monitoringStartTime,
            user
        } = req.body;

        console.log('Extracted data:', {
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            processStatus,
            monitoringStartTime
        });

        // Validate required fields
        if (!polymerUsage || !moldUsage || !potentiometerEnergy || !injectorEnergy) {
            console.log('Validation failed - missing required fields');
            return res.status(400).json({ 
                message: "Los campos requeridos son: polymerUsage, moldUsage, potentiometerEnergy, injectorEnergy" 
            });
        }

        // Create new data entry with all fields
        const newData = new data_sensorsSchema({
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            injectionPressure: injectionPressure || 0,
            injectionSpeed: injectionSpeed || 0,
            holdingPressure: holdingPressure || 0,
            holdingTime: holdingTime || 0,
            coolingTime: coolingTime || 0,
            coolingTemperature: coolingTemperature || 0,
            operatorName: operatorName || '',
            shift: shift || 'mañana',
            batchNumber: batchNumber || '',
            lotNumber: lotNumber || '',
            notes: notes || '',
            processStatus: processStatus || 'monitoreando',
            monitoringStartTime: monitoringStartTime || new Date(),
            user: user || undefined
        });
        
        console.log('Creating new data entry with:', {
            polymerUsage,
            moldUsage,
            potentiometerEnergy,
            injectorEnergy,
            processStatus,
            monitoringStartTime
        });
        
        const savedData = await newData.save();
        console.log('Data saved successfully:', savedData._id);
        
        res.status(201).json({
            success: true,
            message: "Monitoreo iniciado exitosamente",
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
 * Finalizar monitoreo y agregar datos de calidad
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const finalizeMonitoring = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cycleTime,
            partWeight,
            partDimensions,
            qualityStatus,
            defects,
            additionalNotes
        } = req.body;

        // Buscar el proceso de monitoreo
        const monitoringData = await data_sensorsSchema.findById(id);
        
        if (!monitoringData) {
            return res.status(404).json({ 
                success: false,
                message: "Proceso de monitoreo no encontrado" 
            });
        }

        if (monitoringData.processStatus !== 'monitoreando') {
            return res.status(400).json({ 
                success: false,
                message: "El proceso no está en estado de monitoreo" 
            });
        }

        // Calcular duración del monitoreo
        const endTime = new Date();
        const startTime = monitoringData.monitoringStartTime;
        const duration = Math.round((endTime - startTime) / 1000); // duración en segundos

        // Actualizar con datos de calidad y tiempo final
        const updatedData = await data_sensorsSchema.findByIdAndUpdate(
            id,
            {
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
                notes: additionalNotes ? `${monitoringData.notes || ''}\n\nNotas finales: ${additionalNotes}` : monitoringData.notes,
                processStatus: 'completado',
                monitoringEndTime: endTime,
                monitoringDuration: duration
            },
            { new: true }
        );

        res.json({
            success: true,
            message: "Monitoreo finalizado exitosamente",
            data: updatedData,
            monitoringDuration: duration
        });
    } catch (error) {
        console.error('Error finalizing monitoring:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al finalizar el monitoreo",
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

/**
 * Get active monitoring processes
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getActiveMonitoring = async (req, res) => {
    try {
        const activeProcesses = await data_sensorsSchema.find({
            processStatus: 'monitoreando'
        }).populate('user', 'username email');
        
        res.json({
            success: true,
            data: activeProcesses
        });
    } catch (error) {
        console.error('Error fetching active monitoring:', error);
        res.status(500).json({ 
            success: false,
            message: "Error al obtener procesos activos",
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
