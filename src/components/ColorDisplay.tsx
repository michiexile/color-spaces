import React, {useContext} from "react";
import {ColorContext} from "./Color";
import {AppBar, Toolbar} from "@mui/material";
import {hsl} from "d3-color";

type ColorDisplayProps = {
    children: JSX.Element
}
export default function ColorDisplay(props : ColorDisplayProps): JSX.Element {
    const {color} = useContext(ColorContext);
    const hslcolor = hsl(color);
    return(
        <AppBar position={"sticky"}
                sx={{backgroundColor: color.formatHex(),
                    color: hslcolor.l > 0.4 ? "black" : "white"}}>
            <Toolbar>
                {props.children}
            </Toolbar>
        </AppBar>
    );
}