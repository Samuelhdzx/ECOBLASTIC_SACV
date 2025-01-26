import schedule from 'node-schedule';
import Device from '../models/device.model.js';
import mqttService from './mqtt.service.js';

class ScheduleService {
    constructor() {
        this.schedules = new Map();
        this.loadAllSchedules();
    }

    async loadAllSchedules() {
        try {
            const devices = await Device.find({ 'schedule.enabled': true });
            devices.forEach(device => {
                this.setupDeviceSchedule(device.deviceId, device.schedule);
            });
        } catch (error) {
            console.error('Error loading schedules:', error);
        }
    }

    setupDeviceSchedule(deviceId, scheduleConfig) {
        // Cancelar programaciones existentes
        if (this.schedules.has(deviceId)) {
            this.schedules.get(deviceId).forEach(job => job.cancel());
        }

        if (!scheduleConfig.enabled) {
            return;
        }

        const jobs = [];
        const days = Object.entries(scheduleConfig.days)
            .filter(([_, enabled]) => enabled)
            .map(([day]) => day);

        days.forEach(day => {
            // Programar inicio de monitoreo
            const startJob = schedule.scheduleJob(
                `start-${deviceId}-${day}`,
                { dayOfWeek: this.getDayNumber(day), hour: scheduleConfig.startTime.getHours(), minute: scheduleConfig.startTime.getMinutes() },
                () => this.startMonitoring(deviceId)
            );

            // Programar fin de monitoreo
            const endJob = schedule.scheduleJob(
                `end-${deviceId}-${day}`,
                { dayOfWeek: this.getDayNumber(day), hour: scheduleConfig.endTime.getHours(), minute: scheduleConfig.endTime.getMinutes() },
                () => this.stopMonitoring(deviceId)
            );

            jobs.push(startJob, endJob);
        });

        this.schedules.set(deviceId, jobs);
    }

    getDayNumber(day) {
        const days = {
            sunday: 0,
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 5,
            saturday: 6
        };
        return days[day.toLowerCase()];
    }

    async startMonitoring(deviceId) {
        try {
            await Device.findOneAndUpdate(
                { deviceId },
                { monitoring: true }
            );
            
            mqttService.sendCommand(deviceId, {
                action: 'startMonitoring'
            });
        } catch (error) {
            console.error(`Error starting monitoring for device ${deviceId}:`, error);
        }
    }

    async stopMonitoring(deviceId) {
        try {
            await Device.findOneAndUpdate(
                { deviceId },
                { monitoring: false }
            );
            
            mqttService.sendCommand(deviceId, {
                action: 'stopMonitoring'
            });
        } catch (error) {
            console.error(`Error stopping monitoring for device ${deviceId}:`, error);
        }
    }

    async updateSchedule(deviceId, scheduleConfig) {
        try {
            await Device.findOneAndUpdate(
                { deviceId },
                { schedule: scheduleConfig }
            );

            this.setupDeviceSchedule(deviceId, scheduleConfig);
            return true;
        } catch (error) {
            console.error(`Error updating schedule for device ${deviceId}:`, error);
            throw error;
        }
    }

    async getSchedule(deviceId) {
        try {
            const device = await Device.findOne({ deviceId });
            return device?.schedule || null;
        } catch (error) {
            console.error(`Error getting schedule for device ${deviceId}:`, error);
            throw error;
        }
    }
}

const scheduleService = new ScheduleService();
export default scheduleService;
