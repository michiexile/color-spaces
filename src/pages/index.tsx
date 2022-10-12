import * as React from "react"
import type { HeadFC } from "gatsby"
import {useContext, useState} from "react";

import ColorProvider, {ColorContext} from "../components/Color";
import ColorDisplay from "../components/ColorDisplay"
import AboutDialog from "../components/AboutDialog";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createTheme, Grid, IconButton,
    responsiveFontSizes, Stack,
    ThemeProvider, Tooltip,
    Typography
} from "@mui/material";
import {ExpandMore, GitHub, LibraryBooks, QuestionMark} from "@mui/icons-material";

import RGBpicker from "../components/RGBpicker";
import HSLpicker from "../components/HSLpicker";
import LABpicker from "../components/LABpicker";
import LChpicker from "../components/LChpicker";
import JChpicker from "../components/JChpicker";
import JABpicker from "../components/JABpicker";
import HSVpicker from "../components/HSVpicker";
import HexInput from "../components/HexInput";
import HCGpicker from "../components/HCGpicker";
import LUVpicker from "../components/LUVpicker";
import CMYpicker from "../components/CMYpicker";

const css = String.raw;

export const theme = responsiveFontSizes(
    createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                thumb: {
                    height: "17px",
                    width: "17px"
                },
                rail: {
                    height: "15px"
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "aliceblue",
                    "&.Mui-focused": {
                        backgroundColor: "lightsteelblue"
                    }
                },
                input: {
                    backgroundColor: "aliceblue"
                }
            }
        }
    },
    typography: {
        fontFamily: "Roboto"
    }
    }),
    {factor: 10}
)

function Index() {
    const {color} = useContext(ColorContext);

    // Modal About dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    }

    // Accordion layout loop
    const colorPickers = [
        {title: "RGB", picker: <RGBpicker />, key: "rgb"},
        {title: "CMY", picker: <CMYpicker />, key: "cmy"},
        {title: "HSL - Hue angle, Saturation, Lightness", picker: <HSLpicker />, key: "hsl"},
        {title: "HSV - Hue angle, Saturation, Value", picker: <HSVpicker />, key: "hsv"},
        {title: "HCG - Hue angle, Chroma, Grayness", picker: <HCGpicker />, key: "hcg"},
        {title: "CIELAB - Lightness, Red/Green, Blue/Yellow", picker: <LABpicker />, key: "lab"},
        {title: "CIELCHab - Lightness, Chroma, Hue angle", picker: <LChpicker />, key: "lch"},
        {title: "HSLUV - Human adapted CIELUV", picker: <LUVpicker />, key: "luv"},
        {title: "CIECAM02 J*Ch - Lightness, Chroma, Hue angle", picker: <JChpicker />, key: "jch",
         comment: `The script will display nearest displayable RGB color. 
         This may lead to odd jumps in the exact values.`},
        {title: "CIECAM02-UCS J*a*b* - Lightness, Red/Green, Blue/Yellow", picker: <JABpicker />, key: "jab",
            comment: `The script will display nearest displayable RGB color. 
         This may lead to odd jumps in the exact values.`},
    ];
    function AccordionPickers(props : {pickers: typeof colorPickers}) {
        function Comment(props : { comment? : string }) {
            if ("comment" !== undefined)
                return <Typography>{props.comment}</Typography>
            return <></>
        }
        return <>
            {props.pickers.map((picker) => (
                <Accordion key={picker.key}>
                    <AccordionSummary expandIcon={<ExpandMore />}>{picker.title}</AccordionSummary>
                    <AccordionDetails>
                        <Comment comment={picker.comment} />
                        {picker.picker}
                    </AccordionDetails>
                </Accordion>
            ))}
        </>;
    }

    // Page composition and content
    return (
    <ThemeProvider theme={theme}><ColorProvider>
    <nav>
        <ColorDisplay>
            <>
                <Typography variant={"h4"} sx={{flexGrow: 1}}>Color Space Comparisons</Typography>
                <Stack>
                    <Tooltip title={"My other projects"} sx={{background: "white"}}>
                        <IconButton href={"https://michiexile.github.io"}>
                            <LibraryBooks />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Code on GitHub"} sx={{background: "white"}}>
                        <IconButton href={"https://github.com/michiexile/color-spaces"}>
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"About this page"} sx={{background: "white"}}>
                        <IconButton onClick={handleClickOpen}><QuestionMark /></IconButton>
                    </Tooltip>
                </Stack>
            </>
        </ColorDisplay>
    </nav>
    <main>
        <AboutDialog open={dialogOpen} onClose={handleClose} />
        <Grid container columns={2}>
            <Grid item xs>
                <Typography>
                    These controls below all control the same color choice.
                    Pick any one color space to modify, and we'll adjust them all to match.
                    To edit the hex code, overwrite a single character at a time, or paste in a complete hex code.
                </Typography>
            </Grid>
            <Grid item xs={"auto"}>
                <HexInput />
            </Grid>
        </Grid>
        <AccordionPickers pickers={colorPickers} />
    </main></ColorProvider></ThemeProvider>
    )
}



export default Index
export const Head: HeadFC = () => <title>Compare Color Spaces</title>
