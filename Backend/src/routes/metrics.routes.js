import express from 'express';
import { Router } from 'express';
const router = Router();

// Rutas para cada tipo de métrica
router.get('/productivity', getProductivityMetrics);
router.get('/quality', getQualityMetrics);
router.get('/operator/:id', getOperatorMetrics);
router.get('/mold/:id', getMoldMetrics);
router.get('/machine', getMachineEfficiency);
router.get('/costs', getCostMetrics);

export default router;
