import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    type: "dark",
    palette: {
        primary: {
            main: "#21209C",
        },
        secondary: {
            main: "#FDB827",
        },
        background: {
            main: "#F1F1F1",
        },
        text: {
            primary: "#23120B",
            inverted: "#F1F1F1",
        },
    },
    typography: {
        fontFamily: '"Work Sans", "Helvetica", "Arial", sans-serif',
    },
});
