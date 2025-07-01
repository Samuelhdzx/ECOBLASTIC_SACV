import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, useTheme, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Settings, FileText, LogOut } from 'lucide-react';
import FlexBetween from '@/components/FlexBetween';
import logo from 'front/public/img/LOGO.png';

const AdminNavbar = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:968px)');
  
  const [selected, setSelected] = useState(() => {
    const path = location.pathname.slice(1);
    return path || "admin-dashboard";
  });
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navItems = [
    { path: "/settings", label: "Configuración", id: "settings", icon: <Settings size={20} /> },
    { path: "/reports", label: "Reportes", id: "reports", icon: <FileText size={20} /> },
  ];

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        try {
            const response = await fetch('http://localhost:1337/api/logoutAdmin', {
                method: 'GET',
                credentials: 'include',
            });

            localStorage.clear();
            const authChangeEvent = new Event('authChange');
            window.dispatchEvent(authChangeEvent);
            handleMenuClose();
            navigate('/inicio', { replace: true });
        } catch (error) {
            console.error('Error durante el logout:', error);
            alert('Ocurrió un error al cerrar sesión. Por favor, inténtalo nuevamente.');
        }
    }
};


  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
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
            boxShadow: '0 2px 4px rgba(0,0,0,0.0)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: palette.background.default
        }}
    >

      <Link to="/admin-dashboard" style={{ textDecoration: 'none' }}>
        <FlexBetween gap="1rem">
          <img
            src={logo}
            alt="Ecoblastic Logo"
            style={{
              color: 'white',
              height: '4em',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'brig   htness(1) invert(1)'
            }}
          />
          <Typography
            variant="h4"
            fontSize="22px"
            color={palette.grey[100]}
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
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Cerrar Sesión
            </MenuItem>
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
          
          <Box
            onClick={handleLogout}
            sx={{
              ...linkStyles,
              color: palette.grey[700],
              cursor: 'pointer',
              "&:hover": { color: palette.primary[100] },
            }}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </Box>
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default AdminNavbar;
