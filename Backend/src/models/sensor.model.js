import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        ref: 'Device'
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('SensorData', sensorDataSchema);
