import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={themeOptions}>
            <CssBaseline />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    minHeight: "100vh",
                    padding: "32px",
                    backgroundColor: themeOptions.palette.background.main,
                }}
            >
                <Box
                    sx={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{ height: "30%" }}>
                        <Typography
                            variant="h2"
                            sx={{ width: "100%", textAlign: "left" }}
                        >
                            The Search Toolkit
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                width: "100%",
                                textAlign: "left",
                                marginY: "32px",
                            }}
                        >
                            Haven't found what you want on the web? Use this app
                            to refine your searches.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4">My Searches</Typography>
                    </Box>
                </Box>
                <Paper
                    sx={{
                        paddingX: "32px",
                        width: "60%",
                        backgroundColor: themeOptions.palette.primary.main,
                        borderRadius: "16px",
                    }}
                >
                    <h1>The search param form</h1>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default App;
