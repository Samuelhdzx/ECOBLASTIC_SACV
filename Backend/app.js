import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data_sensorsRoutes from "./src/routes/data_sensors.js";
import authRoutes from "./src/routes/auth.routes.js";
import esp32Routes from "./src/routes/esp32.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
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
    origin: [
        'http://localhost:5173', 
        'http://localhost:1337',
        'https://ecoblastic-frontend.onrender.com',
        'https://ecoblastic-backend.onrender.com'
    ],
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use('/api', data_sensorsRoutes);
app.use('/api', authRoutes);
app.use('/api/esp32', esp32Routes);
app.use('/api/admin', adminRoutes);

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
        
        // Formatear datos antes de enviar
        const formattedData = data.map(record => ({
            temperature: record.temperature,
            injectionTime: record.injectionTime,
            timestamp: record.timestamp.toISOString(),
            _id: record._id
        }));
        
        console.log('Sending formatted data:', formattedData[0]); // Debug primer registro
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ 
        message: 'ECOBLASTIC Backend API funcionando correctamente',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;