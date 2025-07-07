import mongoose from 'mongoose';
import DataSensors from './src/models/data_sensors.js';
import dotenv from 'dotenv';

// Configurar variables de entorno
dotenv.config();

// Conectar a MongoDB
const connectDB = async () => {
  try {
    // Usar la misma configuración que el backend
    const mongoURI = process.env.MONGO_URI || 'mongodb+srv://ecoblastic:ecoblastic123@cluster0.mongodb.net/ecoblastic_def?retryWrites=true&w=majority';
    await mongoose.connect(mongoURI);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Generar datos de prueba
const generateTestData = () => {
  const testData = [];
  const operators = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Rodríguez', 'Luis Martínez'];
  const shifts = ['mañana', 'tarde', 'noche'];
  const qualityStatuses = ['excelente', 'bueno', 'regular', 'defectuoso'];
  
  for (let i = 0; i < 100; i++) {
    const isPET = Math.random() > 0.4; // 60% PET, 40% Polipropileno
    const moldChoice = Math.floor(Math.random() * 3) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const shift = shifts[Math.floor(Math.random() * shifts.length)];
    const qualityStatus = qualityStatuses[Math.floor(Math.random() * qualityStatuses.length)];
    
    // Generar fecha aleatoria en los últimos 30 días
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    // Tiempo de monitoreo entre 18-25 minutos
    const monitoringDuration = (18 + Math.random() * 7) * 60; // en segundos
    
    // Temperatura entre 20-30°C (temperaturas reales del prototipo)
    const temperature = 20 + Math.random() * 10;
    
    // Tiempo de ciclo entre 45-90 segundos
    const cycleTime = 45 + Math.random() * 45;
    
    // Datos avanzados para KPIs
    const materialUsado = Number((0.05 + Math.random() * 0.2).toFixed(2)); // 0.05-0.25 kg
    const materialDesperdiciado = Number((materialUsado * (qualityStatus === 'defectuoso' ? 0.2 + Math.random() * 0.3 : 0.05 + Math.random() * 0.1)).toFixed(2));
    const costoMaterialUsado = Number((materialUsado * 25 + Math.random() * 10).toFixed(2)); // $25/kg
    const costoMaterialDesperdiciado = Number((materialDesperdiciado * 25 + Math.random() * 5).toFixed(2));
    const tiempoEnfriamiento = Math.floor(20 + Math.random() * 40); // 20-60 s
    const tiempoOperacionEfectiva = Math.floor(15 + Math.random() * 10); // 15-25 min
    const numeroAlertasTemperatura = qualityStatus === 'defectuoso' ? Math.floor(1 + Math.random() * 3) : Math.floor(Math.random() * 2);
    const tiempoRespuestaAlertas = Number((5 + Math.random() * 15).toFixed(2)); // 5-20 s
    const costoTotalPorPieza = Number(((costoMaterialUsado + costoMaterialDesperdiciado) / (1 + Math.random() * 2)).toFixed(2));
    
    const data = {
      polymerUsage: {
        pet: isPET ? 1 : 0,
        polypropylene: isPET ? 0 : 1
      },
      moldUsage: {
        mold1: moldChoice === 1 ? 1 : 0,
        mold2: moldChoice === 2 ? 1 : 0,
        mold3: moldChoice === 3 ? 1 : 0
      },
      potentiometerEnergy: {
        used: Math.floor(60 + Math.random() * 40), // 60-100%
        remaining: Math.floor(Math.random() * 40) // 0-40%
      },
      injectorEnergy: {
        used: Math.floor(70 + Math.random() * 30), // 70-100%
        remaining: Math.floor(Math.random() * 30) // 0-30%
      },
      injectionPressure: Math.floor(800 + Math.random() * 400), // 800-1200 bar
      injectionSpeed: Math.floor(50 + Math.random() * 50), // 50-100 mm/s
      holdingPressure: Math.floor(600 + Math.random() * 200), // 600-800 bar
      holdingTime: Math.floor(10 + Math.random() * 20), // 10-30 segundos
      coolingTime: Math.floor(20 + Math.random() * 40), // 20-60 segundos
      coolingTemperature: Math.floor(15 + Math.random() * 10), // 15-25°C
      cycleTime: cycleTime,
      partWeight: Math.floor(50 + Math.random() * 100), // 50-150 gramos
      partDimensions: {
        length: Math.floor(80 + Math.random() * 40), // 80-120 mm
        width: Math.floor(60 + Math.random() * 30), // 60-90 mm
        height: Math.floor(40 + Math.random() * 20) // 40-60 mm
      },
      qualityStatus: qualityStatus,
      defects: {
        warping: qualityStatus === 'defectuoso' && Math.random() > 0.7,
        sinkMarks: qualityStatus === 'defectuoso' && Math.random() > 0.6,
        flash: qualityStatus === 'defectuoso' && Math.random() > 0.8,
        shortShot: qualityStatus === 'defectuoso' && Math.random() > 0.9,
        other: qualityStatus === 'defectuoso' && Math.random() > 0.95 ? 'Inclusión de aire' : null
      },
      operatorName: operator,
      shift: shift,
      batchNumber: `BATCH-${Math.floor(Math.random() * 1000)}`,
      lotNumber: `LOT-${Math.floor(Math.random() * 500)}`,
      date: date,
      notes: qualityStatus === 'defectuoso' ? 'Requiere revisión de parámetros' : 'Proceso normal',
      processStatus: 'completado',
      monitoringStartTime: new Date(date.getTime() - monitoringDuration * 1000),
      monitoringEndTime: date,
      monitoringDuration: monitoringDuration,
      temperature: temperature,
      user: "674347b376448614a6680e7a",
      materialUsado,
      materialDesperdiciado,
      costoMaterialUsado,
      costoMaterialDesperdiciado,
      tiempoEnfriamiento,
      tiempoOperacionEfectiva,
      numeroAlertasTemperatura,
      tiempoRespuestaAlertas,
      costoTotalPorPieza
    };
    
    testData.push(data);
  }
  
  return testData;
};

// Función principal
const populateDatabase = async () => {
  try {
    await connectDB();
    
    // Limpiar datos existentes
    console.log('Limpiando datos existentes...');
    await DataSensors.deleteMany({});
    
    // Generar y insertar datos de prueba
    console.log('Generando datos de prueba...');
    const testData = generateTestData();
    
    console.log('Insertando datos en la base de datos...');
    const result = await DataSensors.insertMany(testData);
    
    console.log(`✅ Se insertaron ${result.length} registros de prueba exitosamente`);
    
    // Mostrar estadísticas
    const totalRecords = await DataSensors.countDocuments();
    const petRecords = await DataSensors.countDocuments({ 'polymerUsage.pet': 1 });
    const polypropyleneRecords = await DataSensors.countDocuments({ 'polymerUsage.polypropylene': 1 });
    const excellentQuality = await DataSensors.countDocuments({ qualityStatus: 'excelente' });
    const defectiveQuality = await DataSensors.countDocuments({ qualityStatus: 'defectuoso' });
    
    console.log('\n📊 Estadísticas de los datos insertados:');
    console.log(`Total de registros: ${totalRecords}`);
    console.log(`PET: ${petRecords} (${(petRecords/totalRecords*100).toFixed(1)}%)`);
    console.log(`Polipropileno: ${polypropyleneRecords} (${(polypropyleneRecords/totalRecords*100).toFixed(1)}%)`);
    console.log(`Calidad excelente: ${excellentQuality} (${(excellentQuality/totalRecords*100).toFixed(1)}%)`);
    console.log(`Piezas defectuosas: ${defectiveQuality} (${(defectiveQuality/totalRecords*100).toFixed(1)}%)`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error poblando la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
populateDatabase(); 