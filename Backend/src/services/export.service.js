import { Parser } from 'json2csv';
import xlsx from 'xlsx';
import SensorData from '../models/sensor.model.js';

class ExportService {
    async exportData(deviceId, startDate, endDate, format = 'csv') {
        try {
            const data = await SensorData.find({
                deviceId,
                timestamp: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).sort({ timestamp: 1 });

            if (!data.length) {
                throw new Error('No data found for the specified period');
            }

            switch (format.toLowerCase()) {
                case 'csv':
                    return this.exportToCSV(data);
                case 'xlsx':
                    return this.exportToExcel(data);
                case 'json':
                    return this.exportToJSON(data);
                default:
                    throw new Error('Unsupported format');
            }
        } catch (error) {
            console.error('Error exporting data:', error);
            throw error;
        }
    }

    exportToCSV(data) {
        const fields = ['deviceId', 'temperature', 'humidity', 'timestamp'];
        const opts = { fields };
        const parser = new Parser(opts);
        
        try {
            const csv = parser.parse(data);
            return {
                data: Buffer.from(csv),
                contentType: 'text/csv'
            };
        } catch (error) {
            console.error('Error parsing to CSV:', error);
            throw error;
        }
    }

    exportToExcel(data) {
        try {
            const worksheet = xlsx.utils.json_to_sheet(data.map(item => ({
                deviceId: item.deviceId,
                temperature: item.temperature,
                humidity: item.humidity,
                timestamp: new Date(item.timestamp).toLocaleString()
            })));

            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Sensor Data');

            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'buffer'
            });

            return {
                data: excelBuffer,
                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            };
        } catch (error) {
            console.error('Error creating Excel file:', error);
            throw error;
        }
    }

    exportToJSON(data) {
        try {
            const jsonData = data.map(item => ({
                deviceId: item.deviceId,
                temperature: item.temperature,
                humidity: item.humidity,
                timestamp: item.timestamp
            }));

            return {
                data: Buffer.from(JSON.stringify(jsonData, null, 2)),
                contentType: 'application/json'
            };
        } catch (error) {
            console.error('Error creating JSON:', error);
            throw error;
        }
    }
}

const exportService = new ExportService();
export default exportService;
