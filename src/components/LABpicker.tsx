import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb, lab} from "d3-color";
import {RGBColor} from "d3";


const css = String.raw

type LABpickerProps = {

}
export default function LABpicker(props : LABpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const labcolor = lab(color);

    function lGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = labcolor.copy();
            c.l = i;
            return c.formatHex();
        })
        return (colorSteps);
    }
    function lOnChange(newL : number) {
        let c = labcolor.copy();
        c.l = newL;
        updateColor(rgb(c));
    }

    function aGradient() {
        const colorSteps = [...Array(320)].map((x,i) => {
            let c = labcolor.copy();
            c.a = i-160;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function aOnChange(newA : number) {
        let c = labcolor.copy();
        c.a = newA;
        updateColor(rgb(c));
    }

    function bGradient() {
        const colorSteps = [...Array(320)].map((x,i) => {
            let c = labcolor.copy();
            c.b = i-160;
            return c.formatHex();
        })

        return (colorSteps);
    }
    function bOnChange(newB : number) {
        let c = labcolor.copy();
        c.b = newB;
        updateColor(rgb(c));
    }
    function value(coord : keyof {l : number, a : number, b : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const labc = lab(c);
            return (labc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="labL"><GradientSlider max={100} label="L*" unit="" className={"labL"} value={value("l")} gradient={lGradient} initval={labcolor.l} onChange={lOnChange}/></li>
        <li id="labA"><GradientSlider min={-160} max={160} label="a*" unit="" className={"labA"} value={c => value("a")(c)} gradient={aGradient} initval={100*labcolor.a} onChange={aOnChange}/></li>
        <li id="labB"><GradientSlider min={-160} max={160} label="b*" unit="" className={"labB"} value={c => value("b")(c)} gradient={bGradient} initval={100*labcolor.b} onChange={bOnChange}/></li>
    </ul></div>);
}