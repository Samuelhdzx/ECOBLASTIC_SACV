import express from "express";
import  dotenv from "dotenv";
import mongoose from "mongoose";
import data_sensorsRoutes from "./routes/data_sensors.js";
//configs
dotenv.config();

// settings
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', data_sensorsRoutes);

//routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

//mongo db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));