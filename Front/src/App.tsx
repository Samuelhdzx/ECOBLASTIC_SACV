// 1. IMPORTACIONES PRINCIPALES
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo, useState, useEffect, ReactNode } from "react";
import { themeSettings } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";

// 2. COMPONENTES DE NAVEGACIÓN
import Navbar from "@/scenes/navbar/index";
import NavbarPublic from "@/scenes/navbar/index";

// 3. PÁGINAS PÚBLICAS
import Inicio from "@/scenes/Inicio/index";
import LoginPage from "@/Pages/LoginPage";
import RegisterPage from "@/Pages/RegisterPage";
import AdminLoginPage from "@/Pages/AdminLoginPage";
import AdminRegisterPage from "@/Pages/AdminRegisterPage";

// 4. PÁGINAS PROTEGIDAS
import InicioAut from "./scenes/inicioAut";
import Dashboard from "@/scenes/dashboard";
import DataEntryForm from "./Pages/DataEntryForm";
import Reports from "./Pages/Reports";
import Profile from "./Pages/Profile";
import Manuales from "./Pages/Manuales";
import AllRecords from "./Pages/AllRecords";
import Settings from "./Pages/Settings";
import Help from "./Pages/Help";
import { UserRecords } from "./Pages/UserRecors";
import Predicciones from "./scenes/Predicciones/Predicciones";

// 5. INTERFACES Y TIPOS
interface PropiedadesLayout {
  children: ReactNode;
}

// 6. LAYOUT PROTEGIDO
const LayoutProtegido = ({ children }: PropiedadesLayout) => {
  const navegar = useNavigate();
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem('user');
    if (!usuario) {
      navegar('/inicio', { replace: true });
    }
    setEstaCargando(false);
  }, [navegar]);

  if (estaCargando) {
    return null; // Aquí podrías poner un componente de carga
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

// 7. LAYOUT PÚBLICO
const LayoutPublico = ({ children }: PropiedadesLayout) => (
  <>
    <NavbarPublic />
    {children}
  </>
);

// 8. COMPONENTE PRINCIPAL APP
function App() {
  // Configuración del tema
  const tema = useMemo(() => createTheme(themeSettings), []);

  // Estado de autenticación
  const [estaAutenticado, setEstaAutenticado] = useState(() => {
    return !!localStorage.getItem('user');
  });

  // Manejador de cambios en autenticación
  useEffect(() => {
    const manejarCambioAuth = () => {
      setEstaAutenticado(!!localStorage.getItem('user'));
    };
    
    window.addEventListener('authChange', manejarCambioAuth);
    return () => window.removeEventListener('authChange', manejarCambioAuth);
  }, []);

  // 9. RUTAS PÚBLICAS
  const rutasPublicas = (
    <Routes>
      <Route path="/login" element={
        <LayoutPublico>
          <LoginPage />
        </LayoutPublico>
      } />
      <Route path="/register" element={
        <LayoutPublico>
          <RegisterPage />
        </LayoutPublico>
      } />
      <Route path="/inicio" element={
        <LayoutPublico>
          <Inicio />
        </LayoutPublico>
      } />
      <Route path="/loginAdmin" element={
        <LayoutPublico>
          <AdminLoginPage />
        </LayoutPublico>
      } />
      <Route path="/createAdmin" element={
        <LayoutPublico>
          <AdminRegisterPage />
        </LayoutPublico>
      } />
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  );

  // 10. RUTAS PROTEGIDAS
  const rutasProtegidas = (
    <Routes>
      <Route path="/" element={<Navigate to="/inicio" replace />} />
      <Route path="/inicio" element={
        <LayoutProtegido>
          <InicioAut />
        </LayoutProtegido>
      } />
      <Route path="/dashboard" element={
        <LayoutProtegido>
          <Dashboard />
        </LayoutProtegido>
      } />
      <Route path="/reports" element={
        <LayoutProtegido>
          <Reports />
        </LayoutProtegido>
      } />
      <Route path="/predictions" element={
        <LayoutProtegido>
          <Predicciones/>
        </LayoutProtegido>
      } />
      <Route path="/registers" element={
        <LayoutProtegido>
          <AllRecords />
        </LayoutProtegido>
      } />
      <Route path="/settings" element={
        <LayoutProtegido>
          <Settings />
        </LayoutProtegido>
      } />
      <Route path="/manuals" element={
        <LayoutProtegido>
          <Manuales />
        </LayoutProtegido>
      } />
      <Route path="/help" element={
        <LayoutProtegido>
          <Help />
        </LayoutProtegido>
      } />
      <Route path="/data_sensors" element={
        <LayoutProtegido>
          <div>Página de Sensores de Datos</div>
        </LayoutProtegido>
      } />
      <Route path="/data-entry" element={
        <LayoutProtegido>
          <DataEntryForm />
        </LayoutProtegido>
      } />
      <Route path="/profile" element={
        <LayoutProtegido>
          <Profile />
        </LayoutProtegido>
      } />
      <Route path="/logout" element={
        <LayoutProtegido>
          <Navigate to="/inicio" replace />
        </LayoutProtegido>
      } />
      <Route path="*" element={<Navigate to="/inicio" replace />} />
    </Routes>
  );

  // 11. RENDERIZADO PRINCIPAL
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={tema}>
          <CssBaseline />
          <Box width="100%" height="100%">
            {estaAutenticado ? rutasProtegidas : rutasPublicas}
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
