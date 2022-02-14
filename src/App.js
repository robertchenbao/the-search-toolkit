import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";
import { useFormik } from "formik";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

function App() {
    const googleForm = useFormik({
        initialValues: {
            mainQuery: "",
            exactQuery: "",
            excludedQuery: "",
            siteName: "",
            fileType: "",
        },
        onSubmit: (values) => {
            console.log("values after submit", values);
        },
    });

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
                        height: "100%",
                    }}
                >
                    <Box sx={{ height: "200px" }}>
                        <Typography
                            variant="h2"
                            sx={{ width: "100%", textAlign: "left" }}
                        >
                            The Search Toolkit
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                width: "90%",
                                textAlign: "left",
                                marginY: "32px",
                            }}
                        >
                            <i>
                                Haven't found what you want on the web? Use this
                                app to refine your searches.
                            </i>
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
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
                    <Typography
                        variant="h4"
                        sx={{
                            width: "100%",
                            textAlign: "center",
                            marginY: "16px",
                        }}
                    >
                        Create your precise search
                    </Typography>
                    <form onSubmit={googleForm.handleSubmit}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                marginY: "24px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: themeOptions.palette.text.primary,
                                    width: "30%",
                                }}
                            >
                                Keywords
                            </Typography>
                            <InputBase
                                placeholder="Enter your search keywords here..."
                                inputProps={{ "aria-label": "search" }}
                                sx={{
                                    width: "100%",
                                    backgroundColor:
                                        themeOptions.palette.background.main,
                                    fontSize: "20px",
                                }}
                                type="text"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.title}
                            />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                search with Google
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default App;
