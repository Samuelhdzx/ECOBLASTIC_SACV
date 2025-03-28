  // theme.ts

// 1) Define tus tokens de color (actualizando primary, secondary, etc.)
export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    // Morado (Brand color principal)
    100: "#e4d0fc",
    200: "#c9a1f9",
    300: "#ae72f7",
    400: "#9443f4",
    500: "#9A48FD", // <--- color principal
    600: "#6e36b9",
    700: "#52288a",
    800: "#371a5c",
    900: "#1b0c2e",
  },
  secondary: {
    // Teal (complemento)
    100: "#d1fcf6",
    200: "#a3f9ed",
    300: "#75f5e3",
    400: "#47f2da",
    500: "#14B8A6", // <--- teal principal
    600: "#0e8d7f",
    700: "#096259",
    800: "#053632",
    900: "#011b19",
  },
  tertiary: {
    // Otro color que uses frecuentemente (por ejemplo un dorado)
    500: "#FBBF24", 
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026", // fondo oscuro principal
  },
};

// 2) Configura tu objeto themeSettings usando los tokens
export const themeSettings = {
  palette: {
    mode: 'dark', // modo oscuro
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
      main: tokens.tertiary[500],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};

// theme.ts

// 1) Define tus tokens de color para MODO OSCURO
const tokensDark = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#e4d0fc",
    200: "#c9a1f9",
    300: "#ae72f7",
    400: "#9443f4",
    500: "#9A48FD", // Morado principal
    600: "#6e36b9",
    700: "#52288a",
    800: "#371a5c",
    900: "#1b0c2e",
  },
  secondary: {
    100: "#d1fcf6",
    200: "#a3f9ed",
    300: "#75f5e3",
    400: "#47f2da",
    500: "#14B8A6", // Teal
    600: "#0e8d7f",
    700: "#096259",
    800: "#053632",
    900: "#011b19",
  },
  tertiary: {
    500: "#FBBF24",
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026", // Este es el fondo oscuro original
    navbar: "#161618",
    navbar_secondary: "#1a1a1f",
    surface: "#2d2d34",
    paper: "#1f2026",
    alt1: "#252732",
    alt2: "#1E1E24",
    contrast: "#FFFFFF",
  },
};

// 2) Define tus tokens de color para MODO CLARO
const tokensLight = {
  grey: {
    100: "#1F2937", // Más oscuro para mejor contraste
    200: "#374151",
    300: "#4B5563",
    400: "#6B7280",
    500: "#9CA3AF",
    600: "#D1D5DB",
    700: "#E5E7EB",
    800: "#F3F4F6",
    900: "#F9FAFB",
  },
  primary: {
    100: "#F3EAFF",
    200: "#E2D1FF",
    300: "#C9A6FF",
    400: "#AB74FF",
    500: "#9A48FD", // Mantenemos el color principal
    600: "#8132DB",
    700: "#6925B9",
    800: "#511997",
    900: "#390C75",
  },
  secondary: {
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6", // Mantenemos el teal principal
    600: "#0D9488",
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
  },
  tertiary: {
    500: "#F59E0B",
  },
  background: {
    light: "#F8FAFF", // Fondo con sutil tono azulado
    main: "#FFFFFF",
    navbar: "#F1F5F9", // Navbar con tono gris azulado sutil
    navbar_secondary: "#E2E8F0",
    surface: "#FFFFFF", // Para tarjetas y elementos elevados
    paper: "#F8FAFF", // Para fondos de secciones
    alt1: "#EDF2F7",
    alt2: "#E2E8F0",
    contrast: "#1E293B", // Para elementos que necesiten alto contraste
  },
};

// 3) Función que retorna el theme según el modo
export const getThemeSettings = (mode: "dark" | "light") => {
  const tokens = mode === "dark" ? tokensDark : tokensLight;

  return {
    palette: {
      mode,
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
        main: tokens.tertiary[500],
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
        navbar: tokens.background.navbar,
        navbar_secondary: tokens.background.navbar_secondary,
        alt1: tokens.background.alt1,
        alt2: tokens.background.alt2,
        surface: tokens.background.surface,
        paper: tokens.background.paper,
        contrast: tokens.background.contrast,
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        color: tokens.grey[200],
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        color: tokens.grey[500],
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 10,
        color: tokens.grey[700],
      },
    },
  };
};