import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

class WebSocketService {
    constructor(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        // Middleware de autenticación
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            try {
                const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                socket.user = decoded;
                next();
            } catch (err) {
                next(new Error('Authentication error'));
            }
        });

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado:', socket.id);

            // Suscribirse a actualizaciones de dispositivo específico
            socket.on('subscribe_device', (deviceId) => {
                socket.join(`device_${deviceId}`);
            });

            // Cancelar suscripción
            socket.on('unsubscribe_device', (deviceId) => {
                socket.leave(`device_${deviceId}`);
            });

            socket.on('disconnect', () => {
                console.log('Cliente desconectado:', socket.id);
            });
        });
    }

    // Emitir nuevos datos de sensor
    emitSensorData(deviceId, data) {
        this.io.to(`device_${deviceId}`).emit('sensor_data', {
            deviceId,
            ...data
        });
    }

    // Emitir cambio de estado del dispositivo
    emitDeviceStatus(deviceId, status) {
        this.io.emit('device_status', {
            deviceId,
            status
        });
    }

    // Emitir alerta de temperatura
    emitTemperatureAlert(deviceId, temperature) {
        this.io.to(`device_${deviceId}`).emit('temperature_alert', {
            deviceId,
            temperature,
            timestamp: new Date()
        });
    }
}

export default WebSocketService;
