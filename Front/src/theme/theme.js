import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Verde para representar eco-friendly
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00ACC1', // Azul-verde para datos y gráficos
      light: '#26C6DA',
      dark: '#00838F',
      contrastText: '#fff',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    warning: {
      main: '#FFA000',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    success: {
      main: '#388E3C',
      light: '#66BB6A',
      dark: '#2E7D32',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#263238',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#263238',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#263238',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#263238',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#263238',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#263238',
    },
    body1: {
      fontSize: '1rem',
      color: '#546E7A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#546E7A',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});
