import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema({
    temperatureThreshold: {
        type: Number,
        required: true,
        default: 25
    },
    humidityThreshold: {
        type: Number,
        required: true,
        default: 60
    },
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SystemSettings', systemSettingsSchema);
