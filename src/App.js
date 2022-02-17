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
            mainKeywords: "",
            exactKeywords: "",
            excludedKeywords: "",
            siteName: "",
            fileType: "",
        },
        onSubmit: (values) => {
            console.log("values after submit", values);
        },
    });

    const formInputStyles = {
        width: "100%",
        backgroundColor: themeOptions.palette.background.main,
        fontSize: "20px",
    };
    const formLabelStyles = {
        color: themeOptions.palette.text.primary,
        width: "30%",
    };

    const inputRowStyles = {
        display: "flex",
        flexDirection: "row",
        marginY: "36px",
    };

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
                            variant="h3"
                            sx={{ width: "100%", textAlign: "left" }}
                        >
                            The Search Toolkit
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                width: "90%",
                                textAlign: "left",
                                marginY: "48px",
                            }}
                        >
                            <i>
                                Couldn't find what you want on the web? <br />
                                Use this app to make your search even more
                                precise.
                            </i>
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginY: "48px" }}>
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
                        My Precise search
                    </Typography>
                    <form onSubmit={googleForm.handleSubmit}>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Keywords
                            </Typography>
                            <InputBase
                                placeholder="Enter your search keywords here..."
                                sx={formInputStyles}
                                type="text"
                                name="mainKeywords"
                                autoComplete="off"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.mainKeywords}
                            />
                        </Box>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Exact Keywords
                            </Typography>
                            <InputBase
                                placeholder="Enter your exact search keywords here..."
                                sx={formInputStyles}
                                type="text"
                                name="exactKeywords"
                                autoComplete="off"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.exactKeywords}
                            />
                        </Box>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Exclude
                            </Typography>
                            <InputBase
                                placeholder="Exclude these keywords..."
                                sx={formInputStyles}
                                type="text"
                                name="excludedKeywords"
                                autoComplete="off"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.excludedKeywords}
                            />
                        </Box>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Specific Sites
                            </Typography>
                            <InputBase
                                placeholder="Search on these specific sites..."
                                sx={formInputStyles}
                                type="text"
                                name="siteName"
                                autoComplete="off"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.siteName}
                            />
                        </Box>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                File Type
                            </Typography>
                            <InputBase
                                placeholder="Only view specific file types..."
                                sx={formInputStyles}
                                type="text"
                                name="fileType"
                                autoComplete="off"
                                onChange={googleForm.handleChange}
                                value={googleForm.values.fileType}
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
