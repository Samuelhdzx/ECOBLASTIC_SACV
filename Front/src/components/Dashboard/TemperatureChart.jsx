import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const TemperatureChart = ({ data }) => {
    const theme = useTheme();

    const chartData = [{
        id: 'temperatura',
        data: data.map((d, i) => ({
            x: i,
            y: d.temperature
        }))
    }];

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Temperatura en Tiempo Real
            </Typography>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ height: 300 }}
            >
                <ResponsiveLine
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Tiempo',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Temperatura (°C)',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={theme.palette.primary.main}
                    lineWidth={3}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    enableArea={true}
                    areaOpacity={0.1}
                    crosshairType="cross"
                    motionConfig="gentle"
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: theme.palette.text.secondary
                                }
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.text.primary,
                                    fontSize: 12
                                }
                            }
                        },
                        grid: {
                            line: {
                                stroke: theme.palette.divider,
                                strokeWidth: 1
                            }
                        },
                        crosshair: {
                            line: {
                                stroke: theme.palette.primary.main,
                                strokeWidth: 1,
                                strokeOpacity: 0.35
                            }
                        }
                    }}
                />
            </motion.div>
        </Box>
    );
};

export default TemperatureChart;
