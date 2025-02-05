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

// Controlador para recibir datos de temperatura y humedad del Arduino
export const recibirDatos = (req, res) => {
    const { temperatura, humedad } = req.body;
    console.log(`Datos recibidos: Temperatura = ${temperatura}°C, Humedad = ${humedad}%`);
    // Aquí puedes agregar lógica para manejar los datos, como guardarlos en una base de datos
    res.status(200).send('Datos recibidos correctamente');
};
