import data_sensorsSchema from "../models/data_sensors.js";


    export const createData = async (req, res) => {
        try {
            const { polymerUsage, potentiometerEnergy, injectorEnergy, moldUsage, temperature, injectionTime } = req.body;
            
            const newData = new data_sensorsSchema({
                polymerUsage,
                potentiometerEnergy,
                injectorEnergy,
                moldUsage,
                temperature,
                injectionTime,
                user: req.user.id  // Aquí asignamos el ID del usuario autenticado
            });
            
            const savedData = await newData.save();
            res.json(savedData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    export const getDatas = async (req, res) => {
    const datas = await data_sensorsSchema.find({
        user: req.user.id
    }
    ).populate('user');
    res.json(datas);
    }

    export const getData = async (req, res) => {
        const data =await data_sensorsSchema.findById(req.params.id).populate('user');
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.json(data);
    }

    export const updateData = async (req, res) => {
    const data = await data_sensorsSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.json(data);
    }

    export const deleteData = async (req, res) => {
    const data = await data_sensorsSchema.findByIdAndDelete(req.params.id)
    if (!data) return res.status(404).json({ message: "Data not found" });
    return res.sendStatus(204);
    }