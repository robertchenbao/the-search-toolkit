import React from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ClassIcon from "@mui/icons-material/Class";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Popover from "@mui/material/Popover";
import ReactGA from "react-ga";

ReactGA.initialize("UA-175479203-2");

function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // validate function for google forms
    const validate = (values) => {
        const message = "Please enter either a keyword or an exact keyword";
        const errors = {};
        const empty =
            values.mainKeywords.trim()?.length <= 0 &&
            values.exactKeywords.trim()?.length <= 0;
        if (empty) {
            errors.mainKeywords = message;
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
        backgroundColor: themeOptions.palette.primary.main,
        color: themeOptions.palette.text.inverted,
        fontSize: "20px",
    };
    const formLabelStyles = {
        color: themeOptions.palette.text.inverted,
        width: "36%",
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

    // save the searches in localStorage
    const handleSaveSearch = () => {
        console.log(JSON.stringify(googleForm.values));
        localStorage.setItem(
            `saved_search_${new Date().toISOString()}`,
            JSON.stringify(googleForm.values)
        );
        window.location.reload();
    };

    const getPopoverText = (savedSearchObject) => {
        let res = "Search about ";
        let content = JSON.parse(savedSearchObject["value"]);
        if (content["mainKeywords"]) {
            res += content["mainKeywords"];
        }
        if (content["exactKeywords"]) {
            res += ` and ${content["exactKeywords"]}`;
        }
        return res;
    };

    const displaySavedSearches = () => {
        let savedList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("saved_search_")) {
                const value = localStorage.getItem(key);
                savedList.push({ key, value });
            }
        }
        if (savedList.length > 0) {
            console.log(savedList);
            return (
                <div>
                    {savedList.map((item) => (
                        <div>
                            <ListItem
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                                disablePadding
                                key={item}
                                value={item}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => {
                                            localStorage.removeItem(
                                                item["key"]
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                }
                            >
                                <ListItemButton
                                    onClick={() => {
                                        console.log(item["value"]);
                                        googleForm.setValues(
                                            JSON.parse(item["value"])
                                        );
                                    }}
                                >
                                    <ListItemIcon>
                                        <ClassIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Saved Search - ${moment(
                                            item["key"].slice(
                                                item["key"].lastIndexOf("_") + 1
                                            )
                                        ).format("MMM DD, h:mm A")}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: "none",
                                    maxWidth: "300px",
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1 }}>
                                    {getPopoverText(item)}
                                </Typography>
                            </Popover>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <Box>
                <Typography variant="h7" sx={{ textAlign: "center" }}>
                    No item for now!
                </Typography>
            </Box>
        );
    };

    return (
        <ThemeProvider theme={themeOptions}>
            <CssBaseline />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    width: "100%",
                    minHeight: "100vh",
                    padding: "32px",
                    backgroundColor: themeOptions.palette.background.main,
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        display: "flex",
                        flexDirection: "column",
                        marginY: { xs: "24px", md: "0px" },
                    }}
                >
                    <Box
                        sx={{
                            maxHeight: { xs: "280px", md: "260px" },
                            paddingX: "8px",
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            The Search Toolkit
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                width: "90%",
                                textAlign: "left",
                                marginY: "24px",
                                fontFamily:
                                    'Bitter,"Times New Roman", Times, serif',
                            }}
                        >
                            <i>
                                Finding things you want on the Internet can be
                                tough. This app helps you create precise Google
                                searches in seconds using advanced search
                                syntax.
                            </i>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginY: "32px",
                            paddingX: "8px",
                            display: { md: "flex", xs: "none" },
                            flexDirection: "column",
                            flexGrow: 1,
                            backgroundColor:
                                themeOptions.palette.background.main,
                        }}
                    >
                        <Typography variant="h4" sx={{ height: "48px" }}>
                            Saved Searches
                        </Typography>
                        <List
                            sx={{
                                // backgroundColor:
                                //     themeOptions.palette.primary.main,
                                borderRadius: "4px",
                                flexGrow: 1,
                            }}
                        >
                            {displaySavedSearches()}
                        </List>
                    </Box>
                </Box>
                <Paper
                    sx={{
                        padding: "32px",
                        width: { xs: "100%", md: "60%" },
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
                        <Tooltip title="Save the current search">
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                color="secondary"
                                onClick={handleSaveSearch}
                            >
                                Save
                            </Button>
                        </Tooltip>
                        <Typography
                            variant="h4"
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                marginY: "16px",
                                color: themeOptions.palette.text.inverted,
                            }}
                        >
                            Precise Search
                        </Typography>
                        <Tooltip title="Show me an example!">
                            <IconButton
                                color="secondary"
                                aria-label="example"
                                onClick={() => {
                                    googleForm.setValues({
                                        mainKeywords: "investment",
                                        exactKeywords: "mutual fund",
                                        excludedKeywords: "speculation",
                                        siteName: "*.gov",
                                        fileType: "pdf,docx",
                                    });
                                }}
                            >
                                <TipsAndUpdatesIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Clear the current search"
                            sx={{ marginLeft: "8px" }}
                        >
                            <IconButton
                                color="secondary"
                                variant="contained"
                                aria-label="clear"
                                onClick={googleForm.handleReset}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
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
                        <Typography variant="body1" color={"secondary"}>
                            {googleForm.errors.mainKeywords
                                ? googleForm.errors.mainKeywords
                                : null}
                        </Typography>
                        <Box sx={inputRowStyles}>
                            <Typography variant="h6" sx={formLabelStyles}>
                                Specific Sites
                            </Typography>
                            <InputBase
                                placeholder="Specific website"
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
                                Exclude
                            </Typography>
                            <InputBase
                                placeholder="List of excluded keywords"
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
                                File Type
                            </Typography>
                            <InputBase
                                placeholder="List of file types"
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
                            }}
                        >
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ marginTop: "48px" }}
                                startIcon={<SearchIcon />}
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
