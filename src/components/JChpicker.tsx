import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {jch} from "d3-cam02";
import {RGBColor} from "d3";


const css = String.raw

type JChpickerProps = {

}
export default function JChpicker(props : JChpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const jchcolor = jch(color);

    function jGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = jchcolor.copy();
            c.J = i;
            return c.formatHex();
        })
        return (colorSteps);
    }
    function jOnChange(newJ : number) {
        let c = jchcolor.copy();
        c.J = newJ;
        updateColor(rgb(c));
    }

    function cGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = jchcolor.copy();
            c.C = i;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function cOnChange(newC : number) {
        let c = jchcolor.copy();
        c.C = newC;
        updateColor(rgb(c));
    }

    function hGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = jchcolor.copy();
            c.h = i;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function hOnChange(newH : number) {
        let c = jchcolor.copy();
        c.h = newH;
        updateColor(rgb(c));
    }
    function value(coord : keyof {J : number, C : number, h : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const jchc = jch(c);
            return (jchc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="jchL"><GradientSlider max={100} label="J*" unit="" className={"jchL"} value={value("J")} gradient={jGradient} initval={jchcolor.J} onChange={jOnChange}/></li>
        <li id="jchC"><GradientSlider max={100} label="C" unit="" className={"jchC"} value={value("C")} gradient={cGradient} initval={jchcolor.C} onChange={cOnChange}/></li>
        <li id="jchHab"><GradientSlider max={360} label="h" unit="º" className={"jchHab"} value={c => value("h")(c)} gradient={hGradient} initval={jchcolor.h} onChange={hOnChange}/></li>
    </ul></div>);
}