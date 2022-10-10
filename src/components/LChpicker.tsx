import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb, lch} from "d3-color";
import {RGBColor} from "d3";


const css = String.raw

type LChpickerProps = {

}
export default function LChpicker(props : LChpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const lchcolor = lch(color);

    function lGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = lchcolor.copy();
            c.l = i;
            return c.formatHex();
        })
        return (colorSteps);
    }
    function lOnChange(newL : number) {
        let c = lchcolor.copy();
        c.l = newL;
        updateColor(rgb(c));
    }

    function cGradient() {
        const colorSteps = [...Array(230)].map((x,i) => {
            let c = lchcolor.copy();
            c.c = i;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function cOnChange(newC : number) {
        let c = lchcolor.copy();
        c.c = newC;
        updateColor(rgb(c));
    }

    function hGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = lchcolor.copy();
            c.h = i;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function hOnChange(newH : number) {
        let c = lchcolor.copy();
        c.h = newH;
        updateColor(rgb(c));
    }
    function value(coord : keyof {l : number, c : number, h : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const lchc = lch(c);
            return (lchc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="lchL"><GradientSlider max={100} label="L*" unit="" className={"lchL"} value={value("l")} gradient={lGradient} initval={lchcolor.l} onChange={lOnChange}/></li>
        <li id="lchC"><GradientSlider max={230} label="C*" unit="" className={"lchC"} value={c => value("c")(c)} gradient={cGradient} initval={100*lchcolor.c} onChange={cOnChange}/></li>
        <li id="lchHab"><GradientSlider max={360} label="Hab*" unit="º" className={"lchHab"} value={c => value("h")(c)} gradient={hGradient} initval={100*lchcolor.h} onChange={hOnChange}/></li>
    </ul></div>);
}