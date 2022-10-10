import * as React from "react"
import type { HeadFC } from "gatsby"
import {useContext, useState} from "react";

import ColorProvider, {ColorContext, randomByte} from "../components/Color";
import ColorDisplay from "../components/ColorDisplay"
import RGBpicker from "../components/RGBpicker";
import {rgb, Color, ColorCommonInstance} from "d3-color";
import HSLpicker from "../components/HSLpicker";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, AppBar,
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
    Typography
} from "@mui/material";
import LABpicker from "../components/LABpicker";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LChpicker from "../components/LChpicker";

const css = String.raw;

export const theme = responsiveFontSizes(
    createTheme({
    components: {
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
    const colorPickers = [
        {title: "RGB (and Hex output)", picker: <RGBpicker />, key: "rgb"},
        {title: "HSL - Hue angle, Saturation, Lightness", picker: <HSLpicker />, key: "hsl"},
        {title: "CIELAB - Lightness, Red/Green, Blue/Yellow", picker: <LABpicker />, key: "lab"},
        {title: "CIELCHab - Lightness, Chroma, Hue angle", picker: <LChpicker />, key: "lch"}
    ];
    function AccordionPickers(props : {pickers: typeof colorPickers}) {
        return <React.Fragment>
            {props.pickers.map((picker) => (
                <Accordion key={picker.key}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>{picker.title}</AccordionSummary>
                    <AccordionDetails>{picker.picker}</AccordionDetails>
                </Accordion>
            ))}
        </React.Fragment>;
    }
    return (
        <main><ThemeProvider theme={theme}><ColorProvider>
            <style scoped>
                {css`
.MuiSlider-thumb {
  height: 17px;
  width: 17px;
}
.MuiSlider-rail {
  height: 15px;
}
                `};
            </style>
            <ColorDisplay>Color Space Comparisons</ColorDisplay>
            <Typography>
                These controls below all control the same color choice.
                Pick any one color space to modify, and we'll adjust them all to match.
            </Typography>
            <AccordionPickers pickers={colorPickers} />
        </ColorProvider></ThemeProvider></main>
    )
}



export default Index

export const Head: HeadFC = () => <title>Compare Color Spaces</title>
