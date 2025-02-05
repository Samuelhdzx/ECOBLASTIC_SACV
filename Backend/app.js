    import express from "express";
    import dotenv from "dotenv";
    import mongoose from "mongoose";
    import data_sensorsRoutes from "./src/routes/data_sensors.js";
    import authRoutes from "./src/routes/auth.routes.js";
    import esp32Routes from "./src/routes/esp32.routes.js";
    import bodyParser from "body-parser";
    import cors from "cors";
    import helmet from "helmet";
    import morgan from "morgan";
    import cookieParser from "cookie-parser";
    //configs
    dotenv.config();
    const app = express();
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));app.use(helmet());
    app.use(cookieParser());
    app.use('/api', data_sensorsRoutes);
    app.use('/api', authRoutes);
    app.use('/api/esp32', esp32Routes);


    //routes
    // app.get("/", (req, res) => {
    //     res.send("Welcome to my API");
    // });

    //mongo db connection
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB Atlas"))
        .catch((error) => console.error(error));

    // server listening
    export default app;