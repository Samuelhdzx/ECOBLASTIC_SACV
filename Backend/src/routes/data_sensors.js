import express from "express";
import data_sensorsSchema from "../models/data_sensors.js";

const router = express.Router();

//ENDPOINTS


//create date
router.post('/data_sensors', (req, res) => {
    const data_sensors = data_sensorsSchema(req.body);
    data_sensors
    .save()
    .then ((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// get all dates
router.get('/data_sensors', (req, res) => {
    data_sensorsSchema
    .find()
    .then((data) => {
        res.json(data);
    }).catch((error) => res.json({message: error}))
});

// get a date
router.get('/data_sensors/:id', (req, res) => {
    const { id } = req.params;
    data_sensorsSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});

// update a date
router.put('/data_sensors/:id', (req, res) => {
    const { id } = req.params;
    const { temperature, humidity, date } = req.body;
    data_sensorsSchema
    .updateOne({ _id: id }, { $set: { temperature, humidity, date } })
    .then((data) => res.json(data))
    .catch((error) =>  res.json({message: error}))
});

// delete a date
router.delete('/data_sensors/:id', (req, res) => {
    const { id } = req.params;
    data_sensorsSchema.findByIdAndDelete(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
});




export default router;