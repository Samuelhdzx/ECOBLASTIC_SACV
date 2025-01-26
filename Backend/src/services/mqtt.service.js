import mqtt from 'mqtt';
import Device from '../models/device.model.js';
import SensorData from '../models/sensor.model.js';

class MQTTService {
    constructor(wsService) {
        this.client = null;
        this.devices = new Map();
        this.wsService = wsService;
        this.connect();
    }

    connect() {
        this.client = mqtt.connect('mqtt://broker.hivemq.com:1883');

        this.client.on('connect', () => {
            console.log('Conectado al broker MQTT');
            this.client.subscribe('ecoblastic/devices/+/data');
            this.client.subscribe('ecoblastic/devices/+/status');
        });

        this.client.on('message', this.handleMessage.bind(this));
        this.client.on('error', (error) => {
            console.error('Error MQTT:', error);
        });
    }

    async handleMessage(topic, message) {
        try {
            const data = JSON.parse(message.toString());
            const topicParts = topic.split('/');
            const deviceId = topicParts[2];
            const messageType = topicParts[3];

            switch (messageType) {
                case 'data':
                    await this.handleSensorData(deviceId, data);
                    break;
                case 'status':
                    await this.handleDeviceStatus(deviceId, data);
                    break;
            }
        } catch (error) {
            console.error('Error procesando mensaje MQTT:', error);
        }
    }

    async handleSensorData(deviceId, data) {
        try {
            const sensorData = new SensorData({
                deviceId: deviceId,
                temperature: data.temperature,
                humidity: data.humidity,
                timestamp: new Date()
            });
            await sensorData.save();

            // Emitir datos por WebSocket
            if (this.wsService) {
                this.wsService.emitSensorData(deviceId, data);

                // Verificar alertas de temperatura
                if (data.temperature > 30) {
                    this.wsService.emitTemperatureAlert(deviceId, data.temperature);
                }
            }
        } catch (error) {
            console.error('Error guardando datos del sensor:', error);
        }
    }

    async handleDeviceStatus(deviceId, data) {
        try {
            const device = await Device.findOneAndUpdate(
                { deviceId },
                {
                    deviceId,
                    status: data.status,
                    lastSeen: new Date()
                },
                { upsert: true, new: true }
            );

            this.devices.set(deviceId, {
                ...device.toObject(),
                lastUpdate: new Date()
            });

            // Emitir estado por WebSocket
            if (this.wsService) {
                this.wsService.emitDeviceStatus(deviceId, data.status);
            }
        } catch (error) {
            console.error('Error actualizando estado del dispositivo:', error);
        }
    }

    sendCommand(deviceId, command) {
        const topic = `ecoblastic/devices/${deviceId}/control`;
        this.client.publish(topic, JSON.stringify(command));
    }

    getActiveDevices() {
        const activeDevices = [];
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        this.devices.forEach((device, deviceId) => {
            if (device.lastUpdate > fiveMinutesAgo) {
                activeDevices.push(device);
            }
        });

        return activeDevices;
    }
}

let mqttService = null;

export function initializeMQTTService(wsService) {
    mqttService = new MQTTService(wsService);
    return mqttService;
}

export default mqttService;
