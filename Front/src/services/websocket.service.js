import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.subscribers = new Map();
    }

    connect(token) {
        this.socket = io('http://localhost:1337', {
            auth: { token }
        });

        this.socket.on('connect', () => {
            console.log('Conectado a WebSocket');
            toast.success('Conexión establecida con el servidor');
        });

        this.socket.on('disconnect', () => {
            console.log('Desconectado de WebSocket');
            toast.error('Conexión perdida con el servidor');
        });

        this.socket.on('sensor_data', (data) => {
            this.notifySubscribers('sensor_data', data);
        });

        this.socket.on('device_status', (data) => {
            this.notifySubscribers('device_status', data);
        });

        this.socket.on('temperature_alert', (data) => {
            this.notifySubscribers('temperature_alert', data);
            toast.error(`¡Alerta! Temperatura alta en ${data.deviceId}: ${data.temperature}°C`);
        });

        this.socket.on('connect_error', (error) => {
            if (error.message === 'Authentication error') {
                toast.error('Error de autenticación');
            }
        });
    }

    subscribeToDevice(deviceId) {
        if (this.socket) {
            this.socket.emit('subscribe_device', deviceId);
        }
    }

    unsubscribeFromDevice(deviceId) {
        if (this.socket) {
            this.socket.emit('unsubscribe_device', deviceId);
        }
    }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event).add(callback);

        return () => {
            const callbacks = this.subscribers.get(event);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }

    notifySubscribers(event, data) {
        const callbacks = this.subscribers.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const wsService = new WebSocketService();
