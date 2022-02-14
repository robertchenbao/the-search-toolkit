import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    palette: {
        primary: {
            main: "#5C636E",
        },
        secondary: {
            main: "#F8B500",
        },
        background: {
            default: "#393e46",
        },
        text: {
            primary: "#f7f7f7",
        },
    },
    typography: {
        fontFamily: '"Work Sans", "Helvetica", "Arial", sans-serif',
        h5: {
            fontFamily: 'Bitter,"Times New Roman", Times, serif',
        },
    },
});
