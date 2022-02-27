import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    type: "dark",
    palette: {
        primary: {
            main: "#30475E",
        },
        secondary: {
            main: "#F05454",
        },
        background: {
            main: "#F5F5F5",
        },
        text: {
            primary: "#121212",
            inverted: "#F5F5F5",
        },
    },
    typography: {
        fontFamily: '"Work Sans", "Helvetica", "Arial", sans-serif',
    },
});
