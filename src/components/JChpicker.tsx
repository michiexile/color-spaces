import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {rgb} from "d3-color";
// @ts-ignore
import {jch} from "d3-cam02";
import {RGBColor, scaleLinear} from "d3";
import AbstractPicker from "./AbstractPicker";


const css = String.raw

type JChpickerProps = {

}
export default function JChpicker(props : JChpickerProps) {
    return <AbstractPicker
        colorConstructor={jch}
        coordData={{
            J: { stepcount: 100, scale: scaleLinear().range([0,100]).domain([0,100]) },
            C: { stepcount: 100, scale: scaleLinear().range([0,100]).domain([0,100]) },
            h: { stepcount: 360, scale: scaleLinear().range([0,360]).domain([0,360]) },
        }}
        listKey={"jch"}
        />
}