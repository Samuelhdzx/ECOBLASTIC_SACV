  // App.tsx
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { useMemo, useState, useEffect, ReactNode } from "react";
  import { getThemeSettings } from "./theme";
  import { Box, CssBaseline } from "@mui/material";
  import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

  // 2. COMPONENTES DE NAVEGACIÓN
  import Navbar from "@/scenes/navbar/index";
  import NavbarPublic from "@/scenes/navbar/index";

  // 3. PÁGINAS PÚBLICAS
  import Inicio from "@/scenes/Inicio/index";
  import LoginPage from "@/Pages/LoginPage";
  import RegisterPage from "@/Pages/RegisterPage";
  import AdminLoginPage from "@/Pages/AdminLoginPage";
  import AdminRegisterPage from "@/Pages/AdminRegisterPage";
  import AdminDashboard from "@/Pages/AdminDashboard";

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

  // 6. LAYOUTS
  const LayoutProtegido = ({ children }: PropiedadesLayout) => {
    const navigate = useNavigate();
    const [estaCargando, setEstaCargando] = useState(true);

    useEffect(() => {
      const usuario = localStorage.getItem('user');
      if (!usuario) {
        navigate('/inicio', { replace: true });
      }
      setEstaCargando(false);
    }, [navigate]);

    if (estaCargando) return null;

    return (
      <>
        <Navbar />
        {children}
      </>
    );
  };

  const LayoutAdmin = ({ children }: PropiedadesLayout) => {
    const navigate = useNavigate();
    const [estaCargando, setEstaCargando] = useState(true);

    useEffect(() => {
      const admin = localStorage.getItem('admin');
      if (!admin) {
        navigate('/loginAdmin', { replace: true });
      }
      setEstaCargando(false);
    }, [navigate]);

    if (estaCargando) return null;

    return <>{children}</>;
  };

  const LayoutPublico = ({ children }: PropiedadesLayout) => (
    <>
      <NavbarPublic />
      {children}
    </>
  );

  function App() {
    // Estado para el modo: "dark" o "light"
    const [mode, setMode] = useState<"dark" | "light">(() => {
      const savedMode = localStorage.getItem("themeMode") as "dark" | "light";
      return savedMode || "dark";
    });

    useEffect(() => {
      localStorage.setItem("themeMode", mode);
    }, [mode]);

    const theme = useMemo(() => createTheme(getThemeSettings(mode)), [mode]);

    const [estaAutenticado, setEstaAutenticado] = useState(() => !!localStorage.getItem('user'));
    const [esAdmin, setEsAdmin] = useState(() => !!localStorage.getItem('admin'));

    useEffect(() => {
      const manejarCambioAuth = () => {
        setEstaAutenticado(!!localStorage.getItem('user'));
        setEsAdmin(!!localStorage.getItem('admin'));
      };
      
      window.addEventListener('authChange', manejarCambioAuth);
      return () => window.removeEventListener('authChange', manejarCambioAuth);
    }, []);

    // Función para cambiar el tema (se la pasamos a Settings)
    const handleThemeChange = (newMode: "dark" | "light") => {
      setMode(newMode);
    };

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

    // 10. RUTAS PROTEGIDAS USUARIO
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
        {/* <Route path="/reports" element={
          <LayoutProtegido>
            <Reports />
          </LayoutProtegido>
        } /> */}
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
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Routes>
    );

    // 11. RUTAS ADMIN
    const rutasAdmin = (
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/admin-dashboard" element={
          <LayoutAdmin>
            <AdminDashboard />
          </LayoutAdmin>
        } />
        <Route path="/settings" element={
          <LayoutAdmin>
            <Settings onThemeChange={handleThemeChange} currentMode={mode} />
          </LayoutAdmin>
        } />
        <Route path="/reports" element={
          <LayoutAdmin>
            <Reports />
          </LayoutAdmin>
        } />
        <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    );

    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Envolvemos toda la aplicación en un Box con fondo blanco */}
            <Box
              width="100%"
              minHeight="100vh"
              sx={{ backgroundColor: theme.palette.background.default }}
            >
              {esAdmin ? rutasAdmin : (estaAutenticado ? rutasProtegidas : rutasPublicas)}
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
  export default App;
