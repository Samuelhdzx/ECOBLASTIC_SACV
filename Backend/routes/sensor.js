import express from "express";
import SENSOR from "../models/SENSOR";

const router = express.Router();

router.get("/sensors", async (req, res) => {
    try {
        const sensors = await KPI.find();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
