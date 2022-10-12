import React, {useContext} from "react";
import {ColorContext} from "./Color";
import {TextField} from "@mui/material";
import * as d3color from "d3-color";

type HexInputProps = {

}

export default function HexInput(props : HexInputProps) : JSX.Element{
    const {color, updateColor} = useContext(ColorContext);
    function hexChange(event : React.ChangeEvent<HTMLInputElement>) {
        if(event.target === null)
            return;
        const {value} = event.target;
        const newColor = d3color.color(value);
        console.log(value)
        console.log(newColor)
        if(newColor !== null)
            updateColor(d3color.rgb(newColor));
    }
    return (<TextField
        value={color.formatHex()}
        onChange={hexChange}
        label={"Hex"}
        sx={{width: "12ch"}}
        size={"small"}
        variant={"filled"}
    />);
}
