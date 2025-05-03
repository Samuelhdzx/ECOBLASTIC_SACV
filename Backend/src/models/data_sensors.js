import mongoose from "mongoose";

const data_sensorsSchema = mongoose.Schema({
    // Datos de producción
    production: {
        totalPieces: { type: Number, required: true },
        defectivePieces: { type: Number, required: true },
        cycleTime: { type: Number, required: true }, // tiempo en segundos
        materialUsed: { type: Number, required: true }, // en kg
        materialWasted: { type: Number, required: true }, // en kg
    },

    // Datos del operario
    operator: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        responseTime: { type: Number, required: true }, // tiempo en segundos
        piecesProduced: { type: Number, required: true },
        defectiveByOperator: { type: Number, required: true },
        materialUsedByOperator: { type: Number, required: true },
        materialWastedByOperator: { type: Number, required: true },
    },

    // Datos del molde
    mold: {
        type: { type: String, enum: ['mold1', 'mold2', 'mold3'], required: true },
        piecesProduced: { type: Number, required: true },
        defectiveByMold: { type: Number, required: true },
        materialUsedByMold: { type: Number, required: true },
        materialWastedByMold: { type: Number, required: true },
    },

    // Datos de la máquina
    machine: {
        startupTime: { type: Number, required: true }, // tiempo para alcanzar temperatura óptima
        coolingTime: { type: Number, required: true }, // tiempo de enfriamiento
        temperatureExceededCount: { type: Number, required: true }, // veces que se excedió la temperatura
        temperatureExceededTime: { type: Number, required: true }, // tiempo total fuera de rango
        effectiveOperationTime: { type: Number, required: true }, // tiempo de operación sin interrupciones
    },

    // Datos de costos
    costs: {
        materialCostPerPiece: { type: Number, required: true },
        wasteCost: { type: Number, required: true },
        totalCostPerPiece: { type: Number, required: true },
    },

    // Mantener los campos existentes
    polymerUsage: {
        pet: { type: Number, required: true },
        polypropylene: { type: Number, required: true }
    },
    potentiometerEnergy: {
        used: { type: Number, required: true },
        remaining: { type: Number, required: true }
    },
    injectorEnergy: {
        used: { type: Number, required: true },
        remaining: { type: Number, required: true }
    },
    moldUsage: {
        mold1: { type: Number, required: true },
        mold2: { type: Number, required: true },
        mold3: { type: Number, required: true }
    },
    temperature: { type: Number, required: true },
    injectionTime: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Campos para análisis de producción
    analysis: {
        totalPieces: { type: Number, default: 0 },
        defectivePieces: { type: Number, default: 0 },
        defectRate: { type: Number, default: 0 },
        quality: { type: Number, default: 0 },
        currentValue: { type: Number, default: 0 }, // Para el sensor de corriente
        // Campos para control de calidad
        materialEfficiency: {
            used: { type: Number, default: 0 },
            wasted: { type: Number, default: 0 },
            efficiency: { type: Number, default: 0 }
        },
    },
});

// Middleware pre-save para calcular métricas
data_sensorsSchema.pre('save', function(next) {
    // Calcular tasa de defectos
    if (this.analysis.totalPieces > 0) {
        this.analysis.defectRate = (this.analysis.defectivePieces / this.analysis.totalPieces) * 100;
    }

    // Calcular eficiencia de material
    const totalMaterial = this.analysis.materialEfficiency.used + this.analysis.materialEfficiency.wasted;
    if (totalMaterial > 0) {
        this.analysis.materialEfficiency.efficiency = (this.analysis.materialEfficiency.used / totalMaterial) * 100;
    }

    next();
});

export default mongoose.model('DataSensors', data_sensorsSchema);
