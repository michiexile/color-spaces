import React from "react";
// @ts-ignore
import {hcg} from "d3-hcg";
import AbstractPicker from "./AbstractPicker";
import {scaleLinear} from "d3";


const css = String.raw

type HCGpickerProps = {

}
export default function HCGpicker(props : HCGpickerProps) {
    return <AbstractPicker
        colorConstructor={hcg}
        coordData={{
            h: { stepcount: 360, unit: "º", scale: scaleLinear().domain([0,360]).range([0,360]) },
            c: { stepcount : 100, unit : "%", scale: scaleLinear().domain([0,100]).range([0,1])},
            g: { stepcount : 100, unit : "%", scale: scaleLinear().domain([0,100]).range([0,1])},
        }}
        listKey={"hcg"} />
}