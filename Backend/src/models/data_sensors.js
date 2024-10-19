import mongoose from "mongoose";

const data_sensorsSchema = mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('DataSensors', data_sensorsSchema);