import mongoose from "mongoose";

const data_sensorsSchema = mongoose.Schema({
    // Información básica del proceso
    polymerUsage: {
        pet: { type: Number, required: true },
        polypropylene: { type: Number, required: true }
    },
    moldUsage: {
        mold1: { type: Number, required: true },
        mold2: { type: Number, required: true },
        mold3: { type: Number, required: true }
    },
    
    // Datos de energía
    potentiometerEnergy: {
        used: { type: Number, required: true },
        remaining: { type: Number, required: true }
    },
    injectorEnergy: {
        used: { type: Number, required: true },
        remaining: { type: Number, required: true }
    },
    
    // Parámetros de temperatura
    temperature: { type: Number, required: true },
    temperatureZone1: { type: Number, required: false },
    temperatureZone2: { type: Number, required: false },
    temperatureZone3: { type: Number, required: false },
    
    // Parámetros de inyección
    injectionTime: { type: Number, required: true },
    injectionPressure: { type: Number, required: false },
    injectionSpeed: { type: Number, required: false },
    holdingPressure: { type: Number, required: false },
    holdingTime: { type: Number, required: false },
    
    // Parámetros de enfriamiento
    coolingTime: { type: Number, required: false },
    coolingTemperature: { type: Number, required: false },
    
    // Control de calidad
    cycleTime: { type: Number, required: false },
    partWeight: { type: Number, required: false },
    partDimensions: {
        length: { type: Number, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false }
    },
    qualityStatus: { 
        type: String, 
        enum: ['excelente', 'bueno', 'regular', 'defectuoso'], 
        default: 'bueno' 
    },
    defects: {
        warping: { type: Boolean, default: false },
        sinkMarks: { type: Boolean, default: false },
        flash: { type: Boolean, default: false },
        shortShot: { type: Boolean, default: false },
        other: { type: String, required: false }
    },
    
    // Información del operador
    operatorName: { type: String, required: false },
    shift: { 
        type: String, 
        enum: ['mañana', 'tarde', 'noche'], 
        required: false 
    },
    batchNumber: { type: String, required: false },
    lotNumber: { type: String, required: false },
    
    // Metadatos
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Notas y observaciones
    notes: { type: String, required: false },
    
    // Estado del proceso
    processStatus: { 
        type: String, 
        enum: ['en_proceso', 'completado', 'pausado', 'cancelado'], 
        default: 'en_proceso' 
    }
});

export default mongoose.model('DataSensors', data_sensorsSchema)




// const machineDataSchema = mongoose.Schema({
//     // Datos de polímeros
//     polymerUsage: {
//         pet: { type: Number, required: true },
//         polypropylene: { type: Number, required: true }
//     },
//     // Datos de energía del potenciómetro
//     potentiometerEnergy: {
//         used: { type: Number, required: true },
//         remaining: { type: Number, required: true }
//     },
//     // Energía general de la inyectora
//     injectorEnergy: {
//         used: { type: Number, required: true },
//         remaining: { type: Number, required: true }
//     },
//     // Uso de moldes
//     moldUsage: {
//         mold1: { type: Number, required: true },
//         mold2: { type: Number, required: true },
//         mold3: { type: Number, required: true }
//     },
//     // Temperatura
//     temperature: { type: Number, required: true },
//     // Tiempo de inyección
//     injectionTime: { type: Number, required: true }, // en segundos
//     date: { type: Date, default: Date.now }
// });

// export default mongoose.model('MachineData', machineDataSchema);
