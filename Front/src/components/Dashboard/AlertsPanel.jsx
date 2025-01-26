import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Warning,
    Delete,
    Info
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AlertsPanel = ({ alerts }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const getAlertSeverity = (temperature) => {
        if (temperature >= 35) return 'error';
        if (temperature >= 30) return 'warning';
        return 'info';
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Alertas Recientes
            </Typography>
            <List>
                <AnimatePresence>
                    {alerts.map((alert, index) => (
                        <motion.div
                            key={alert.timestamp}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ListItem
                                sx={{
                                    mb: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                                secondaryAction={
                                    <Tooltip title="Eliminar alerta">
                                        <IconButton edge="end" aria-label="delete">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                }
                            >
                                <ListItemIcon>
                                    {getAlertSeverity(alert.temperature) === 'error' ? (
                                        <Warning color="error" />
                                    ) : getAlertSeverity(alert.temperature) === 'warning' ? (
                                        <Warning color="warning" />
                                    ) : (
                                        <Info color="info" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={`Temperatura: ${alert.temperature}°C`}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Dispositivo: {alert.deviceId}
                                            </Typography>
                                            <br />
                                            {formatDate(alert.timestamp)}
                                        </>
                                    }
                                />
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {alerts.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary="No hay alertas"
                            secondary="El sistema está funcionando normalmente"
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    );
};

export default AlertsPanel;
