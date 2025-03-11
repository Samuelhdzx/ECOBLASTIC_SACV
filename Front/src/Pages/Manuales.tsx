import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import manualTecnico from '../../public/pdf/ECOBLASTIC manual (3) (1).pdf';
import manualUsuario from '../../public/pdf/MANUAL INYECTORA.pdf';
import './Manuales.css';

const Manuales = () => {
  const theme = useTheme();

  return (
    <Box
      className="manuales-container"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '--card-background-color': theme.palette.background.paper,
        '--text-color': theme.palette.text.primary,
        '--button-background-color': theme.palette.primary.main,
        '--button-text-color': theme.palette.primary.contrastText,
      }}
    >
      <Box className="manuales-header">
        <Typography variant="h1">Guía Técnica de Materiales y Procesos</Typography>
        <Typography variant="body1">Información detallada sobre plásticos, moldes y procedimientos</Typography>
      </Box>

      <Box className="info-sectionM">
        <Box className="info-cardM">
          <Typography variant="h2">🔬 Plásticos Utilizados</Typography>
          <Box className="info-contentM">
            <Typography variant="h3">PET (Tereftalato de Polietileno)</Typography>
            <Typography variant="body1">Material versátil con excelentes propiedades:</Typography>
            <ul>
              <li>Temperatura de fusión: 260°C</li>
              <li>Resistencia al impacto alta</li>
              <li>Transparencia y brillo excepcional</li>
              <li>100% Reciclable</li>
            </ul>

            <Typography variant="h3">Polipropileno (PP)</Typography>
            <Typography variant="body1">Termoplástico de alta resistencia:</Typography>
            <ul>
              <li>Temperatura de fusión: 170°C</li>
              <li>Excelente resistencia química</li>
              <li>Bajo costo de producción</li>
              <li>Alta durabilidad</li>
            </ul>
          </Box>
        </Box>

        <Box className="info-cardM">
          <Typography variant="h2">🔧 Sistema de Moldes</Typography>
          <Box className="info-contentM">
            <Typography variant="h3">Características Principales</Typography>
            <ul>
              <li>Diseño modular intercambiable</li>
              <li>Sistema de refrigeración optimizado</li>
              <li>Acabado superficial de alta calidad</li>
              <li>Mantenimiento preventivo programado</li>
            </ul>

            <Typography variant="h3">Especificaciones Técnicas</Typography>
            <ul>
              <li>Presión máxima: 200 MPa</li>
              <li>Temperatura máxima: 300°C</li>
              <li>Tiempo de ciclo: 15-45 segundos</li>
              <li>Vida útil estimada: 100,000 ciclos</li>
            </ul>
          </Box>
        </Box>

        <Box className="info-cardM">
          <Typography variant="h2">⚡ Proceso de Inyección</Typography>
          <Box className="info-contentM">
            <Typography variant="h3">Parámetros Críticos</Typography>
            <ul>
              <li>Control preciso de temperatura</li>
              <li>Presión de inyección controlada</li>
              <li>Tiempo de enfriamiento optimizado</li>
              <li>Velocidad de inyección ajustable</li>
            </ul>

            <Typography variant="h3">Recomendaciones</Typography>
            <ul>
              <li>Precalentamiento de material</li>
              <li>Limpieza regular del sistema</li>
              <li>Calibración periódica</li>
              <li>Monitoreo constante</li>
            </ul>
          </Box>
        </Box>
      </Box>

      <Box className="download-section">
        <Typography variant="h2">Manuales Disponibles</Typography>
        <Box className="download-cards">
          <a href={manualTecnico} download className="download-card">
            <span className="download-icon">📘</span>
            <Typography variant="h3">Manual Técnico</Typography>
            <Typography variant="body1">Especificaciones detalladas y guía de mantenimiento</Typography>
            <Button className="download-button">Descargar PDF</Button>
          </a>

          <a href={manualUsuario} download className="download-card">
            <span className="download-icon">📗</span>
            <Typography variant="h3">Manual de Usuario</Typography>
            <Typography variant="body1">Guía de operación y mejores prácticas</Typography>
            <Button className="download-button">Descargar PDF</Button>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Manuales;