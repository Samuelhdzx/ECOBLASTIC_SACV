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
  },
};

// 2) Define tus tokens de color para MODO CLARO
const tokensLight = {
  grey: {
    100: "#242427",
    200: "#48494e",
    300: "#6b6d74",
    400: "#8f929b",
    500: "#b3b6c2",
    600: "#c2c5ce",
    700: "#d1d3da",
    800: "#e1e2e7",
    900: "#f0f0f3",
  },
  primary: {
    100: "#f4edff",
    200: "#e9dbff",
    300: "#decaff",
    400: "#d3b8ff",
    500: "#9A48FD", // Mismo morado
    600: "#7a38ca",
    700: "#5b2997",
    800: "#3b1965",
    900: "#1c0932",
  },
  secondary: {
    100: "#e0fffb",
    200: "#c2fff7",
    300: "#a3fff3",
    400: "#85ffef",
    500: "#14B8A6", // Mismo teal
    600: "#0e8d7f",
    700: "#096259",
    800: "#053632",
    900: "#001b19",
  },
  tertiary: {
    500: "#FBBF24",
  },
  background: {
    light: "#f5f5f5",
    main: "#ffffff", // fondo blanco
  },
};


// 3) Función que retorna el theme según el modo
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