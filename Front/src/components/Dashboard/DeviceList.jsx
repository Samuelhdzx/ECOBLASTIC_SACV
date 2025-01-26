import React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Chip
} from '@mui/material';
import {
    DeviceHub,
    CheckCircle,
    Error,
    ArrowForward
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DeviceList = ({ devices, selectedDevice, onDeviceSelect }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Dispositivos
            </Typography>
            <List>
                {devices.map((device, index) => (
                    <motion.div
                        key={device.deviceId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                selected={selectedDevice?.deviceId === device.deviceId}
                                onClick={() => onDeviceSelect(device)}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        backgroundColor: 'primary.light',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <DeviceHub color={selectedDevice?.deviceId === device.deviceId ? 'white' : 'primary'} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={device.name || `Dispositivo ${device.deviceId}`}
                                    secondary={
                                        <Chip
                                            size="small"
                                            icon={device.status === 'online' ? <CheckCircle /> : <Error />}
                                            label={device.status === 'online' ? 'En línea' : 'Desconectado'}
                                            color={device.status === 'online' ? 'success' : 'error'}
                                            sx={{ mt: 1 }}
                                        />
                                    }
                                />
                                <ArrowForward color={selectedDevice?.deviceId === device.deviceId ? 'white' : 'primary'} />
                            </ListItemButton>
                        </ListItem>
                    </motion.div>
                ))}
            </List>
        </Box>
    );
};

export default DeviceList;
