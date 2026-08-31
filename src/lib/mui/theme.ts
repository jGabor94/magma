"use client";

import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    magma: {
      gradients: {
        backdrop: string;
        primary: string;
        secondary: string;
        sunshine: string;
        surface: string;
        berry: string;
      };
      shadows: {
        candy: string;
        cool: string;
        floating: string;
        pressed: string;
        dark: string;
        light: string
      };
    };
  }

  interface ThemeOptions {
    magma?: Theme["magma"];
  }

  interface TypeText {
    dark: string
  }
}



const palette = {
  mode: "light",
  primary: { main: "#f36693", dark: "#f01f72", light: "#ff72ad", contrastText: "#ffffff" },
  secondary: { main: "#4b86ff", light: "#27d9f5", dark: "#7557e8", contrastText: "#ffffff" },
  info: { main: "#eee9fb", dark: "#b59be2", contrastText: "#625580" },
  success: { main: "#43c889", dark: "#27865a" },
  warning: { main: "#ffbd4c", dark: "#c78016" },
  error: { main: "#ff4f88", dark: "#ff3b66" },
  background: { default: "#17143b", paper: "#fffefa" },
  text: { primary: "#f0f0f0", secondary: "#C2BAD0", dark: "#171a4c" },
  divider: "#ded5f2",
} satisfies PaletteOptions

const gradients = {
  backdrop:
    "radial-gradient(circle at 12% 10%, rgba(0, 229, 255, 0.2), transparent 30%), radial-gradient(circle at 88% 8%, rgba(255, 75, 171, 0.22), transparent 31%), radial-gradient(circle at 52% 86%, rgba(255, 203, 71, 0.16), transparent 34%), linear-gradient(155deg, #17143b, #33216b 48%, #171a4c 100%)",
  primary: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark} 48%, #ffb547)`,
  berry: "linear-gradient(135deg, #6d4fd8, #8b55d7 54%, #c84d8f)",
  sunshine: "linear-gradient(135deg, #ffe85d, #ffb83d)",
  surface: "linear-gradient(145deg, #fffefa, #f9f4ff 54%, #edfaff)",
  secondary: `linear-gradient(135deg, ${palette.secondary.light}, ${palette.secondary.main} 52%, ${palette.secondary.dark})`,

};

const theme = createTheme({
  cssVariables: true,
  palette,
  shape: { borderRadius: 20 },
  spacing: 8,
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightRegular: 650,
    fontWeightMedium: 800,
    fontWeightBold: 950,

    h1: {
      fontWeight: 950,
      lineHeight: 0.94,
      letterSpacing: "-0.06em",
    },
    h2: {
      fontWeight: 950,
      lineHeight: 1,
      letterSpacing: "-0.04em",
    },
    h3: {
      fontWeight: 950,
      lineHeight: 1.05,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontWeight: 950,
      lineHeight: 1.05,
    },
    button: { fontWeight: 950, letterSpacing: "-0.015em", textTransform: "none" },
    overline: { fontWeight: 950, letterSpacing: "0.17em", lineHeight: 1.4 },
    body1: { fontWeight: 700 },
    body2: { fontWeight: 700 },
  },
  magma: {
    gradients,
    shadows: {
      candy: "0 8px 0 #74234f, 0 16px 34px rgba(255, 79, 163, 0.32)",
      cool: "0 8px 0 #263774, 0 15px 30px rgba(54, 113, 230, 0.3)",
      floating: "0 24px 64px rgba(20, 13, 69, 0.34)",
      pressed: "0 4px 0 #74234f, 0 9px 18px rgba(255, 79, 163, 0.2)",
      dark: "4px 5px 0 rgba(73, 59, 116, 0.46)",
      light: "4px 5px 0 rgba(147, 137, 179, 0.46)"
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: gradients.backdrop,
          backgroundAttachment: "fixed",

        },
        "::selection": { backgroundColor: "#ffe45f", color: "#2f2457" },
        "*": {
          caretColor: "transparent",

        }
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          border: "4px solid rgba(255, 255, 255, 0.9)",
          borderRadius: 28,
          boxShadow: theme.magma.shadows.light,
          backgroundImage: gradients.surface,
        }),

      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          overflow: "visible",
          borderRadius: 24,
          boxShadow: theme.magma.shadows.dark,
          backgroundImage: theme.magma.gradients.surface,
          color: theme.palette.text.dark
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          minHeight: 48,
          borderRadius: 23,
          paddingInline: 20,
          transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
          border: "4px solid #eeeeee",
          fontWeight: 1000,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
          color: "#ffffff",
          "&:hover": {
            transform: "translateY(-2px) rotate(-0.25deg)",
            ...(ownerState.variant === "contained" &&
              ownerState.color !== "inherit" && {
              backgroundColor:
                theme.palette[ownerState.color ?? "primary"].main,
            }),
          },
          "&:active": { transform: "translateY(3px)" },
          "&.Mui-focusVisible": {
            outline: "4px solid rgba(255, 228, 95, 0.8)",
            outlineOffset: 3,
          },


        }),

      },

    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme, }) => ({
          border: "3px solid #ffffff",
          borderRadius: 15,
          color: "#ffffff",
          transition: "transform 140ms ease, box-shadow 140ms ease",
          "&:hover": {
            transform: "translateY(-2px) rotate(2deg)",
          },
          "&:active": { transform: "translateY(3px)", boxShadow: theme.magma.shadows.dark },
        }),
      },
      variants: [
        /*
        {
          props: { color: "primary" },
          style: ({ theme }) => ({
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,

          })
        },
        {
          props: { color: "secondary" },
          style: ({ theme }) => ({
            background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,

          })
        },
        {
          props: { color: "info" },
          style: ({ theme }) => ({
            background: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            "&:hover": {
              background: theme.palette.info.main,
            }
          })
        }*/
      ]
    },
    MuiTextField: { defaultProps: { variant: "outlined" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 18,
          backgroundColor: "#ffffff",
          boxShadow: "0 6px 0 #c8bfdc, 0 10px 20px rgba(48, 32, 86, 0.08)",
          transition: "transform 150ms ease, box-shadow 150ms ease",
          color: theme.palette.text.dark,
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#aa9bd6" },
          "&.Mui-focused": {
            transform: "translateY(-1px)",
            boxShadow: "0 6px 0 #a99dd1, 0 0 0 5px rgba(125, 104, 236, 0.13)",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d8cdf4", borderWidth: 3 },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7d68ec",
            borderWidth: 3,
          },
        }),
        input: { fontWeight: 850 },
      },
    },
    MuiInputLabel: { styleOverrides: { root: { fontWeight: 850 } } },
    MuiChip: {
      styleOverrides: {
        root: {
          minHeight: 34,
          border: "3px solid #ffffff",
          borderRadius: 13,
          fontWeight: 950,
          color: "#ffffff"
        },
        colorPrimary: { backgroundImage: gradients.primary, },
        colorSecondary: { backgroundImage: gradients.secondary },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          border: "3px solid #ffffff",
          borderRadius: 18,
          boxShadow: "0 6px 0 rgba(74, 55, 118, 0.22)",
          fontWeight: 850,
        },
        icon: { alignItems: "center" },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "3px solid #ffffff",
          backgroundImage: gradients.surface,
          color: "#4c3511",
          boxShadow: theme.magma.shadows.light,
          fontWeight: 950,
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#ffffff",
            "& + .MuiSwitch-track": { backgroundImage: gradients.secondary, opacity: 1 },
          },
        },
        track: {
          border: "2px solid rgba(255, 255, 255, 0.8)",
          backgroundColor: "#b6aacd",
          opacity: 1,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          border: "2px solid #ffffff",
          borderRadius: 12,
          backgroundColor: "#33216b",
          boxShadow: "0 5px 0 #17143b",
          fontWeight: 850,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 28,
          border: "3px solid #ffffff",
          boxShadow: "0 28px 80px rgba(11, 7, 48, 0.55)",
          color: theme.palette.text.dark
        }),
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: theme.magma.shadows.light
        })
      }
    }
  },
});

export default theme;
