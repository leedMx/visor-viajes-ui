import { defaultTheme, defaultDarkTheme } from "react-admin";
import { createTheme, Theme } from "@mui/material/styles";

// Light theme
export const brandLightTheme: Theme = createTheme(
  {},                    // base
  defaultTheme,          // RA default theme merged in
  {
    palette: {
      mode: "light",

      primary: {
        main: "#005f4b",  // brand green
      },

      secondary: {
        main: "#004430",  // darker corporate green
      },

      background: {
        default: "#f4f7f6", // brand background
        paper: "#ffffff",
      },
    },
  }
);

// Dark theme
export const brandDarkTheme: Theme = {
  ...defaultDarkTheme,
  palette: {
    ...defaultDarkTheme.palette!,      // 👈 keep RA's dark palette as base
    mode: "dark",

    primary: {
      ...defaultDarkTheme.palette!.primary,
      main: "#4cad9a",                 // nicer primary for dark mode
    },

    secondary: {
      ...defaultDarkTheme.palette!.secondary,
      main: "#004430",                 // same brand dark green
    },

    // background/text/etc stay as RA tuned them for dark mode
  },
} as Theme;
