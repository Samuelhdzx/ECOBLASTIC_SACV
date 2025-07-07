# INFORME ACADÉMICO - SISTEMA ECOBLASTIC_DEF
## Análisis de Dashboard y Reportes para Toma de Decisiones

---

### PORTADA

**UNIVERSIDAD [NOMBRE DE TU UNIVERSIDAD]**  
**FACULTAD DE [TU FACULTAD]**  
**CARRERA DE [TU CARRERA]**

**INFORME ACADÉMICO**  
**Análisis de Dashboard y Reportes del Sistema ECOBLASTIC_DEF: Monitoreo Industrial de Inyección de Plásticos**

**Estudiante:** [TU NOMBRE]  
**Código:** [TU CÓDIGO]  
**Asignatura:** [NOMBRE DE LA ASIGNATURA]  
**Docente:** [NOMBRE DEL DOCENTE]  
**Fecha:** [FECHA ACTUAL]  
**Semestre:** [TU SEMESTRE]

---

### ÍNDICE

1. **INTRODUCCIÓN**
2. **OBJETIVO DEL INFORME O REPORTE GLOBAL**
3. **DASHBOARD DEL SISTEMA ECOBLASTIC_DEF**
4. **VARIABLES DEPENDIENTES E INDEPENDIENTES**
5. **JUSTIFICACIÓN DE VARIABLES SELECCIONADAS**
6. **ELEMENTOS PARA MODELO CLASIFICATORIO O DE REGRESIÓN**
7. **EJEMPLOS DE REPORTES POR TIPO DE USUARIO**
8. **DICCIONARIO DE DATOS DE LA BASE DE DATOS**
9. **CONCLUSIONES DE INFORMES O REPORTES**
10. **ANEXOS**

---

## 1. INTRODUCCIÓN

El presente informe analiza el sistema **ECOBLASTIC_DEF**, una solución integral de monitoreo industrial para procesos de inyección de plásticos. El sistema integra tecnologías de sensores, análisis de datos en tiempo real y visualización avanzada mediante un dashboard interactivo que permite la toma de decisiones basada en datos.

El dashboard desarrollado presenta KPIs (Indicadores Clave de Rendimiento) y métricas que facilitan el análisis de la eficiencia operacional, calidad del producto y costos asociados al proceso de inyección de plásticos. Este análisis se fundamenta en la recolección sistemática de variables tanto dependientes como independientes que permiten establecer correlaciones y patrones de comportamiento del proceso industrial.

---

## 2. OBJETIVO DEL INFORME O REPORTE GLOBAL

### 2.1 Objetivo Principal

Analizar y justificar las variables seleccionadas en el dashboard del sistema ECOBLASTIC_DEF, evaluando su impacto en la toma de decisiones y determinando los elementos necesarios para implementar modelos de clasificación o regresión que optimicen el proceso de inyección de plásticos.

### 2.2 Objetivos Específicos

1. **Identificar y clasificar** las variables dependientes e independientes del sistema
2. **Justificar la selección** de variables para el dashboard y su relevancia en la toma de decisiones
3. **Generar ejemplos de reportes** para diferentes tipos de usuarios (cliente final, administrador, visión estratégica)
4. **Determinar elementos clave** para modelos de clasificación y regresión
5. **Documentar el diccionario de datos** de la base de datos del sistema

---

## 3. DASHBOARD DEL SISTEMA ECOBLASTIC_DEF

### 3.1 Descripción General del Dashboard

El dashboard del sistema ECOBLASTIC_DEF presenta una interfaz moderna y profesional con las siguientes secciones principales:

#### 3.1.1 KPIs Principales
- **Total de Piezas Producidas**: Métrica fundamental de productividad
- **Tasa de Defectos**: Indicador crítico de calidad
- **Tiempo Promedio de Ciclo**: Medida de eficiencia operacional
- **Temperatura Promedio**: Control de parámetros del proceso

#### 3.1.2 KPIs Avanzados
- **Material Usado vs Desperdiciado**: Eficiencia en uso de recursos
- **Costos de Material**: Análisis financiero del proceso
- **Tiempos de Operación**: Eficiencia temporal
- **Alertas de Temperatura**: Control de estabilidad del proceso

#### 3.1.3 Visualizaciones Gráficas
- **Gráficos de Barras Apiladas**: Producción y defectos por operador y molde
- **Gráficos de Líneas**: Tendencia de temperatura y energía
- **Gráficos de Radar**: Eficiencia de operadores
- **Gráficos de Pie/Donut**: Distribución de materiales, calidad y moldes

### 3.2 Características del Dashboard

- **Tiempo Real**: Actualización automática de datos
- **Interactivo**: Filtros y navegación intuitiva
- **Responsivo**: Adaptable a diferentes dispositivos
- **Profesional**: Paleta de colores institucional (morados, violetas, azules, negros)
- **Conclusivo**: Alertas automáticas con recomendaciones

---

## 4. VARIABLES DEPENDIENTES E INDEPENDIENTES

### 4.1 Variables Independientes (Predictoras)

#### 4.1.1 Variables de Configuración del Proceso
- **polymerUsage.pet**: Uso de material PET (0 o 1)
- **polymerUsage.polypropylene**: Uso de material Polipropileno (0 o 1)
- **moldUsage.mold1**: Uso del molde 1 (0 o 1)
- **moldUsage.mold2**: Uso del molde 2 (0 o 1)
- **moldUsage.mold3**: Uso del molde 3 (0 o 1)
- **injectionPressure**: Presión de inyección (0-2000 bar)
- **injectionSpeed**: Velocidad de inyección (0-500 mm/s)
- **holdingPressure**: Presión de mantenimiento (0-2000 bar)
- **holdingTime**: Tiempo de mantenimiento (0-60 segundos)

#### 4.1.2 Variables de Control Operacional
- **coolingTime**: Tiempo de enfriamiento (0-300 segundos)
- **coolingTemperature**: Temperatura de enfriamiento (20-40°C)
- **operatorName**: Nombre del operador (categórica)
- **shift**: Turno de trabajo (mañana/tarde/noche)
- **batchNumber**: Número de batch (categórica)
- **lotNumber**: Número de lote (categórica)

#### 4.1.3 Variables de Energía y Sensores
- **potentiometerEnergy.used**: Energía usada del potenciómetro (0-100%)
- **injectorEnergy.used**: Energía usada del inyector (0-100%)
- **temperature**: Temperatura del sensor (0-300°C)

### 4.2 Variables Dependientes (Objetivo)

#### 4.2.1 Variables de Calidad
- **qualityStatus**: Estado de calidad (excelente/bueno/regular/defectuoso)
- **defects.warping**: Defecto de deformación (true/false)
- **defects.sinkMarks**: Defecto de hundimiento (true/false)
- **defects.flash**: Defecto de rebaba (true/false)
- **defects.shortShot**: Defecto de llenado incompleto (true/false)

#### 4.2.2 Variables de Productividad
- **cycleTime**: Tiempo total del ciclo (0-600 segundos)
- **monitoringDuration**: Duración del monitoreo (segundos)
- **partWeight**: Peso de la pieza (0-1000 gramos)

#### 4.2.3 Variables de Costos
- **costoTotalPorPieza**: Costo total por pieza (MXN)
- **costoMaterialDesperdiciado**: Costo del material desperdiciado (MXN)

---

## 5. JUSTIFICACIÓN DE VARIABLES SELECCIONADAS

### 5.1 ¿Por qué se Eligieron Estas Variables?

#### 5.1.1 Variables de Material y Molde
**Justificación**: Las variables de material (PET/Polipropileno) y molde son fundamentales porque:
- **Impacto en Calidad**: Diferentes materiales requieren diferentes parámetros de inyección
- **Eficiencia de Proceso**: Cada molde tiene características específicas que afectan el rendimiento
- **Costos**: Los materiales tienen costos diferentes y afectan la rentabilidad
- **Toma de Decisiones**: Permite optimizar la selección de materiales y moldes

#### 5.1.2 Variables de Presión y Velocidad
**Justificación**: Los parámetros de inyección son críticos porque:
- **Control de Calidad**: La presión y velocidad afectan directamente la calidad del producto
- **Eficiencia Energética**: Optimizar estos parámetros reduce el consumo de energía
- **Prevención de Defectos**: Valores incorrectos generan defectos específicos
- **Reproducibilidad**: Permite estandarizar procesos exitosos

#### 5.1.3 Variables de Temperatura y Tiempo
**Justificación**: El control térmico y temporal es esencial porque:
- **Estabilidad del Proceso**: La temperatura afecta la viscosidad del material
- **Calidad del Producto**: Tiempos de enfriamiento incorrectos generan defectos
- **Eficiencia Operacional**: Optimizar tiempos reduce costos operativos
- **Prevención de Fallas**: Alertas tempranas previenen paros de línea

### 5.2 ¿Cómo Ayudan a la Toma de Decisiones?

#### 5.2.1 Decisiones Operacionales
- **Ajuste de Parámetros**: Los datos permiten optimizar presión, velocidad y temperatura
- **Selección de Materiales**: Análisis de costos vs. calidad para diferentes materiales
- **Programación de Mantenimiento**: Alertas de energía y temperatura indican necesidades de mantenimiento
- **Asignación de Operadores**: Análisis de eficiencia por operador

#### 5.2.2 Decisiones Estratégicas
- **Inversión en Equipos**: Datos de eficiencia justifican mejoras tecnológicas
- **Optimización de Costos**: Análisis de desperdicios y costos por pieza
- **Expansión de Capacidad**: Datos de productividad apoyan decisiones de crecimiento
- **Control de Calidad**: Métricas de defectos permiten mejorar procesos

---

## 6. ELEMENTOS PARA MODELO CLASIFICATORIO O DE REGRESIÓN

### 6.1 Elementos para Modelo de Clasificación

#### 6.1.1 Clasificación de Calidad
**Variable Objetivo**: qualityStatus (excelente/bueno/regular/defectuoso)

**Variables Predictoras**:
- injectionPressure, injectionSpeed, holdingPressure
- coolingTime, coolingTemperature
- temperature, potentiometerEnergy.used
- operatorName, shift

**Aplicación**: Predecir la calidad del producto basado en parámetros de proceso

#### 6.1.2 Clasificación de Defectos
**Variable Objetivo**: defects.warping, defects.sinkMarks, defects.flash, defects.shortShot

**Variables Predictoras**:
- injectionPressure, injectionSpeed
- coolingTime, coolingTemperature
- materialUsado, materialDesperdiciado
- temperature

**Aplicación**: Predecir tipos específicos de defectos para prevención

### 6.2 Elementos para Modelo de Regresión

#### 6.2.1 Predicción de Tiempo de Ciclo
**Variable Objetivo**: cycleTime (continua)

**Variables Predictoras**:
- injectionPressure, injectionSpeed, holdingTime
- coolingTime, coolingTemperature
- materialUsado, operatorName

**Aplicación**: Optimizar tiempos de producción

#### 6.2.2 Predicción de Costos
**Variable Objetivo**: costoTotalPorPieza (continua)

**Variables Predictoras**:
- materialUsado, materialDesperdiciado
- cycleTime, monitoringDuration
- qualityStatus, defects
- operatorName, shift

**Aplicación**: Estimación de costos y optimización financiera

### 6.3 Consideraciones para Implementación

#### 6.3.1 Preprocesamiento de Datos
- **Normalización**: Variables numéricas en diferentes escalas
- **Codificación**: Variables categóricas (operador, turno, material)
- **Manejo de Valores Faltantes**: Estrategias para datos incompletos
- **Detección de Outliers**: Identificación de valores anómalos

#### 6.3.2 Validación del Modelo
- **División de Datos**: Training (70%), Validation (15%), Test (15%)
- **Métricas de Evaluación**: Accuracy, Precision, Recall para clasificación; RMSE, MAE para regresión
- **Cross-Validation**: Validación cruzada para robustez del modelo

---

## 7. EJEMPLOS DE REPORTES POR TIPO DE USUARIO

### 7.1 Reporte para Cliente Final (Usuario)

#### 7.1.1 ¿Por qué estos datos son importantes para el cliente final?

**Relevancia para el Cliente**:
- **Calidad del Producto**: El cliente necesita garantías de que el producto cumple especificaciones
- **Tiempo de Entrega**: Los datos de productividad afectan los plazos de entrega
- **Consistencia**: El cliente requiere productos uniformes en calidad
- **Trazabilidad**: Necesita rastrear lotes específicos en caso de problemas

**Ejemplo de Reporte**:
```
REPORTE DE CALIDAD - LOTE #2024-001
Fecha: 15/03/2024
Cliente: Industria Automotriz XYZ

RESUMEN DE PRODUCCIÓN:
• Total de piezas producidas: 1,250
• Piezas aprobadas: 1,198 (95.8%)
• Piezas rechazadas: 52 (4.2%)
• Tiempo promedio de ciclo: 2.3 minutos

ANÁLISIS DE CALIDAD:
• Excelente: 892 piezas (71.4%)
• Bueno: 306 piezas (24.5%)
• Regular: 45 piezas (3.6%)
• Defectuoso: 7 piezas (0.6%)

PARÁMETROS DE PROCESO:
• Material: PET
• Molde: Molde 2
• Temperatura promedio: 185°C
• Presión de inyección: 1,200 bar

GARANTÍAS:
• Cumplimiento de especificaciones: 100%
• Trazabilidad completa del lote
• Certificado de calidad adjunto
```

### 7.2 Reporte para Administrador del Sistema

#### 7.2.1 ¿Por qué estos datos son importantes para el administrador?

**Relevancia para el Administrador**:
- **Eficiencia Operacional**: Necesita optimizar recursos y procesos
- **Control de Costos**: Debe minimizar desperdicios y maximizar rentabilidad
- **Gestión de Personal**: Evaluar rendimiento de operadores
- **Mantenimiento Preventivo**: Programar mantenimiento basado en datos
- **Planificación Estratégica**: Tomar decisiones de inversión y expansión

**Ejemplo de Reporte**:
```
REPORTE ADMINISTRATIVO - MARZO 2024
Período: 01/03/2024 - 31/03/2024

ANÁLISIS DE PRODUCTIVIDAD:
• Total de piezas producidas: 15,680
• Tiempo promedio de ciclo: 2.1 minutos
• Eficiencia operacional: 87.3%
• OEE (Overall Equipment Effectiveness): 82.1%

ANÁLISIS DE COSTOS:
• Costo total de materiales: $156,800
• Material desperdiciado: $12,544 (8.0%)
• Costo promedio por pieza: $2.45
• Ahorro vs. presupuesto: $8,320 (5.0%)

RENDIMIENTO POR OPERADOR:
• Juan Pérez: 94.2% eficiencia, 2,450 piezas
• María García: 87.1% eficiencia, 2,180 piezas
• Carlos López: 91.8% eficiencia, 2,320 piezas

ALERTAS Y MANTENIMIENTO:
• Alertas de temperatura: 23 (reducidas 15% vs. mes anterior)
• Tiempo promedio de respuesta: 2.3 minutos
• Mantenimiento programado: 5 sesiones completadas

RECOMENDACIONES:
• Capacitar a María García en optimización de parámetros
• Revisar molde 3 (mayor tasa de defectos)
• Programar mantenimiento preventivo para inyector
• Considerar inversión en sistema de enfriamiento mejorado
```

### 7.3 Reporte de Visión Estratégica (Eje Principal)

#### 7.3.1 ¿Por qué estos datos y gráficas son el eje principal del destino de la aplicación?

**Relevancia Estratégica**:
- **Competitividad**: Los datos permiten posicionarse como líder en eficiencia
- **Sostenibilidad**: Optimización de recursos y reducción de desperdicios
- **Innovación**: Base para implementar tecnologías avanzadas (IA, IoT)
- **Crecimiento**: Datos justifican expansión y nuevas inversiones
- **Cumplimiento**: Satisfacción de estándares de calidad internacionales

**Ejemplo de Reporte**:
```
REPORTE ESTRATÉGICO - TRIMESTRE 1, 2024
Visión Ejecutiva - ECOBLASTIC_DEF

KPIs ESTRATÉGICOS:
• Productividad: +18.5% vs. trimestre anterior
• Calidad: 96.2% de piezas aprobadas (meta: 95%)
• Eficiencia energética: +22.3% de mejora
• ROI del sistema: 156% en 6 meses

ANÁLISIS DE MERCADO:
• Posicionamiento: Líder en eficiencia operacional del sector
• Ventaja competitiva: 15% menor costo por pieza vs. competencia
• Satisfacción del cliente: 98.5% (encuestas trimestrales)

INVESTIGACIÓN Y DESARROLLO:
• Implementación exitosa de monitoreo en tiempo real
• Base de datos: 45,000+ registros para análisis predictivo
• Preparación para integración con sistemas ERP

PROYECCIONES FUTURAS:
• Expansión a 3 líneas adicionales (Q2 2024)
• Implementación de IA para predicción de defectos (Q3 2024)
• Certificación ISO 9001:2015 (Q4 2024)

INVERSIÓN Y RETORNO:
• Inversión inicial: $125,000
• Ahorros acumulados: $195,000
• ROI proyectado a 2 años: 280%
• Valor agregado al negocio: $2.5M

DECISIONES ESTRATÉGICAS:
• Aprobar expansión de capacidad productiva
• Iniciar desarrollo de sistema de IA predictiva
• Establecer alianzas con proveedores de materiales
• Preparar presentación para inversores
```

---

## 8. DICCIONARIO DE DATOS DE LA BASE DE DATOS

### 8.1 Estructura de la Base de Datos

La base de datos utiliza MongoDB con la siguiente estructura principal:

```javascript
{
  _id: ObjectId,
  // Variables de configuración del proceso
  polymerUsage: {
    pet: Number,           // 0 o 1
    polypropylene: Number  // 0 o 1
  },
  moldUsage: {
    mold1: Number,         // 0 o 1
    mold2: Number,         // 0 o 1
    mold3: Number          // 0 o 1
  },
  
  // Variables de energía
  potentiometerEnergy: {
    used: Number,          // 0-100%
    remaining: Number      // 0-100%
  },
  injectorEnergy: {
    used: Number,          // 0-100%
    remaining: Number      // 0-100%
  },
  
  // Variables de parámetros de inyección
  injectionPressure: Number,    // 0-2000 bar
  injectionSpeed: Number,       // 0-500 mm/s
  holdingPressure: Number,      // 0-2000 bar
  holdingTime: Number,          // 0-60 segundos
  
  // Variables de enfriamiento
  coolingTime: Number,          // 0-300 segundos
  coolingTemperature: Number,   // 20-40°C
  
  // Variables de control de calidad
  cycleTime: Number,            // 0-600 segundos
  partWeight: Number,           // 0-1000 gramos
  partDimensions: {
    length: Number,             // 0-500 mm
    width: Number,              // 0-500 mm
    height: Number              // 0-500 mm
  },
  qualityStatus: String,        // 'excelente', 'bueno', 'regular', 'defectuoso'
  defects: {
    warping: Boolean,           // true/false
    sinkMarks: Boolean,         // true/false
    flash: Boolean,             // true/false
    shortShot: Boolean,         // true/false
    other: String               // Texto libre
  },
  
  // Variables de información del operador
  operatorName: String,         // Nombre del operador
  shift: String,                // 'mañana', 'tarde', 'noche'
  batchNumber: String,          // Número de batch
  lotNumber: String,            // Número de lote
  
  // Variables avanzadas (KPIs)
  materialUsado: Number,        // 0-1000 kg
  materialDesperdiciado: Number, // 0-1000 kg
  costoMaterialUsado: Number,   // 0-100000 MXN
  costoMaterialDesperdiciado: Number, // 0-100000 MXN
  tiempoEnfriamiento: Number,   // 0-300 segundos
  tiempoOperacionEfectiva: Number, // 0-480 minutos
  numeroAlertasTemperatura: Number, // 0-100
  tiempoRespuestaAlertas: Number, // 0-300 segundos
  costoTotalPorPieza: Number,   // 0-1000 MXN
  
  // Metadatos
  date: Date,                   // Fecha y hora del registro
  user: ObjectId,               // Referencia a User
  notes: String,                // Notas y observaciones
  processStatus: String,        // 'en_proceso', 'monitoreando', 'completado', 'pausado', 'cancelado'
  monitoringStartTime: Date,    // Tiempo de inicio del monitoreo
  monitoringEndTime: Date,      // Tiempo de fin del monitoreo
  monitoringDuration: Number,   // 0-86400 segundos
  temperature: Number           // 0-300°C
}
```

### 8.2 Validaciones y Restricciones

- **Al menos un material** debe estar seleccionado (PET o Polipropileno)
- **Al menos un molde** debe estar seleccionado
- **La suma de energías** usadas y restantes debe ser 100%
- **Los tiempos no pueden ser negativos**
- **Las temperaturas deben estar en rangos operativos**

### 8.3 Índices Recomendados

- **Índice principal**: _id (automático)
- **Índice de fecha**: date (para consultas por período)
- **Índice de usuario**: user (para filtros por usuario)
- **Índice de estado**: processStatus (para filtros por estado)
- **Índice compuesto**: date + user (para consultas de usuario por fecha)

---

## 9. CONCLUSIONES DE INFORMES O REPORTES

### 9.1 Conclusiones Principales

#### 9.1.1 Eficacia del Dashboard
El dashboard del sistema ECOBLASTIC_DEF demuestra ser una herramienta efectiva para el monitoreo industrial, proporcionando:
- **Visibilidad en tiempo real** del proceso de inyección de plásticos
- **KPIs relevantes** que facilitan la toma de decisiones
- **Visualizaciones profesionales** que comunican información compleja de manera clara
- **Alertas automáticas** que previenen problemas operacionales

#### 9.1.2 Relevancia de las Variables Seleccionadas
Las variables implementadas en el sistema son fundamentales porque:
- **Cubren todos los aspectos críticos** del proceso de inyección
- **Permiten correlaciones significativas** entre parámetros y resultados
- **Facilitan la identificación** de patrones de comportamiento
- **Soportan modelos predictivos** para optimización futura

#### 9.1.3 Impacto en la Toma de Decisiones
El sistema impacta positivamente en la toma de decisiones porque:
- **Proporciona datos objetivos** en lugar de intuiciones
- **Permite comparativas** entre diferentes períodos y operadores
- **Facilita la identificación** de oportunidades de mejora
- **Soporta decisiones estratégicas** con evidencia cuantitativa

### 9.2 Conclusiones por Tipo de Usuario

#### 9.2.1 Para el Cliente Final
- **Garantía de calidad** mediante datos objetivos y trazabilidad
- **Cumplimiento de especificaciones** documentado y verificable
- **Confianza en el proveedor** basada en transparencia de datos
- **Soporte para auditorías** y certificaciones de calidad

#### 9.2.2 Para el Administrador
- **Optimización de recursos** mediante análisis de eficiencia
- **Control de costos** a través de métricas financieras
- **Gestión de personal** basada en rendimiento objetivo
- **Planificación estratégica** fundamentada en datos históricos

#### 9.2.3 Para la Visión Estratégica
- **Posicionamiento competitivo** mediante eficiencia operacional
- **Justificación de inversiones** con ROI cuantificado
- **Base para innovación** y desarrollo de nuevas tecnologías
- **Sostenibilidad empresarial** a través de optimización de recursos

### 9.3 Conclusiones Técnicas

#### 9.3.1 Viabilidad de Modelos Predictivos
El sistema proporciona una base sólida para implementar modelos de clasificación y regresión:
- **Datos suficientes** y de calidad para entrenamiento
- **Variables bien definidas** con relaciones claras
- **Métricas de validación** para evaluar modelos
- **Aplicaciones prácticas** identificadas para cada tipo de modelo

#### 9.3.2 Escalabilidad del Sistema
El diseño del sistema permite:
- **Expansión a múltiples líneas** de producción
- **Integración con sistemas empresariales** existentes
- **Adaptación a diferentes tipos** de procesos industriales
- **Evolución hacia tecnologías** más avanzadas (IA, IoT)

### 9.4 Recomendaciones Finales

#### 9.4.1 Implementación Inmediata
1. **Capacitación del personal** en el uso del dashboard
2. **Establecimiento de metas** basadas en KPIs identificados
3. **Implementación de alertas** automáticas para valores críticos
4. **Revisión periódica** de reportes y métricas

#### 9.4.2 Desarrollo Futuro
1. **Implementación de modelos predictivos** de clasificación y regresión
2. **Integración con sistemas ERP** y de gestión empresarial
3. **Desarrollo de aplicaciones móviles** para acceso remoto
4. **Expansión a otras áreas** de la empresa

#### 9.4.3 Medición de Impacto
1. **Establecimiento de líneas base** para comparación futura
2. **Monitoreo continuo** de KPIs y métricas
3. **Evaluación periódica** del ROI del sistema
4. **Feedback de usuarios** para mejoras continuas

---

## 10. ANEXOS

### Anexo A: Capturas de Pantalla del Dashboard
- Dashboard principal con KPIs
- Gráficos de análisis avanzado
- Formulario de monitoreo
- Control de calidad

### Anexo B: Código Fuente del Sistema
- Repositorio del proyecto
- Documentación de API
- Manual de usuario

### Anexo C: Datos de Prueba
- Conjunto de datos de ejemplo
- Estadísticas descriptivas
- Análisis de correlaciones

---

### REFERENCIAS BIBLIOGRÁFICAS

1. ISO 9001:2015 - Sistemas de Gestión de Calidad
2. ISO 14001:2015 - Sistemas de Gestión Ambiental
3. ASTM D638 - Resistencia a la Tracción de Plásticos
4. ASTM D790 - Propiedades de Flexión de Plásticos
5. "Industry 4.0: The Industrial Internet of Things" - Hermann, M., et al.
6. "Key Performance Indicators for Manufacturing" - Parmenter, D.
7. "Data Science for Business" - Provost, F., & Fawcett, T.
8. "Predictive Analytics: The Power to Predict Who Will Click, Buy, Lie, or Die" - Siegel, E.

---

**Documento generado por:** [TU NOMBRE]  
**Fecha:** [FECHA ACTUAL]  
**Versión:** 1.0  
**Sistema:** ECOBLASTIC_DEF 