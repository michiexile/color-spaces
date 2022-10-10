import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb, hsl} from "d3-color";
import {RGBColor} from "d3";


const css = String.raw

type HSLpickerProps = {

}
export default function HSLpicker(props : HSLpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const hslcolor = hsl(color);

    function hGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = hslcolor.copy();
            c.h = i;
            return c.formatHex();
        })
        return (colorSteps);
    }
    function hOnChange(newH : number) {
        let c = hslcolor.copy();
        c.h = newH;
        updateColor(rgb(c));
    }

    function sGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hslcolor.copy();
            c.s = i/100;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function sOnChange(newS : number) {
        let c = hslcolor.copy();
        c.s = newS/100;
        updateColor(rgb(c));
    }

    function lGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hslcolor.copy();
            c.l = i/100;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function lOnChange(newL : number) {
        let c = hslcolor.copy();
        c.l = newL/100;
        updateColor(rgb(c));
    }
    function value(coord : keyof {h : number, s : number, l : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const hslc = hsl(c);
            return (hslc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="hslH"><GradientSlider max={360} label="H" unit="º" className={"hslH"} value={value("h")} gradient={hGradient} initval={hslcolor.h} onChange={hOnChange}/></li>
        <li id="hslS"><GradientSlider max={100} label="S" unit="%" className={"hslS"} value={c => 100*value("s")(c)} gradient={sGradient} initval={100*hslcolor.s} onChange={sOnChange}/></li>
        <li id="hslL"><GradientSlider max={100} label="L" unit="%" className={"hslL"} value={c => 100*value("l")(c)} gradient={lGradient} initval={100*hslcolor.l} onChange={lOnChange}/></li>
    </ul></div>);
}