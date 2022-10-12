import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {jab} from "d3-cam02";
import {RGBColor} from "d3";


const css = String.raw

type JABpickerProps = {

}
export default function JABpicker(props : JABpickerProps) {
    const {color,updateColor} = useContext(ColorContext);
    const jabcolor = jab(color);

    function jGradient() {
        const colorSteps = [...Array(100)].map((x,i) => {
            let c = jab(i, jabcolor.a, jabcolor.b),
                rgbc = rgb(c);
            return rgbc.displayable() ? rgb(c).formatHex() : "#000000";
        })
        return (colorSteps);
    }
    function jOnChange(newJ : number) {
        let c = jab(newJ, jabcolor.a, jabcolor.b);
        updateColor(rgb(c));
    }

    function aGradient() {
        const colorSteps = [...Array(80)].map((x,i) => {
            let c = jab(jabcolor.J, i-40, jabcolor.b),
                rgbc = rgb(c);
            return rgbc.displayable() ? rgb(c).formatHex() : "#000000";
        })

        return (colorSteps);
    }
    function aOnChange(newA : number) {
        let c = jab(jabcolor.J, newA, jabcolor.b);
        updateColor(rgb(c));
    }

    function bGradient() {
        const colorSteps = [...Array(80)].map((x,i) => {
            let c = jab(jabcolor.J, jabcolor.a, i-40),
                rgbc = rgb(c);
            return rgbc.displayable() ? rgb(c).formatHex() : "#000000";
        })

        return (colorSteps);
    }
    function bOnChange(newB : number) {
        let c = jab(jabcolor.J, jabcolor.a, newB);
        updateColor(rgb(c));
    }
    function value(coord : keyof {J : number, a : number, b : number}) : (c : RGBColor) => number {
        return ((c : RGBColor) => {
            const jabc = jab(c);
            return (jabc[coord]);
        });
    }
    return (<div>
        <style scoped>{css`
        ul { list-style: none; }
        `}</style>
        <ul>
        <li id="jabJ"><GradientSlider max={100} label="J*" unit="" className={"jabJ"} value={value("J")} gradient={jGradient} initval={jabcolor.J} onChange={jOnChange}/></li>
        <li id="jabA"><GradientSlider min={-40} max={40} label="a*" unit="" className={"jabA"} value={value("a")} gradient={aGradient} initval={jabcolor.a} onChange={aOnChange}/></li>
        <li id="jabB"><GradientSlider min={-40} max={40} label="b*" unit="" className={"jabB"} value={value("b")} gradient={bGradient} initval={jabcolor.b} onChange={bOnChange}/></li>
    </ul></div>);
}