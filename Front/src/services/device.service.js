import axios from 'axios';

const API_URL = 'http://localhost:1337/api/esp32';

class DeviceService {
    async getDevices() {
        try {
            const response = await axios.get(`${API_URL}/devices`);
            return response.data;
        } catch (error) {
            console.error('Error getting devices:', error);
            throw error;
        }
    }

    async getDeviceById(deviceId) {
        try {
            const response = await axios.get(`${API_URL}/devices/${deviceId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting device:', error);
            throw error;
        }
    }

    async getDeviceData(deviceId) {
        try {
            const response = await axios.get(`${API_URL}/devices/${deviceId}/data`);
            return response.data;
        } catch (error) {
            console.error('Error getting device data:', error);
            throw error;
        }
    }

    async updateDevice(deviceId, data) {
        try {
            const response = await axios.put(`${API_URL}/devices/${deviceId}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating device:', error);
            throw error;
        }
    }

    async exportData(deviceId, startDate, endDate, format = 'csv') {
        try {
            const response = await axios.get(`${API_URL}/devices/${deviceId}/export`, {
                params: { startDate, endDate, format },
                responseType: 'blob'
            });

            const fileName = `device_${deviceId}_data_${new Date().toISOString().split('T')[0]}.${format}`;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    }

    async setMonitoringSchedule(deviceId, schedule) {
        try {
            const response = await axios.post(`${API_URL}/devices/${deviceId}/schedule`, schedule);
            return response.data;
        } catch (error) {
            console.error('Error setting schedule:', error);
            throw error;
        }
    }

    async getMonitoringSchedule(deviceId) {
        try {
            const response = await axios.get(`${API_URL}/devices/${deviceId}/schedule`);
            return response.data;
        } catch (error) {
            console.error('Error getting schedule:', error);
            throw error;
        }
    }

    async calibrateSensor(deviceId) {
        try {
            const response = await axios.post(`${API_URL}/devices/${deviceId}/calibrate`);
            return response.data;
        } catch (error) {
            console.error('Error calibrating sensor:', error);
            throw error;
        }
    }
}

export const deviceService = new DeviceService();
