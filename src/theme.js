import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    type: "dark",
    palette: {
        primary: {
            main: "#4F8A8B",
        },
        secondary: {
            main: "#FBD46D",
        },
        background: {
            main: "#F4F6FF",
        },
        text: {
            primary: "#07031A",
            inverted: "#F4F6FF",
        },
    },
    typography: {
        fontFamily: '"Work Sans", "Helvetica", "Arial", sans-serif',
    },
});
