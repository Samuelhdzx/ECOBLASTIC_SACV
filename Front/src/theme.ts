// theme.ts - Sistema de Diseño Ecoblastic Unificado
import { createTheme } from '@mui/material/styles';

// 1) Define tus tokens de color para MODO OSCURO
const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

// 2) Define tus tokens de color para MODO CLARO
const tokensLight = {
  grey: {
    0: "#000000",
    10: "#141414",
    50: "#292929",
    100: "#3d3d3d",
    200: "#525252",
    300: "#666666",
    400: "#858585",
    500: "#a3a3a3",
    600: "#c2c2c2",
    700: "#e0e0e0",
    800: "#f0f0f0",
    900: "#f6f6f6",
    1000: "#ffffff",
  },
  primary: {
    100: "#070812",
    200: "#0d1025",
    300: "#141937",
    400: "#191F45",
    500: "#21295c",
    600: "#4d547d",
    700: "#7a7f9d",
    800: "#a6a9be",
    900: "#d3d4de",
  },
  secondary: {
    50: "#332a14",
    100: "#665429",
    200: "#997d3d",
    300: "#cca752",
    400: "#ffd166",
    500: "#ffda85",
    600: "#ffe3a3",
    700: "#ffedc2",
    800: "#fff6e0",
    900: "#f0f0f0",
  },
};

// Definición de sombras según el modo
const getShadows = (mode: 'light' | 'dark') => {
  const shadowColor = mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.6)' 
    : 'rgba(0, 0, 0, 0.2)';
  
  const shadowColorLight = mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(0, 0, 0, 0.06)';
    
  const shadowColorMedium = mode === 'dark' 
    ? 'rgba(0, 0, 0, 0.25)' 
    : 'rgba(0, 0, 0, 0.1)';

  return {
    xs: `0 2px 4px ${shadowColorLight}`,
    sm: `0 4px 8px ${shadowColorLight}`,
    md: `0 6px 12px ${shadowColorMedium}`,
    lg: `0 8px 16px ${shadowColorMedium}`,
    xl: `0 12px 24px ${shadowColor}`,
    primary: mode === 'dark'
      ? `0 4px 14px ${tokensDark.primary[500]}40`
      : `0 4px 14px ${tokensLight.primary[500]}40`,
    secondary: mode === 'dark'
      ? `0 4px 14px ${tokensDark.secondary[500]}40`
      : `0 4px 14px ${tokensLight.secondary[500]}40`,
  };
};

// Definición de gradientes según el modo
const getGradients = (mode: 'light' | 'dark') => {
  const tokens = mode === 'dark' ? tokensDark : tokensLight;
  
  return {
    primary: `linear-gradient(135deg, ${tokens.primary[400]} 0%, ${tokens.primary[700]} 100%)`,
    secondary: `linear-gradient(135deg, ${tokens.secondary[400]} 0%, ${tokens.secondary[700]} 100%)`,
    accent: `linear-gradient(135deg, ${tokens.primary[500]} 0%, ${tokens.secondary[500]} 100%)`,
    tertiary: `linear-gradient(135deg, ${tokens.tertiary[500]} 0%, ${tokens.primary[500]} 100%)`,
    info: `linear-gradient(135deg, ${tokens.info.light} 0%, ${tokens.info.dark} 100%)`,
    success: `linear-gradient(135deg, ${tokens.success.light} 0%, ${tokens.success.dark} 100%)`,
    warning: `linear-gradient(135deg, ${tokens.warning.light} 0%, ${tokens.warning.dark} 100%)`,
    error: `linear-gradient(135deg, ${tokens.error.light} 0%, ${tokens.error.dark} 100%)`,
    dark: 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
    glass: mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
  };
};

// Radios de borde y espaciado
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
  full: 9999, // Agregada para solucionar el error
};

// Definición de transiciones
const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Definición de zonas z-index para organizar las capas
const zIndex = {
  modal: 1300,
  drawer: 1200,
  appBar: 1100,
  dropdown: 1000,
  tooltip: 1500,
  snackbar: 1400,
  fab: 1050,
  mobileStepper: 1000,
};

// 3) Función principal que retorna el theme según el modo
export const getThemeSettings = (mode: 'light' | 'dark') => {
  const tokens = mode === 'dark' ? tokensDark : tokensLight;
  
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: tokens.primary[500],
            },
            secondary: {
              main: tokens.secondary[500],
            },
            background: {
              default: tokens.grey[900],
              paper: tokens.grey[800],
            },
            text: {
              primary: tokens.grey[100],
              secondary: tokens.grey[200],
            },
          }
        : {
            primary: {
              main: tokens.primary[500],
            },
            secondary: {
              main: tokens.secondary[500],
            },
            background: {
              default: tokens.grey[0],
              paper: tokens.grey[10],
            },
            text: {
              primary: tokens.grey[900],
              secondary: tokens.grey[800],
            },
          }),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// 4) Función para crear y exportar el tema
export const createEcoblasticTheme = (mode: 'light' | 'dark'): Theme => {
  const themeOptions = getThemeSettings(mode);
  const theme = createTheme(themeOptions);
  
  return createTheme(theme, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: theme.typography.fontFamily,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
          },
          ':root': {
            '--primary': theme.palette.primary.main,
            '--primary-light': theme.palette.primary.light,
            '--primary-dark': theme.palette.primary.dark,
            '--secondary': theme.palette.secondary.main,
            '--secondary-light': theme.palette.secondary.light,
            '--secondary-dark': theme.palette.secondary.dark,
            '--success': theme.palette.success.main,
            '--warning': theme.palette.warning.main,
            '--error': theme.palette.error.main,
            '--info': theme.palette.info.main,
            '--background': theme.palette.background.default,
            '--paper': theme.palette.background.paper,
            '--text-primary': theme.palette.text.primary,
            '--text-secondary': theme.palette.text.secondary,
            '--border-radius': `${theme.shape.borderRadius}px`,
            '--shadow-sm': theme.customShadows.sm,
            '--shadow-md': theme.customShadows.md,
            '--shadow-lg': theme.customShadows.lg,
            '--gradient-primary': theme.customGradients.primary,
            '--gradient-secondary': theme.customGradients.secondary,
            '--gradient-accent': theme.customGradients.accent,
            '--transition-fast': theme.customTransitions.fast,
            '--transition-normal': theme.customTransitions.normal,
            '--transition-slow': theme.customTransitions.slow,
          },
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            '&:hover': {
              background: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            padding: `${spacing.sm}px ${spacing.lg}px`,
            transition: transitions.normal,
            '&:hover': {
              boxShadow: shadows.sm,
              transform: 'translateY(-2px)',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              background: gradients.primary,
            },
            '&.MuiButton-containedSecondary': {
              background: gradients.secondary,
            },
            '&.MuiButton-containedError': {
              background: gradients.error,
            },
            '&.MuiButton-containedSuccess': {
              background: gradients.success,
            },
            '&.MuiButton-containedInfo': {
              background: gradients.info,
            },
            '&.MuiButton-containedWarning': {
              background: gradients.warning,
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
          gradientPrimary: {
            background: gradients.primary,
            color: '#FFFFFF',
            '&:hover': {
              boxShadow: shadows.primary,
            },
          },
          gradientSecondary: {
            background: gradients.secondary,
            color: '#FFFFFF',
            '&:hover': {
              boxShadow: shadows.secondary,
            },
          },
        },
        variants: [
          {
            props: { variant: 'gradientPrimary' },
            style: {
              background: gradients.primary,
              color: '#FFFFFF',
            },
          },
          {
            props: { variant: 'gradientSecondary' },
            style: {
              background: gradients.secondary,
              color: '#FFFFFF',
            },
          },
          {
            props: { variant: 'glassmorphic' },
            style: {
              background: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(255, 255, 255, 0.3)'}`,
              color: mode === 'dark' ? '#FFFFFF' : '#333333',
            },
          },
        ],
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.lg,
            boxShadow: shadows.md,
            transition: transitions.normal,
            overflow: 'hidden',
            '&:hover': {
              boxShadow: shadows.lg,
            },
          },
        },
        variants: [
          {
            props: { variant: 'glassmorphic' },
            style: {
              background: mode === 'dark' 
                ? 'rgba(31, 32, 38, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.5)'}`,
            },
          },
          {
            props: { variant: 'gradient' },
            style: {
              background: gradients.glass,
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.lg,
            transition: transitions.normal,
          },
        },
        variants: [
          {
            props: { variant: 'glassmorphic' },
            style: {
              background: mode === 'dark' 
                ? 'rgba(31, 32, 38, 0.7)' 
                : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.5)'}`,
            },
          },
        ],
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.md,
              transition: transitions.fast,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(0, 0, 0, 0.3)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: shadows.sm,
            background: mode === 'dark' 
              ? tokens.background.navbar 
              : tokens.background.navbar,
            backdropFilter: 'blur(10px)',
          },
        },
        variants: [
          {
            props: { variant: 'glassmorphic' },
            style: {
              background: mode === 'dark' 
                ? 'rgba(22, 22, 24, 0.8)'
                : 'rgba(241, 245, 249, 0.8)',
              backdropFilter: 'blur(10px)',
            },
          },
        ],
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: mode === 'dark' 
              ? tokens.background.navbar 
              : tokens.background.navbar,
            borderRight: `1px solid ${mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)'}`,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.full,
            transition: transitions.fast,
            fontWeight: 500,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(0, 0, 0, 0.9)',
            borderRadius: borderRadius.md,
            padding: `${spacing.sm}px ${spacing.md}px`,
            fontSize: 12,
            fontWeight: 500,
            boxShadow: shadows.md,
          },
          arrow: {
            color: mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(0, 0, 0, 0.9)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: borderRadius.lg,
            boxShadow: shadows.xl,
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontWeight: 600,
            fontSize: 10,
            height: 18,
            minWidth: 18,
            padding: '0 4px',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.lg,
            boxShadow: shadows.md,
            overflow: 'hidden',
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: 'separate',
            borderSpacing: 0,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.02)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)'}`,
            padding: `${spacing.md}px`,
          },
          head: {
            fontWeight: 600,
            color: mode === 'dark' 
              ? tokens.grey[300]
              : tokens.grey[800],
            whiteSpace: 'nowrap',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: transitions.fast,
            '&:hover': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(0, 0, 0, 0.01)',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            overflow: 'hidden',
            marginBottom: spacing.md,
          },
          indicator: {
            height: 3,
            borderRadius: '3px 3px 0 0',
            background: gradients.primary,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: `${borderRadius.md}px ${borderRadius.md}px 0 0`,
            padding: `${spacing.md}px ${spacing.lg}px`,
            transition: transitions.normal,
            '&.Mui-selected': {
              fontWeight: 700,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            boxShadow: shadows.sm,
          },
          standardSuccess: {
            background: mode === 'dark' 
              ? 'rgba(16, 185, 129, 0.2)'
              : 'rgba(16, 185, 129, 0.1)',
            color: mode === 'dark' 
              ? '#34D399'
              : '#047857',
          },
          standardError: {
            background: mode === 'dark' 
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(239, 68, 68, 0.1)',
            color: mode === 'dark' 
              ? '#F87171'
              : '#B91C1C',
          },
          standardWarning: {
            background: mode === 'dark' 
              ? 'rgba(245, 158, 11, 0.2)'
              : 'rgba(245, 158, 11, 0.1)',
            color: mode === 'dark' 
              ? '#FBBF24'
              : '#B45309',
          },
          standardInfo: {
            background: mode === 'dark' 
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(59, 130, 246, 0.1)',
            color: mode === 'dark' 
              ? '#93C5FD'
              : '#1D4ED8',
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            background: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
            '&::after': {
              background: `linear-gradient(90deg, transparent, ${
                mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.06)'
              }, transparent)`,
            },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 6,
            borderRadius: borderRadius.full,
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
          },
          bar: {
            borderRadius: borderRadius.full,
          },
          barColorPrimary: {
            background: gradients.primary,
          },
          barColorSecondary: {
            background: gradients.secondary,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            fontWeight: 500,
            transition: transitions.fast,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -2,
              left: 0,
              width: '0%',
              height: 2,
              borderRadius: borderRadius.full,
              background: gradients.primary,
              transition: transitions.normal,
            },
            '&:hover::after': {
              width: '100%',
            },
          },
        },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            marginBottom: spacing.xl,
          },
          separator: {
            margin: `0 ${spacing.sm}px`,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.md,
            overflow: 'hidden',
            marginBottom: spacing.md,
            boxShadow: shadows.sm,
            '&::before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              margin: `0 0 ${spacing.md}px 0`,
              boxShadow: shadows.md,
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 1,
              '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  background: gradients.primary,
                  opacity: 1,
                  border: 'none',
                },
              },
            },
            '& .MuiSwitch-thumb': {
              width: 24,
              height: 24,
            },
            '& .MuiSwitch-track': {
              borderRadius: 26 / 2,
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
              opacity: 1,
              transition: transitions.normal,
            },
          },
        },
      },
    },
  });
};

// 5) Declaración de tipos para TypeScript para las propiedades personalizadas
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      primary: string;
      secondary: string;
    };
    customGradients: {
      primary: string;
      secondary: string;
      accent: string;
      tertiary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
      dark: string;
      glass: string;
    };
    customSpacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
    customBorderRadius: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      round: number;
      full: number; // Agregada para solucionar el error
    };
    customTransitions: {
      fast: string;
      normal: string;
      slow: string;
      bounce: string;
    };
  }
  
  interface ThemeOptions {
    customShadows?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
      primary?: string;
      secondary?: string;
    };
    customGradients?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      tertiary?: string;
      info?: string;
      success?: string;
      warning?: string;
      error?: string;
      dark?: string;
      glass?: string;
    };
    customSpacing?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
      xxxl?: number;
    };
    customBorderRadius?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
      round?: number;
      full?: number; // Agregada para solucionar el error
    };
    customTransitions?: {
      fast?: string;
      normal?: string;
      slow?: string;
      bounce?: string;
    };
  }

  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    light?: string;
    navbar?: string;
    navbar_secondary?: string;
    alt1?: string;
    alt2?: string;
    surface?: string;
    paper: string; // Asegúrate de que sea 'string' en todas las declaraciones
    contrast?: string;
  }

  interface ButtonPropsVariantOverrides {
    gradientPrimary: true;
    gradientSecondary: true;
    glassmorphic: true;
  }

  interface CardPropsVariantOverrides {
    glassmorphic: true;
    gradient: true;
  }

  interface PaperPropsVariantOverrides {
    glassmorphic: true;
  }

  interface AppBarPropsVariantOverrides {
    glassmorphic: true;
  }
}
