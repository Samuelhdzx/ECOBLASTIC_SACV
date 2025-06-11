import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data_sensorsRoutes from "./src/routes/data_sensors.js";
import authRoutes from "./src/routes/auth.routes.js";
import esp32Routes from "./src/routes/esp32.routes.js";
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

// Actualizar CORS para incluir Render
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:1337',
        'https://ecoblastic-frontend.onrender.com', // Agregar cuando tengas la URL
        /\.onrender\.com$/ // Permitir cualquier subdominio de render.com
    ],
    credentials: true
}));

app.use(helmet());
app.use(cookieParser());

// ✅ AGREGAR ESTA RUTA RAÍZ PARA EVITAR 404
app.get('/', (req, res) => {
    res.json({ 
        message: 'ECOBLASTIC API is running!',
        status: 'OK',
        timestamp: new Date().toISOString(),
        endpoints: {
            sensors: '/api/sensors',
            temperature: '/api/temperature',
            auth: '/api/auth',
            esp32: '/api/esp32'
        }
    });
});

// Tus rutas existentes
app.use('/api', data_sensorsRoutes);
app.use('/api', authRoutes);
app.use('/api/esp32', esp32Routes);

//mongo db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Definir esquema para temperaturas
const Temperature = mongoose.model('Temperature', {
    temperature: Number,
    injectionTime: Number,
    timestamp: { type: Date, default: Date.now }
});

// Ruta para recibir datos de temperatura y tiempo de inyección
app.post('/api/temperature', async (req, res) => {
    try {
        const { temperature, injectionTime } = req.body;
        const temp = Number(temperature);
        const time = Number(injectionTime);
        
        if (isNaN(temp) || isNaN(time)) {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        console.log(`Temperatura: ${temp}°C, Tiempo inyección: ${time}s`);
        
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
        
        const formattedData = data.map(record => ({
            temperature: record.temperature,
            injectionTime: record.injectionTime,
            timestamp: record.timestamp.toISOString(),
            _id: record._id
        }));
        
        console.log('Sending formatted data:', formattedData[0]);
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
});

// ✅ CORREGIR EL PUERTO
const PORT = process.env.PORT || 10000;

// ✅ AGREGAR HOST 0.0.0.0 PARA RENDER
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;