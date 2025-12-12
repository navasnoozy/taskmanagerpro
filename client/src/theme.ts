import { createTheme, type Shadows } from "@mui/material";

const defaultTheme = createTheme();
const customShadows = [...defaultTheme.shadows] as Shadows;
customShadows[1] = "1px 2px 4px rgba(88, 186, 42, 0.93)"; 

export const theme = createTheme({
  defaultColorScheme: "light",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#FF6B00", 
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#2A3EB1", 
        },
        background: {
          default: "#F4F6F8",
          paper: "#FFFFFF",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#FF8C33", 
          contrastText: "#000000",
        },
        secondary: {
          main: "#5C73F2", 
        },
        background: {
          default: "#0A1929", 
          paper: "#132F4C",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  },

  shape: {
    borderRadius: 4,
  },
  components:{
    MuiTextField:{
      styleOverrides:{
        root:{
            "& .MuiOutlinedInput-input": {
              padding: "7px 10px", 
              fontSize: "0.875rem", 
            },

            "& .MuiInputLabel-root": {
              transform: "translate(14px, 7px) scale(1)", 
              "&.Mui-focused, &.MuiFormLabel-filled": {
                transform: "translate(14px, -9px) scale(0.75)", 
              },
            },
        }
      }
    },
  }
});
