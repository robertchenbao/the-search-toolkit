import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    type: "dark",
    palette: {
        primary: {
            main: "#292C6D",
        },
        secondary: {
            main: "#EC255A",
        },
        background: {
            default: "#161853",
        },
        text: {
            primary: "#FAEDF0",
        },
    },
    typography: {
        fontFamily: '"Work Sans", "Helvetica", "Arial", sans-serif',
        h6: {
            fontFamily: 'Bitter,"Times New Roman", Times, serif',
        },
    },
});
