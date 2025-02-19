export const updateUserSettings = async (req, res) => {
    const { userId, newPassword, isActive } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
            password: newPassword ? await bcrypt.hash(newPassword, 10) : undefined,
            isActive: isActive
        }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateSystemSettings = async (req, res) => {
    const { temperatureThreshold, humidityThreshold } = req.body;
    try {
        const settings = await SystemSettings.findOneAndUpdate({}, {
            temperatureThreshold,
            humidityThreshold
        }, { new: true, upsert: true });
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const generateAnalytics = async (req, res) => {
    try {
        const sensorData = await SensorData.find({})
            .sort({ timestamp: -1 })
            .limit(100);
            
        const analytics = {
            averageTemperature: calculateAverage(sensorData.map(d => d.temperature)),
            averageHumidity: calculateAverage(sensorData.map(d => d.humidity)),
            temperatureTrend: calculateTrend(sensorData.map(d => d.temperature)),
            timeSeriesData: sensorData
        };
        
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
