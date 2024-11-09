// "@" es la ruta hasta la carpeta de src

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar/index";
import Inicio from "@/scenes/Inicio/index";
import Plasticos from "@/scenes/Plastico/Plasticos";
import Dashboard from "@/scenes/dashboard";


function App() {
  const theme = useMemo(() => createTheme (themeSettings), [])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
          <Routes>
            <Route path="/inicio" element= {<Inicio />}/>
            <Route path="/" element={<Dashboard />}/> 
            <Route path="/predictions" element={<div>Pre-Monitoreo</div>} />
            <Route path="/registers" element={<div>Registros</div>} />
            <Route path="/manuals" element={<div>Manuales</div>} />
            <Route path="/plastics" element={<Plasticos />} /> 
          </Routes>
        </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
