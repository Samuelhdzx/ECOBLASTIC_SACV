import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const HumidityChart = ({ data }) => {
    const theme = useTheme();

    const chartData = [{
        id: 'humedad',
        data: data.map((d, i) => ({
            x: i,
            y: d.humidity
        }))
    }];

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Humedad en Tiempo Real
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
                        min: 0,
                        max: 100,
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
                        legend: 'Humedad (%)',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={theme.palette.secondary.main}
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
                                stroke: theme.palette.secondary.main,
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

export default HumidityChart;
