import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {RGBColor} from "d3";


const css = String.raw

type RGBpickerProps = {

}
export default function RGBpicker(props : RGBpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    function rGradient() {
        const color00R = color.copy(),
            colorFFR = color.copy();
        color00R.r = 0;
        colorFFR.r = 255;
        return ([color00R.formatHex(), colorFFR.formatHex()]);
    }
    function rOnChange(newR : number) {
        color.r = newR;
        updateColor(color);
    }

    function gGradient() {
        const color00G = color.copy(),
            colorFFG = color.copy();
        color00G.g = 0;
        colorFFG.g = 255;
        return ([color00G.formatHex(), colorFFG.formatHex()]);
    }
    function gOnChange(newG : number) {
        color.g = newG;
        updateColor(color);
    }

    function bGradient() {
        const color00B = color.copy(),
            colorFFB = color.copy();
        color00B.b = 0;
        colorFFB.b = 255;
        return ([color00B.formatHex(), colorFFB.formatHex()]);
    }
    function bOnChange(newB : number) {
        color.b = newB;
        updateColor(color);
    }

    function value(coord : keyof {r : number, g : number, b : number}) : (c : RGBColor) => number {
        return (({[coord] : r} : RGBColor) => r)
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="rgbR"><GradientSlider label={"R"} className={"rgbR"} value={value("r")} gradient={rGradient} initval={color.r} onChange={rOnChange}/></li>
        <li id="rgbG"><GradientSlider label={"G"} className={"rgbG"} value={value("g")} gradient={gGradient} initval={color.g} onChange={gOnChange}/></li>
        <li id="rgbB"><GradientSlider label={"B"} className={"rgbB"} value={value("b")} gradient={bGradient} initval={color.b} onChange={bOnChange}/></li>
    </ul></div>);
}