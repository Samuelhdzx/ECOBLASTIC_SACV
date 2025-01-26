import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { createServer } from 'http';

import authRoutes from "./src/routes/auth.routes.js";
import esp32Routes from "./src/routes/esp32.routes.js";
import WebSocketService from "./src/services/websocket.service.js";
import { initializeMQTTService } from "./src/services/mqtt.service.js";

//configs
dotenv.config();
const app = express();
const httpServer = createServer(app);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

//routes
app.use('/api', authRoutes);
app.use('/api/esp32', esp32Routes);

// Conectar a la base de datos
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// Inicializar WebSocket
const wsService = new WebSocketService(httpServer);

// Inicializar MQTT con WebSocket
const mqttService = initializeMQTTService(wsService);

console.log("MQTT Service iniciado");

export { app, httpServer };