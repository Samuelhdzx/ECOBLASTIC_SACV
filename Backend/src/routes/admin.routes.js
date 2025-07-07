import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { 
    updateUserSettings, 
    updateSystemSettings, 
    generateAnalytics,
    getProductionMetrics,
    getInventoryLevels,
    getQualityMetrics,
    getMaintenanceSchedule,
    updateMachineParams
} from '../controllers/admin_controller.js';

const router = Router();

router.put('/users/:userId', validateToken, updateUserSettings);
router.put('/system-settings', validateToken, updateSystemSettings);
router.get('/analytics', validateToken, generateAnalytics);

// Nuevas rutas para métricas en tiempo real
router.get('/production-metrics', validateToken, getProductionMetrics);
router.get('/inventory-levels', validateToken, getInventoryLevels);
router.get('/quality-metrics', validateToken, getQualityMetrics);
router.get('/maintenance-schedule', validateToken, getMaintenanceSchedule);
router.put('/machine-params', validateToken, updateMachineParams);

export default router;
