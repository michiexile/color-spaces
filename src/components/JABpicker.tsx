import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {jab} from "d3-cam02";
import {RGBColor, scaleLinear} from "d3";
import AbstractPicker from "./AbstractPicker";


const css = String.raw

type JABpickerProps = {

}
export default function JABpicker(props : JABpickerProps) {
    return <AbstractPicker
        colorConstructor={jab}
        coordData={{
            J: { stepcount: 100, scale: scaleLinear().domain([0,100]).range([0,100])},
            a: { stepcount: 80, scale: scaleLinear().domain([-40,40]).range([-40,40])},
            b: { stepcount: 80, scale: scaleLinear().domain([-40,40]).range([-40,40])},
        }}
        listKey={"jab"}
        />
}
