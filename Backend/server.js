import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import sensorRoutes from"./routes/sensor.js"
import SENSOR from './models/SENSOR.js';
import { sensors } from './data/data.js';

//Config
dotenv.config()
const app = express ();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

//ROUTES
app.use("/sensor", sensorRoutes)

//Mongoose config 
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        await mongoose.connection.db.dropDatabase() 
        SENSOR.insertMany(sensors);
    })
    .catch((error) =>  console.log(`${error} did not connect`));

























