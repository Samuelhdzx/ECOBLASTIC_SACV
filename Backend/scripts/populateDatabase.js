// Script para poblar la base de datos con datos realistas de monitoreo
import mongoose from 'mongoose';
import data_sensorsSchema from '../src/models/data_sensors.js';

// Configuración de la base de datos
const MONGODB_URI = 'mongodb://localhost:27017/ecoblastic';

// Datos de operadores
const operators = [
  'Juan Carlos Méndez',
  'María Elena Rodríguez',
  'Carlos Alberto Silva',
  'Ana Patricia López'
];

// Configuraciones de materiales (ajustadas para prototipo)
const materialConfigs = {
  pet: {
    name: 'PET',
    tempRange: [22, 28], // Temperatura del prototipo para PET
    pressureRange: [800, 1200],
    speedRange: [80, 120],
    holdingTimeRange: [15, 25],
    coolingTimeRange: [20, 35]
  },
  polypropylene: {
    name: 'Polipropileno',
    tempRange: [20, 26], // Temperatura del prototipo para Polipropileno
    pressureRange: [600, 1000],
    speedRange: [60, 100],
    holdingTimeRange: [20, 30],
    coolingTimeRange: [25, 40]
  }
};

// Configuraciones de moldes
const moldConfigs = {
  mold1: { name: 'Molde 1', weight: 50, cycleTimeRange: [18, 22] },
  mold2: { name: 'Molde 2', weight: 100, cycleTimeRange: [20, 25] },
  mold3: { name: 'Molde 3', weight: 200, cycleTimeRange: [22, 28] }
};

// Estados de calidad con distribución realista
const qualityDistribution = [
  { status: 'excelente', probability: 0.35 },
  { status: 'bueno', probability: 0.45 },
  { status: 'regular', probability: 0.15 },
  { status: 'defectuoso', probability: 0.05 }
];

// Función para generar número aleatorio en un rango
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Función para generar número decimal aleatorio en un rango
const randomFloatInRange = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10;

// Función para seleccionar basado en probabilidad
const selectByProbability = (options) => {
  const random = Math.random();
  let cumulative = 0;
  
  for (const option of options) {
    cumulative += option.probability;
    if (random <= cumulative) {
      return option.status;
    }
  }
  return options[0].status;
};

// Función para generar datos de energía realistas
const generateEnergyData = () => {
  const used = randomInRange(60, 95);
  const remaining = 100 - used;
  return { used, remaining };
};

// Función para generar tiempo de monitoreo (18-25 minutos)
const generateMonitoringTime = () => {
  const minutes = randomFloatInRange(18, 25);
  return Math.round(minutes * 60); // Convertir a segundos
};

// Función para generar datos de calidad basados en el estado
const generateQualityData = (qualityStatus) => {
  const baseWeight = randomInRange(45, 55);
  const baseLength = randomInRange(95, 105);
  const baseWidth = randomInRange(45, 55);
  const baseHeight = randomInRange(25, 35);
  
  let weight, length, width, height, cycleTime;
  
  switch (qualityStatus) {
    case 'excelente':
      weight = baseWeight + randomInRange(-2, 2);
      length = baseLength + randomInRange(-1, 1);
      width = baseWidth + randomInRange(-1, 1);
      height = baseHeight + randomInRange(-1, 1);
      cycleTime = randomFloatInRange(18, 22);
      break;
    case 'bueno':
      weight = baseWeight + randomInRange(-3, 3);
      length = baseLength + randomInRange(-2, 2);
      width = baseWidth + randomInRange(-2, 2);
      height = baseHeight + randomInRange(-2, 2);
      cycleTime = randomFloatInRange(19, 24);
      break;
    case 'regular':
      weight = baseWeight + randomInRange(-5, 5);
      length = baseLength + randomInRange(-3, 3);
      width = baseWidth + randomInRange(-3, 3);
      height = baseHeight + randomInRange(-3, 3);
      cycleTime = randomFloatInRange(20, 26);
      break;
    case 'defectuoso':
      weight = baseWeight + randomInRange(-8, 8);
      length = baseLength + randomInRange(-5, 5);
      width = baseWidth + randomInRange(-5, 5);
      height = baseHeight + randomInRange(-5, 5);
      cycleTime = randomFloatInRange(22, 28);
      break;
  }
  
  return {
    cycleTime,
    partWeight: weight,
    partDimensions: { length, width, height },
    qualityStatus,
    defects: {
      warping: qualityStatus === 'defectuoso' ? Math.random() > 0.7 : Math.random() > 0.95,
      sinkMarks: qualityStatus === 'defectuoso' ? Math.random() > 0.6 : Math.random() > 0.9,
      flash: qualityStatus === 'defectuoso' ? Math.random() > 0.5 : Math.random() > 0.85,
      shortShot: qualityStatus === 'defectuoso' ? Math.random() > 0.4 : Math.random() > 0.8,
      other: qualityStatus === 'defectuoso' ? (Math.random() > 0.7 ? 'Inconsistencia en acabado' : '') : ''
    }
  };
};

// Función para generar un registro completo
const generateRecord = (index) => {
  // Seleccionar material aleatorio
  const materialType = Math.random() > 0.6 ? 'pet' : 'polypropylene';
  const materialConfig = materialConfigs[materialType];
  
  // Seleccionar molde aleatorio
  const moldTypes = ['mold1', 'mold2', 'mold3'];
  const selectedMold = moldTypes[Math.floor(Math.random() * moldTypes.length)];
  const moldConfig = moldConfigs[selectedMold];
  
  // Generar tiempo de monitoreo
  const monitoringDuration = generateMonitoringTime();
  
  // Generar fechas realistas (últimos 30 días)
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - (monitoringDuration * 1000));
  const monitoringStartTime = new Date(startDate.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
  const monitoringEndTime = new Date(monitoringStartTime.getTime() + (monitoringDuration * 1000));
  
  // Generar estado de calidad
  const qualityStatus = selectByProbability(qualityDistribution);
  const qualityData = generateQualityData(qualityStatus);
  
  // Generar datos de energía
  const potentiometerEnergy = generateEnergyData();
  const injectorEnergy = generateEnergyData();
  
  // Generar parámetros de inyección basados en el material
  const injectionPressure = randomInRange(...materialConfig.pressureRange);
  const injectionSpeed = randomInRange(...materialConfig.speedRange);
  const holdingPressure = Math.round(injectionPressure * randomFloatInRange(0.7, 0.9));
  const holdingTime = randomInRange(...materialConfig.holdingTimeRange);
  const coolingTime = randomInRange(...materialConfig.coolingTimeRange);
  const coolingTemperature = randomInRange(20, 40);
  
  // Generar datos de polímero y molde
  const polymerUsage = {
    pet: materialType === 'pet' ? 1 : 0,
    polypropylene: materialType === 'polypropylene' ? 1 : 0
  };
  
  const moldUsage = {
    mold1: selectedMold === 'mold1' ? 1 : 0,
    mold2: selectedMold === 'mold2' ? 1 : 0,
    mold3: selectedMold === 'mold3' ? 1 : 0
  };
  
  // Generar información del operador
  const operatorName = operators[Math.floor(Math.random() * operators.length)];
  const shifts = ['mañana', 'tarde', 'noche'];
  const shift = shifts[Math.floor(Math.random() * shifts.length)];
  
  // Generar números de lote y batch
  const batchNumber = `BATCH-${String(index + 1).padStart(3, '0')}`;
  const lotNumber = `LOT-2024-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
  
  // Generar notas realistas
  const notes = [
    'Proceso normal, sin incidencias',
    'Ajuste menor en presión de inyección',
    'Temperatura estable durante todo el proceso',
    'Ciclo completado exitosamente',
    'Verificación de calidad aprobada',
    'Mantenimiento preventivo realizado',
    'Cambio de material sin problemas',
    'Optimización de parámetros aplicada'
  ];
  
  const selectedNote = notes[Math.floor(Math.random() * notes.length)];
  
  // Generar temperatura del sensor (basada en el material)
  const temperature = randomInRange(...materialConfig.tempRange);
  
  return {
    polymerUsage,
    moldUsage,
    potentiometerEnergy,
    injectorEnergy,
    injectionPressure,
    injectionSpeed,
    holdingPressure,
    holdingTime,
    coolingTime,
    coolingTemperature,
    cycleTime: qualityData.cycleTime,
    partWeight: qualityData.partWeight,
    partDimensions: qualityData.partDimensions,
    qualityStatus: qualityData.qualityStatus,
    defects: qualityData.defects,
    operatorName,
    shift,
    batchNumber,
    lotNumber,
    notes: selectedNote,
    processStatus: 'completado',
    monitoringStartTime,
    monitoringEndTime,
    monitoringDuration,
    temperature,
    date: monitoringStartTime,
    user: null // Por ahora sin usuario específico
  };
};

// Función principal para poblar la base de datos
const populateDatabase = async () => {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB exitosamente');
    
    // Limpiar datos existentes (opcional)
    console.log('🧹 Limpiando datos existentes...');
    await data_sensorsSchema.deleteMany({});
    console.log('✅ Datos limpiados');
    
    console.log('📊 Generando 100 registros de datos...');
    const records = [];
    
    for (let i = 0; i < 100; i++) {
      const record = generateRecord(i);
      records.push(record);
      
      if ((i + 1) % 10 === 0) {
        console.log(`✅ Generados ${i + 1}/100 registros`);
      }
    }
    
    console.log('💾 Guardando registros en la base de datos...');
    await data_sensorsSchema.insertMany(records);
    
    console.log('🎉 ¡Base de datos poblada exitosamente!');
    console.log(`📈 Se crearon ${records.length} registros`);
    
    // Mostrar estadísticas
    const stats = await data_sensorsSchema.aggregate([
      {
        $group: {
          _id: null,
          avgDuration: { $avg: '$monitoringDuration' },
          avgTemperature: { $avg: '$temperature' },
          qualityDistribution: { $push: '$qualityStatus' }
        }
      }
    ]);
    
    if (stats.length > 0) {
      const stat = stats[0];
      console.log('\n📊 Estadísticas generadas:');
      console.log(`⏱️  Tiempo promedio de monitoreo: ${Math.round(stat.avgDuration / 60)} minutos`);
      console.log(`🌡️  Temperatura promedio: ${Math.round(stat.avgTemperature)}°C`);
      
      const qualityCounts = stat.qualityDistribution.reduce((acc, status) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      
      console.log('✅ Distribución de calidad:');
      Object.entries(qualityCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} registros (${Math.round((count / 100) * 100)}%)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
};

// Ejecutar el script
populateDatabase(); 