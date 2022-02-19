import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";
import { useFormik } from "formik";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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
        if (siteName) url += ` site:${siteName}`;

        window.open(url, "_blank");
    };

    // formatting functions to create search strings
    const makeExcludeString = (exclude) => {
        let excludedString = "";
        if (exclude && exclude.indexOf(",")) {
            let excluded = exclude.split(",");
            for (let iterator of excluded) {
                excludedString += ` -"${iterator.trim()}"`;
            }
            return excludedString;
        }
        return null;
    };
    const makeFileTypeString = (fileType) => {
        let fileTypesString = "(";
        if (fileType && fileType.indexOf(",")) {
            let types = fileType.split(",");
            for (let [i, v] of types.entries()) {
                if (i === 0) fileTypesString += ` filetype:${v.trim()}`;
                else fileTypesString += ` OR filetype:${v.trim()}`;
            }
            fileTypesString += " )";
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="Show me an example!">
                            <IconButton
                                color="secondary"
                                aria-label="example"
                                onClick={() => {
                                    googleForm.setValues({
                                        mainKeywords: "investment",
                                        exactKeywords: "stock",
                                        excludedKeywords: "speculation",
                                        siteName: "*.gov",
                                        fileType: "pdf,docx",
                                    });
                                }}
                            >
                                <TipsAndUpdatesIcon />
                            </IconButton>
                        </Tooltip>
                        {/* <Button
                            variant="outlined"
                            startIcon={<TipsAndUpdatesIcon />}
                            color="secondary"
                            onClick={() => {
                                googleForm.setValues({
                                    mainKeywords: "abc",
                                    exactKeywords: "def",
                                    excludedKeywords: "nonono",
                                    siteName: "yes.com",
                                    fileType: "pdf",
                                });
                            }}
                        >
                            Example
                        </Button> */}
                        <Typography
                            variant="h4"
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                marginY: "16px",
                            }}
                        >
                            My Precise Search
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            color="secondary"
                            onClick={() => {}}
                        >
                            Save
                        </Button>
                    </Box>
                    <form onSubmit={googleForm.handleSubmit}>
                        <Box sx={keywordInputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Keywords
                            </Typography>
                            <InputBase
                                placeholder="Search keywords"
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
                                placeholder="Exact match keywords"
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
                                placeholder="List of Excluded Keywords (Optional)"
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
                                placeholder="Specific website (Optional)"
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
                                placeholder="List of file types (Optional)"
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
                                marginY: "16px",
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
