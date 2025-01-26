import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    monitoring: {
        type: Boolean,
        default: false
    },
    lastTemperature: {
        type: Number,
        default: null
    },
    lastHumidity: {
        type: Number,
        default: null
    },
    schedule: {
        enabled: {
            type: Boolean,
            default: false
        },
        days: {
            monday: { type: Boolean, default: false },
            tuesday: { type: Boolean, default: false },
            wednesday: { type: Boolean, default: false },
            thursday: { type: Boolean, default: false },
            friday: { type: Boolean, default: false },
            saturday: { type: Boolean, default: false },
            sunday: { type: Boolean, default: false }
        },
        startTime: {
            type: Date,
            default: null
        },
        endTime: {
            type: Date,
            default: null
        },
        interval: {
            type: Number,
            default: 5,
            min: 1,
            max: 60
        }
    }
}, {
    timestamps: true
});

deviceSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

export default mongoose.model('Device', deviceSchema);
