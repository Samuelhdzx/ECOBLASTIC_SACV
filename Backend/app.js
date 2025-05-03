import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data_sensorsRoutes from "./src/routes/data_sensors.js";
import authRoutes from "./src/routes/auth.routes.js";

import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:1337'],
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use('/api', data_sensorsRoutes);
app.use('/api', authRoutes);

//mongo db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Definir esquema para temperaturas
const Temperature = mongoose.model('Temperature', {
    temperature: Number,
    injectionTime: Number, // Nuevo campo para tiempo de inyección
    timestamp: { type: Date, default: Date.now }
});

// Ruta para recibir datos de temperatura y tiempo de inyección
app.post('/api/temperature', async (req, res) => {
    try {
        const { temperature, injectionTime } = req.body;

        // Verificar y validar datos
        const temp = Number(temperature);
        const time = Number(injectionTime);

        if (isNaN(temp) || isNaN(time)) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        console.log(`Temperatura: ${temp}°C, Tiempo inyección: ${time}s`);
        
        // Guardar con timestamp actual
        const tempRecord = new Temperature({
            temperature: temp,
            injectionTime: time,
            timestamp: new Date()
        });
        await tempRecord.save();
        
        res.status(200).json({ message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al guardar los datos' });
    }
});

// Nueva ruta para obtener los datos de sensores
app.get('/api/sensors', async (req, res) => {
    try {
        const data = await Temperature.find()
            .sort({ timestamp: -1 })
            .limit(50);
        
        // Ensure temperature and timestamp are properly formatted
        const formattedData = data.map(record => ({
            temperature: Number(record.temperature) || 0, // Ensure it's a number
            injectionTime: Number(record.injectionTime) || 0,
            timestamp: record.timestamp.toISOString(),
            _id: record._id
        }));
        
        console.log('Sending sensor data:', formattedData[0]); // Debug logging
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;