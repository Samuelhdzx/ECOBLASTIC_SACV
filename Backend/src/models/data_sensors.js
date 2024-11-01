import mongoose from "mongoose";

const data_sensorsSchema = mongoose.Schema({
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
    date: { type: Date, default: Date.now }
});



export default mongoose.model('DataSensors', data_sensorsSchema);



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
