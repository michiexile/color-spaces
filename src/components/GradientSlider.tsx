import React, {useContext} from "react";
import {Grid, InputAdornment, Slider, TextField} from "@mui/material";
import {ColorContext} from "./Color";
import {RGBColor} from "d3-color";

const css = String.raw;

type GradientSliderProps = {
    initval : number;
    className : string;
    label : string;
    gradient : () => string[];
    onChange : (newValue : number) => void
    value : (color : RGBColor) => number
    min? : number;
    max? : number;
    unit? : string;
}
export default function GradientSlider(props : GradientSliderProps) : JSX.Element {
    const {color} = useContext(ColorContext);
    const handleChange = (event : Event, newValue : number|number[]) => {
            const value = newValue instanceof Array ? newValue[0] : newValue
            props.onChange(value);
        };
    const textChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(event.target === null) return;
        const {value : rawValue} = event.target;
        const newValue = parseFloat(rawValue)
        props.onChange(newValue);
    }
    const textFieldWidth = "12ch";
    return (<span className={props.className}>
        <Grid container columns={2}>
            <Grid item xs={"auto"}>
                <TextField
                    label={props.label}
                    value={props.value(color)}
                    onChange={textChange}
                    InputProps={
                        props.unit === null ? {} : {
                            endAdornment: <InputAdornment position={"end"}>{props.unit}</InputAdornment>
                        }
                    }
                    sx={{width: textFieldWidth}}
                    size={"small"}
                    variant={"filled"}
                />
            </Grid>
            <Grid item xs>
                <Slider
                    value={props.value(color)}
                    step={1}
                    track={false}
                    min={props.min !== undefined ? props.min : 0}
                    max={props.max !== undefined ? props.max : 255}
                    valueLabelDisplay={"auto"}
                    onChange={handleChange}
                    size={"small"}
                    sx={{
                        width: `calc(100% - ${textFieldWidth})`,
                        '& .MuiSlider-rail': {
                            backgroundImage: `linear-gradient(90deg,${props.gradient().join(",")})`,
                            opacity: "100%"
                        },
                        '& .MuiSlider-track': {
                            backgroundImage: `linear-gradient(90deg,${props.gradient().join(",")})`,
                            opacity: "100%"
                        },
                        '& .MuiSlider-thumb': {
                            color: color.formatHex(),
                            border: "1px solid white"
                        }
                    }}
                />
            </Grid>
        </Grid>
    </span>);
}