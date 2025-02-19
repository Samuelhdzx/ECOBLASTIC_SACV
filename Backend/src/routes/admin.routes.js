import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { updateUserSettings, updateSystemSettings, generateAnalytics } from '../controllers/admin_controller.js';

const router = Router();

router.put('/users/:userId', validateToken, updateUserSettings);
router.put('/system-settings', validateToken, updateSystemSettings);
router.get('/analytics', validateToken, generateAnalytics);

export default router;
