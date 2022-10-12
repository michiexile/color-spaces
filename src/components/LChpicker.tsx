import React from "react";
import {lch, scaleLinear} from "d3";
import AbstractPicker from "./AbstractPicker";

type LChpickerProps = {

}
export default function LChpicker(props : LChpickerProps) {
    return <AbstractPicker
        colorConstructor={lch}
        coordData={{
            l: { stepcount: 100, scale: scaleLinear().range([0,100]).domain([0,100]) },
            c: { stepcount: 230, scale: scaleLinear().range([0,230]).domain([0,230]) },
            h: { stepcount: 360, unit: "º", scale: scaleLinear().range([0,360]).domain([0,360]) },
        }}
        listKey={"lch"} />
}