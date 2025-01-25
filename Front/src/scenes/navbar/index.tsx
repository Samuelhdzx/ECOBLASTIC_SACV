import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, useTheme, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon, User, LogOut } from "lucide-react";
import FlexBetween from "@/components/FlexBetween";
import logo from "front/public/img/LOGO.png";

type NavItem = {
    path: string;
    label: string;
    id: string;
    icon?: React.ReactNode;
};

const Navbar = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:968px)');
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selected, setSelected] = useState(() => {
        const path = location.pathname.slice(1);
        return path || "inicio";
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

    const navItems: NavItem[] = isAuthenticated ? [
        { path: "/predictions", label: "Predicción", id: "predictions" },
        { path: "/dashboard", label: "Dashboard", id: "dashboard" },
        { path: "/profile", label: "Perfil", id: "profile" },
        { path: "/manuals", label: "Manuales", id: "manuals" },
        // {path : "/registers", label: "Todos los registros", id: "registers" },
    ] : [
        { path: "/register", label: "Para usuarios", id: "register" },
        { path: "/createAdmin", label: "Para Administradores", id: "createAdmin" },
    ];

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsAuthenticated(!!user);
    }, []);


    
    
    const handleLogout = async () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            try {
                const response = await fetch('http://localhost:1337/api/logout', {
                    method: 'GET',
                    credentials: 'include',
                });
    
                // Error: La condición está invertida
                // if (response.ok) { ... } lanzaría un error cuando la respuesta es exitosa
               
    
                // Si llegamos aquí, el logout fue exitoso
                localStorage.removeItem('user');
                handleMenuClose();
                window.dispatchEvent(new Event('authChange'));
                navigate('/inicio', { replace: true });
                
            } catch (error) {
                console.error('Error durante el logout:', error);
                alert('Ocurrió un error al cerrar sesión. Por favor, inténtalo nuevamente.');
            }
        }
    };
    
    
    

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMobileMenuAnchor(null);
    };

    const linkStyles = {
        transition: 'all 0.3s ease',
        fontSize: "16px",
        fontWeight: 500,
        textDecoration: "none",
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    };

    return (
        <FlexBetween 
            p="1rem 2rem" 
            color={palette.grey[900]}
            sx={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: palette.background.paper
            }}
        >
            <Link to="/inicio" style={{ textDecoration: 'none' }}>
                <FlexBetween gap="1rem">
                    <img 
                        src={logo} 
                        alt="Ecoblastic Logo" 
                        style={{
                            color: 'black',
                            height: '4em',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            filter: 'brightness(1) invert(1)'
                        }} 
                    />
                    <Typography 
                        variant="h4" 
                        fontSize="22px" 
                        color={palette.grey[900]}
                        sx={{
                            fontWeight: 'bold',
                            display: { xs: 'none', sm: 'block' }
                        }}
                    >
                        ECOBLASTIC
                    </Typography>
                </FlexBetween>
            </Link>

            {isMobile ? (
                <>
                    <IconButton
                        onClick={handleMobileMenuClick}
                        sx={{ color: palette.grey[300] }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={mobileMenuAnchor}
                        open={Boolean(mobileMenuAnchor)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                mt: 1.5,
                            },
                        }}
                    >
                        {navItems.map((item) => (
                            <MenuItem 
                                key={item.id}
                                onClick={() => {
                                    setSelected(item.id);
                                    handleMenuClose();
                                    navigate(item.path);
                                }}
                                sx={{
                                    color: selected === item.id 
                                        ? palette.primary.main 
                                        : palette.grey[700],
                                }}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                        {isAuthenticated && (
                            <MenuItem onClick={handleLogout}>
                                <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                                Cerrar Sesión
                            </MenuItem>
                        )}
                    </Menu>
                </>
            ) : (
                <FlexBetween gap="2rem">
                    {navItems.map((item) => (
                        <Box 
                            key={item.id} 
                            sx={{ 
                                "&:hover": { color: palette.primary[100] },
                                position: 'relative'
                            }}
                        >
                            <Link
                                to={item.path}
                                onClick={() => setSelected(item.id)}
                                style={{
                                    ...linkStyles,
                                    color: selected === item.id 
                                        ? palette.primary.main 
                                        : palette.grey[700],
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                            {selected === item.id && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -8,
                                        left: 0,
                                        right: 0,
                                        height: 2,
                                        backgroundColor: palette.primary.main,
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                    
                    {isAuthenticated && (
                        <Box 
                            sx={{ 
                                "&:hover": { color: palette.primary[100] },
                                cursor: 'pointer'
                            }}
                        >
                            <Box
                                onClick={handleProfileClick}
                                sx={{
                                    ...linkStyles,
                                    color: palette.grey[700],
                                }}
                            >
                                <User size={20} />
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        mt: 1.5,
                                    },
                                }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <LogOut size={16} style={{ marginRight: '0.5rem' }} />
                                    Cerrar Sesión
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </FlexBetween>
            )}
        </FlexBetween>
    );
};

export default Navbar;