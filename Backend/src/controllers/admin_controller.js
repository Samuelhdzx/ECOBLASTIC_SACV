import data_sensorsSchema from '../models/data_sensors.js';
import User from '../models/user.js';

/**
 * Obtener métricas de producción en tiempo real
 */
export const getProductionMetrics = async (req, res) => {
    try {
        // Obtener datos de los últimos 30 días
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const productionData = await data_sensorsSchema.find({
            date: { $gte: thirtyDaysAgo },
            processStatus: 'completado'
        });

        // Calcular métricas
        const totalPieces = productionData.length;
        const totalProduction = productionData.reduce((sum, item) => sum + (item.materialUsado || 0), 0);
        const avgCycleTime = productionData.reduce((sum, item) => sum + (item.cycleTime || 0), 0) / totalPieces;
        const avgTemperature = productionData.reduce((sum, item) => sum + (item.temperature || 0), 0) / totalPieces;
        const avgPressure = productionData.reduce((sum, item) => sum + (item.injectionPressure || 0), 0) / totalPieces;
        const avgSpeed = productionData.reduce((sum, item) => sum + (item.injectionSpeed || 0), 0) / totalPieces;

        // Calcular eficiencia (tiempo operativo vs tiempo total)
        const totalMonitoringTime = productionData.reduce((sum, item) => sum + (item.monitoringDuration || 0), 0);
        const totalCycleTime = productionData.reduce((sum, item) => sum + (item.cycleTime || 0), 0);
        const efficiency = totalCycleTime > 0 ? ((totalCycleTime / totalMonitoringTime) * 100) : 0;

        // Calcular tiempo activo en horas
        const uptime = totalMonitoringTime / 3600;

        res.json({
            success: true,
            data: {
                totalProduction: totalProduction.toFixed(2),
                efficiency: efficiency.toFixed(1),
                uptime: uptime.toFixed(1),
                totalPieces,
                avgCycleTime: avgCycleTime.toFixed(1),
                machineStatus: {
                    temperature: avgTemperature.toFixed(1),
                    pressure: avgPressure.toFixed(1),
                    speed: avgSpeed.toFixed(1)
                }
            }
        });
    } catch (error) {
        console.error('Error getting production metrics:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al obtener métricas de producción",
            error: error.message 
        });
    }
};

/**
 * Obtener niveles de inventario
 */
export const getInventoryLevels = async (req, res) => {
    try {
        // Obtener datos de los últimos 7 días para calcular consumo
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentData = await data_sensorsSchema.find({
            date: { $gte: sevenDaysAgo },
            processStatus: 'completado'
        });

        // Calcular consumo de materiales
        const petUsed = recentData.reduce((sum, item) => {
            if (item.polymerUsage?.pet === 1) {
                return sum + (item.materialUsado || 0);
            }
            return sum;
        }, 0);

        const polypropyleneUsed = recentData.reduce((sum, item) => {
            if (item.polymerUsage?.polypropylene === 1) {
                return sum + (item.materialUsado || 0);
            }
            return sum;
        }, 0);

        // Simular inventario actual (en un sistema real esto vendría de una tabla de inventario)
        const currentPet = Math.max(0, 1000 - petUsed); // Inventario inicial 1000kg
        const currentPolypropylene = Math.max(0, 1500 - polypropyleneUsed); // Inventario inicial 1500kg

        // Generar alertas si el inventario está bajo
        const alerts = [];
        if (currentPet < 100) {
            alerts.push({
                type: 'warning',
                message: `PET bajo: ${currentPet.toFixed(1)}kg restantes`
            });
        }
        if (currentPolypropylene < 150) {
            alerts.push({
                type: 'warning',
                message: `Polipropileno bajo: ${currentPolypropylene.toFixed(1)}kg restantes`
            });
        }

        res.json({
            success: true,
            data: {
                materials: {
                    pet: currentPet.toFixed(1),
                    polypropylene: currentPolypropylene.toFixed(1)
                },
                alerts
            }
        });
    } catch (error) {
        console.error('Error getting inventory levels:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al obtener niveles de inventario",
            error: error.message 
        });
    }
};

/**
 * Obtener métricas de calidad
 */
export const getQualityMetrics = async (req, res) => {
    try {
        // Obtener datos de los últimos 30 días
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const qualityData = await data_sensorsSchema.find({
            date: { $gte: thirtyDaysAgo },
            processStatus: 'completado'
        });

        // Calcular tasa de defectos
        const totalPieces = qualityData.length;
        const defectivePieces = qualityData.filter(item => item.qualityStatus === 'defectuoso').length;
        const defectRate = totalPieces > 0 ? (defectivePieces / totalPieces) * 100 : 0;

        // Generar alertas de calidad
        const alerts = [];
        if (defectRate > 5) {
            alerts.push({
                severity: 'high',
                message: `Tasa de defectos alta: ${defectRate.toFixed(1)}%`,
                time: new Date().toLocaleString()
            });
        }

        // Verificar defectos específicos
        const warpingDefects = qualityData.filter(item => item.defects?.warping).length;
        const sinkMarksDefects = qualityData.filter(item => item.defects?.sinkMarks).length;
        const flashDefects = qualityData.filter(item => item.defects?.flash).length;

        if (warpingDefects > 0) {
            alerts.push({
                severity: 'medium',
                message: `${warpingDefects} piezas con defecto de deformación`,
                time: new Date().toLocaleString()
            });
        }

        if (sinkMarksDefects > 0) {
            alerts.push({
                severity: 'medium',
                message: `${sinkMarksDefects} piezas con hundimiento`,
                time: new Date().toLocaleString()
            });
        }

        if (flashDefects > 0) {
            alerts.push({
                severity: 'medium',
                message: `${flashDefects} piezas con rebaba`,
                time: new Date().toLocaleString()
            });
        }

        res.json({
            success: true,
            data: {
                defectRate: defectRate.toFixed(1),
                totalPieces,
                defectivePieces,
                alerts
            }
        });
    } catch (error) {
        console.error('Error getting quality metrics:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al obtener métricas de calidad",
            error: error.message 
        });
    }
};

/**
 * Obtener horario de mantenimiento
 */
export const getMaintenanceSchedule = async (req, res) => {
    try {
        // Simular datos de mantenimiento (en un sistema real esto vendría de una tabla de mantenimiento)
        const nextMaintenance = new Date();
        nextMaintenance.setDate(nextMaintenance.getDate() + 7); // Próximo mantenimiento en 7 días

        const maintenanceHistory = [
            {
                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                type: 'Preventivo',
                description: 'Limpieza de inyectora y calibración de sensores',
                technician: 'Juan Pérez'
            },
            {
                date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                type: 'Correctivo',
                description: 'Reparación de sistema de enfriamiento',
                technician: 'María García'
            },
            {
                date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                type: 'Preventivo',
                description: 'Cambio de filtros y lubricación',
                technician: 'Carlos López'
            }
        ];

        res.json({
            success: true,
            data: {
                nextMaintenance: nextMaintenance.toLocaleDateString(),
                frequency: 'weekly',
                lastMaintenance: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                maintenanceHistory
            }
        });
    } catch (error) {
        console.error('Error getting maintenance schedule:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al obtener horario de mantenimiento",
            error: error.message 
        });
    }
};

/**
 * Actualizar parámetros de máquina
 */
export const updateMachineParams = async (req, res) => {
    try {
        const { temperature, pressure, speed } = req.body;
        
        // En un sistema real, esto actualizaría los parámetros de la máquina
        // Por ahora, solo simulamos la actualización
        
        res.json({
            success: true,
            message: "Parámetros actualizados correctamente",
            data: {
                temperature: temperature || 180,
                pressure: pressure || 100,
                speed: speed || 1500
            }
        });
    } catch (error) {
        console.error('Error updating machine params:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al actualizar parámetros de máquina",
            error: error.message 
        });
    }
};

/**
 * Actualizar configuración de usuario
 */
export const updateUserSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Configuración de usuario actualizada",
            data: updatedUser
        });
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al actualizar configuración de usuario",
            error: error.message 
        });
    }
};

/**
 * Actualizar configuración del sistema
 */
export const updateSystemSettings = async (req, res) => {
    try {
        const { qualityThresholds, productionSchedule, maintenanceSchedule } = req.body;
        
        // En un sistema real, esto guardaría la configuración en una tabla de configuración
        // Por ahora, solo simulamos la actualización
        
        res.json({
            success: true,
            message: "Configuración del sistema actualizada",
            data: {
                qualityThresholds: qualityThresholds || {},
                productionSchedule: productionSchedule || {},
                maintenanceSchedule: maintenanceSchedule || {}
            }
        });
    } catch (error) {
        console.error('Error updating system settings:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al actualizar configuración del sistema",
            error: error.message 
        });
    }
};

/**
 * Generar análisis y reportes
 */
export const generateAnalytics = async (req, res) => {
    try {
        const { period } = req.query; // daily, weekly, monthly
        
        // Obtener datos según el período
        const startDate = new Date();
        switch (period) {
            case 'daily':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'weekly':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'monthly':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            default:
                startDate.setDate(startDate.getDate() - 30);
        }

        const analyticsData = await data_sensorsSchema.find({
            date: { $gte: startDate },
            processStatus: 'completado'
        });

        // Calcular métricas para el reporte
        const totalProduction = analyticsData.reduce((sum, item) => sum + (item.materialUsado || 0), 0);
        const totalPieces = analyticsData.length;
        const defectRate = totalPieces > 0 ? 
            (analyticsData.filter(item => item.qualityStatus === 'defectuoso').length / totalPieces) * 100 : 0;
        const avgEfficiency = analyticsData.reduce((sum, item) => {
            const cycleEfficiency = item.cycleTime && item.monitoringDuration ? 
                (item.cycleTime / item.monitoringDuration) * 100 : 0;
            return sum + cycleEfficiency;
        }, 0) / totalPieces;

        res.json({
            success: true,
            data: {
                period,
                totalProduction: totalProduction.toFixed(2),
                totalPieces,
                defectRate: defectRate.toFixed(1),
                avgEfficiency: avgEfficiency.toFixed(1),
                uptime: (analyticsData.reduce((sum, item) => sum + (item.monitoringDuration || 0), 0) / 3600).toFixed(1)
            }
        });
    } catch (error) {
        console.error('Error generating analytics:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error al generar análisis",
            error: error.message 
        });
    }
};
