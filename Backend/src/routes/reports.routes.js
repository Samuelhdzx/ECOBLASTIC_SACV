import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import Mold from "../models/mold.js";
import ProductionSession from "../models/productionSession.js";
import Temperature from "../models/temperature.js";

const router = Router();

// Obtener reportes de temperatura con filtros
router.get('/temperature', authRequired, async (req, res) => {
    try {
        const { startDate, endDate, moldId, userId } = req.query;
        const query = {};
        
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const data = await Temperature.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(req.query.limit) || 100);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener reportes de moldes
router.get('/molds', authRequired, async (req, res) => {
    try {
        const molds = await Mold.find({});
        res.json(molds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener sesiones de producción
router.get('/production-sessions', authRequired, async (req, res) => {
    try {
        const { startDate, endDate, moldId, userId } = req.query;
        const query = {};

        if (startDate && endDate) {
            query.startTime = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        if (moldId) query.moldId = moldId;
        if (userId) query.userId = userId;

        const sessions = await ProductionSession.find(query)
            .populate('userId', 'username')
            .populate('moldId', 'name');

        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
