import { createTheme } from "@mui/material";

export const theme = createTheme({
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#6366F1",
          light: "#818CF8",
          dark: "#4F46E5",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#EC4899",
          light: "#F472B6",
          dark: "#DB2777",
        },
        success: {
          main: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        warning: {
          main: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        error: {
          main: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },
        background: {
          default: "#F8FAFC",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#1E293B",
          secondary: "#64748B",
        },
        divider: "#E2E8F0",
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#818CF8",
          light: "#A5B4FC",
          dark: "#6366F1",
          contrastText: "#0F172A",
        },
        secondary: {
          main: "#F472B6",
          light: "#F9A8D4",
          dark: "#EC4899",
        },
        success: {
          main: "#34D399",
          light: "#6EE7B7",
          dark: "#10B981",
        },
        warning: {
          main: "#FBBF24",
          light: "#FCD34D",
          dark: "#F59E0B",
        },
        error: {
          main: "#F87171",
          light: "#FCA5A5",
          dark: "#EF4444",
        },
        background: {
          default: "#0F172A",
          paper: "#1E293B",
        },
        text: {
          primary: "#F1F5F9",
          secondary: "#94A3B8",
        },
        divider: "#334155",
      },
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          padding: "8px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});
