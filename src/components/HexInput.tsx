import React, {useContext} from "react";
import {ColorContext} from "./Color";
import {TextField} from "@mui/material";
import {rgb} from "d3-color";

type HexInputProps = {

}

export default function HexInput(props : HexInputProps) : JSX.Element{
    const {color, updateColor} = useContext(ColorContext);
    function hexChange(event : React.ChangeEvent<HTMLInputElement>) {
        if(event.target === null)
            return;
        const {value} = event.target;
        const newColor = rgb(value);
        if(newColor !== null)
            updateColor(newColor);
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
