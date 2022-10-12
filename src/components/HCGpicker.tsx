import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {hcg} from "d3-hcg";
import {RGBColor} from "d3";


const css = String.raw

type HCGpickerProps = {

}
export default function HCGpicker(props : HCGpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const hcgcolor = hcg(color);

    function hGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = hcg(i, hcgcolor.c, hcgcolor.g);
            return c.formatHex();
        })
        return (colorSteps);
    }
    function hOnChange(newH : number) {
        let c = hcg(newH, hcgcolor.c, hcgcolor.g);
        // @ts-ignore
        updateColor(c.rgb());
    }

    function cGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hcg(hcgcolor.h, i/100, hcgcolor.g);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function cOnChange(newC : number) {
        let c = hcg(hcgcolor.h, newC/100, hcgcolor.g);
        // @ts-ignore
        updateColor(c.rgb());
    }

    function gGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hcg(hcgcolor.h, hcgcolor.c, i/100);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function gOnChange(newG : number) {
        let c = hcg(hcgcolor.h, hcgcolor.c, newG/100);
        // @ts-ignore
        updateColor(c.rgb());
    }
    function value(coord : keyof {h : number, c : number, g : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const hsvc = hcg(c);
            return (hsvc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="hcgH"><GradientSlider max={360} label="H" unit="º" className={"hcgH"} value={value("h")} gradient={hGradient} initval={hcgcolor.h} onChange={hOnChange}/></li>
        <li id="hcgC"><GradientSlider max={100} label="C" unit="%" className={"hcgC"} value={c => 100*value("c")(c)} gradient={cGradient} initval={100*hcgcolor.c} onChange={cOnChange}/></li>
        <li id="hcgV"><GradientSlider max={100} label="G" unit="%" className={"hcgG"} value={c => 100*value("g")(c)} gradient={gGradient} initval={100*hcgcolor.g} onChange={gOnChange}/></li>
    </ul></div>);
}