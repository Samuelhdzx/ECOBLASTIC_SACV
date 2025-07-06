    // ============================================
    // Import Dependencies
    // ============================================
    import data_sensorsSchema from "../models/data_sensors.js";

    // ============================================
    // Data Sensors Controllers
    // ============================================

    /**
     * Create new sensor data entry
     * @param {Request} req - Express request object containing sensor data and user ID
     * @param {Response} res - Express response object
     */
    export const createData = async (req, res) => {
        try {
            const { 
                polymerUsage, 
                potentiometerEnergy, 
                injectorEnergy, 
                moldUsage, 
                temperature, 
                injectionTime 
            } = req.body;
            
            // Create new data entry with user reference
            const newData = new data_sensorsSchema({
                polymerUsage,
                potentiometerEnergy,
                injectorEnergy,
                moldUsage,
                temperature,
                injectionTime,
                user: req.user.id
            });
            
            const savedData = await newData.save();
            res.json(savedData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /**
     * Get all sensor data entries for a specific user
     * @param {Request} req - Express request object containing user ID
     * @param {Response} res - Express response object
     */
    export const getDatas = async (req, res) => {
        const datas = await data_sensorsSchema.find({
            user: req.user.id
        }).populate('user');
        res.json(datas);
    };

    /**
     * Get all sensor data entries for advanced analysis (admin only)
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    export const getAllDataForAnalysis = async (req, res) => {
        try {
            const datas = await data_sensorsSchema.find({}).populate('user');
            res.json({ data: datas });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    /**
     * Get specific sensor data entry by ID
     * @param {Request} req - Express request object containing data ID
     * @param {Response} res - Express response object
     */
    export const getData = async (req, res) => {
        const data = await data_sensorsSchema.findById(req.params.id).populate('user');
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.json(data);
    };

    /**
     * Update specific sensor data entry
     * @param {Request} req - Express request object containing data ID and updated fields
     * @param {Response} res - Express response object
     */
    export const updateData = async (req, res) => {
        const data = await data_sensorsSchema.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.json(data);
    };

    /**
     * Delete specific sensor data entry
     * @param {Request} req - Express request object containing data ID
     * @param {Response} res - Express response object
     */
    export const deleteData = async (req, res) => {
        const data = await data_sensorsSchema.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Data not found" });
        return res.sendStatus(204);
    };
