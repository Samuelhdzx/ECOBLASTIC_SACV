import {Router} from "express";
import { authRequired } from "../middlewares/validateToken.js";
import  data_sensorsSchema from "../models/data_sensors.js";
const router = Router();
import { getDatas, getData, createData, updateData, deleteData } from "../controllers/dash_controller.js";

//ENDPOINTS
// get all dates
router.get('/data_sensors', authRequired, getDatas);

// get a date
router.get('/data_sensors/:id', authRequired, getData);

//create date
router.post('/data_sensors', authRequired,  createData );

// update a date
router.put('/data_sensors/:id', authRequired, updateData);

// delete a date
router.delete('/data_sensors/:id', authRequired, deleteData);

export default router;