import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// Color design tokens

export const tokens = () => ({
  primary: {
    100: "#fbfbfb",
    200: "#f7f7f7",
    300: "#f4f4f4",
    400: "#f0f0f0",
    500: "#ececec",
    600: "#bdbdbd",
    700: "#8e8e8e",
    800: "#2F2F2F",
    900: "#121212",
  },
  blueAccent: {
    100: "#cef9f9",
    200: "#9df3f3",
    300: "#6deeee",
    400: "#3ce8e8",
    500: "#0be2e2",
    600: "#09b5b5",
    700: "#078888",
    800: "#045a5a",
    900: "#022d2d",
  },
});

//mui theme settings
export const themeSettings = () => {
  const colors = tokens;

  return {
    palette: {
      primary: {
        main: colors.primary[500],
      },
      secondary: {
        main: colors.blueAccent[500],
      },
      neutral: {
        dark: colors.primary[900],
        light: colors.primary[100],
      },
      background: {
        default: colors.primary[500],
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: "12px",
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "40px",
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "32px",
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "20px",
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "16px",
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: "14px",
      },
    },
  };
};

export const useTheme = () => {
  const theme = useMemo(() => createTheme(themeSettings));
  return [theme];
};
