import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data_sensorsRoutes from "./routes/data_sensors.js";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

//configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// settings
const port = process.env.PORT || 9000;


app.use('/api', data_sensorsRoutes);

//routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

//mongo db connection
console.log('Intentando conectar con URI:', process.env.MONGO_URI); // <- AQUÍ el nuevo console.log

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));

