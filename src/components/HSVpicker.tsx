import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
import {hsv} from "d3-hsv";
import {RGBColor} from "d3";


const css = String.raw

type HSVpickerProps = {

}
export default function HSVpicker(props : HSVpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const hsvcolor = hsv(color);

    function hGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = hsv(i, hsvcolor.s, hsvcolor.v);
            return c.formatHex();
        })
        return (colorSteps);
    }
    function hOnChange(newH : number) {
        let c = hsv(newH, hsvcolor.s, hsvcolor.v);
        // @ts-ignore
        updateColor(c.rgb());
    }

    function sGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hsv(hsvcolor.h, i/100, hsvcolor.v);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function sOnChange(newS : number) {
        let c = hsv(hsvcolor.h, newS/100, hsvcolor.v);
        // @ts-ignore
        updateColor(c.rgb());
    }

    function vGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hsv(hsvcolor.h, hsvcolor.s, i/100);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function vOnChange(newV : number) {
        let c = hsv(hsvcolor.h, hsvcolor.s, newV/100);
        // @ts-ignore
        updateColor(c.rgb());
    }
    function value(coord : keyof {h : number, s : number, v : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const hsvc = hsv(c);
            return (hsvc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="hsvH"><GradientSlider max={360} label="H" unit="º" className={"hsvH"} value={value("h")} gradient={hGradient} initval={hsvcolor.h} onChange={hOnChange}/></li>
        <li id="hsvS"><GradientSlider max={100} label="S" unit="%" className={"hsvS"} value={c => 100*value("s")(c)} gradient={sGradient} initval={100*hsvcolor.s} onChange={sOnChange}/></li>
        <li id="hsvV"><GradientSlider max={100} label="V" unit="%" className={"hsvV"} value={c => 100*value("v")(c)} gradient={vGradient} initval={100*hsvcolor.v} onChange={vOnChange}/></li>
    </ul></div>);
}