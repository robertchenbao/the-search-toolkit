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
    // validate function for google forms
    const validate = (values) => {
        const emptySearchMessage =
            "Please fill in either search keywords, or exact keywords.";
        const errors = {};
        const empty =
            values.mainKeywords.trim()?.length <= 0 &&
            values.exactKeywords.trim()?.length <= 0;
        if (empty) {
            errors.mainKeywords = emptySearchMessage;
            errors.exactKeywords = emptySearchMessage;
        }
        return errors;
    };

    // the HTML form used to search google
    const googleForm = useFormik({
        initialValues: {
            mainKeywords: "",
            exactKeywords: "",
            excludedKeywords: "",
            siteName: "",
            fileType: "",
        },
        validate,
        onSubmit: (values) => {
            console.log("values after submit", values);
            searchGoogle(values);
        },
    });

    // the styles for input
    const formInputStyles = {
        width: "100%",
        backgroundColor: themeOptions.palette.background.main,
        fontSize: "20px",
    };
    const formLabelStyles = {
        color: themeOptions.palette.text.primary,
        width: "40%",
    };

    const inputRowStyles = {
        display: "flex",
        flexDirection: "row",
        marginY: "36px",
    };

    const keywordInputRowStyles = {
        display: "flex",
        flexDirection: "row",
        marginTop: "36px",
    };

    // do the search on google
    const searchGoogle = ({
        mainKeywords,
        exactKeywords,
        excludedKeywords,
        siteName,
        fileType,
    }) => {
        let url = `https://google.com/search?q=${mainKeywords}`;

        let fileTypeString = makeFileTypeString(fileType);
        let excludedString = makeExcludeString(excludedKeywords);

        if (excludedString) url += ` ${excludedString}`;
        if (exactKeywords) url += ` "${exactKeywords}"`;
        if (fileTypeString) url += ` ${fileTypeString}`;
        if (siteName) url += ` site: ${siteName}`;

        window.open(url, "_blank");
    };

    // formatting functions to create search strings
    const makeExcludeString = (exclude) => {
        let excludedString = "";
        if (exclude) {
            if (exclude.indexOf(",")) {
                let excluded = exclude.split(",");
                for (let iterator of excluded) {
                    excludedString += ` -"${iterator.trim()}"`;
                }
            }
            return excludedString;
        }
        return null;
    };
    const makeFileTypeString = (fileType) => {
        let fileTypesString = "(";
        if (fileType) {
            if (fileType.indexOf(",")) {
                let types = fileType.split(",");
                for (let [i, v] of types.entries()) {
                    if (i === 0) fileTypesString += ` filetype:${v.trim()}`;
                    else fileTypesString += ` OR filetype:${v.trim()}`;
                }
                fileTypesString += " )";
            }
        }
        return fileType.trim().length <= 0 ? null : fileTypesString;
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
                            sx={{
                                width: "100%",
                                textAlign: "left",
                                marginY: "8px",
                            }}
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
                    elevation={3}
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
                        <Box sx={keywordInputRowStyles}>
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
                        {googleForm.errors.mainKeywords ? (
                            <div>{googleForm.errors.mainKeywords}</div>
                        ) : null}

                        <Box sx={keywordInputRowStyles}>
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
                        {googleForm.errors.mainKeywords ? (
                            <div>{googleForm.errors.mainKeywords}</div>
                        ) : null}
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
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                // marginTop: "auto",
                                // position: "absolute",
                                // bottom: "0px",
                            }}
                        >
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
