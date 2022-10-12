import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {hsluv} from "d3-hsluv";
import {RGBColor} from "d3";


const css = String.raw

type LUVpickerProps = {

}
export default function LUVpicker(props : LUVpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const luvcolor = hsluv(color);

    function lGradient() {
        const colorSteps = [...Array(360)].map((x,i) => {
            let c = hsluv(i, luvcolor.u, luvcolor.v);
            return c.formatHex();
        })
        return (colorSteps);
    }
    function lOnChange(newL : number) {
        let c = hsluv(newL, luvcolor.u, luvcolor.v);
        updateColor(rgb(c));
    }

    function uGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hsluv(luvcolor.l, i, luvcolor.v);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function uOnChange(newU : number) {
        let c = hsluv(luvcolor.l, newU, luvcolor.v);
        updateColor(rgb(c));
    }

    function vGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = hsluv(luvcolor.l, luvcolor.u, i);
            return c.formatHex();
        })

        return (colorSteps);
    }
    function vOnChange(newV : number) {
        let c = hsluv(luvcolor.l, luvcolor.u, newV);
        updateColor(rgb(c));
    }
    function value(coord : keyof {l : number, u : number, v : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const luvc = hsluv(c);
            return (luvc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="luvL"><GradientSlider max={360} label="L" unit="º" className={"luvL"} value={value("l")} gradient={lGradient} initval={luvcolor.l} onChange={lOnChange}/></li>
        <li id="luvU"><GradientSlider max={100} label="U" unit="%" className={"luvU"} value={value("u")} gradient={uGradient} initval={luvcolor.u} onChange={uOnChange}/></li>
        <li id="luvV"><GradientSlider max={100} label="V" unit="%" className={"luvV"} value={value("v")} gradient={vGradient} initval={luvcolor.v} onChange={vOnChange}/></li>
    </ul></div>);
}