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
    
    // Parámetros de inyección
    injectionPressure: { type: Number, required: false },
    injectionSpeed: { type: Number, required: false },
    holdingPressure: { type: Number, required: false },
    holdingTime: { type: Number, required: false },
    
    // Parámetros de enfriamiento
    coolingTime: { type: Number, required: false },
    coolingTemperature: { type: Number, required: false },
    
    // Control de calidad (se llena al final del proceso)
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
        required: false
    },
    
    // Notas y observaciones
    notes: { type: String, required: false },
    
    // Estado del proceso
    processStatus: { 
        type: String, 
        enum: ['en_proceso', 'monitoreando', 'completado', 'pausado', 'cancelado'], 
        default: 'en_proceso' 
    },
    
    // Tiempo de monitoreo (se calcula automáticamente)
    monitoringStartTime: { type: Date, required: false },
    monitoringEndTime: { type: Date, required: false },
    monitoringDuration: { type: Number, required: false }, // en segundos
    
    // Temperatura del sensor (viene automáticamente del sensor)
    temperature: { type: Number, required: false },
    
    // --- NUEVOS CAMPOS PARA KPIs AVANZADOS ---
    materialUsado: { type: Number, required: false }, // kg
    materialDesperdiciado: { type: Number, required: false }, // kg
    costoMaterialUsado: { type: Number, required: false }, // MXN o USD
    costoMaterialDesperdiciado: { type: Number, required: false }, // MXN o USD
    tiempoEnfriamiento: { type: Number, required: false }, // segundos
    tiempoOperacionEfectiva: { type: Number, required: false }, // minutos
    numeroAlertasTemperatura: { type: Number, required: false },
    tiempoRespuestaAlertas: { type: Number, required: false }, // segundos
    costoTotalPorPieza: { type: Number, required: false }, // MXN o USD
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
