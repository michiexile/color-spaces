import React from "react";
import {hsl, scaleLinear} from "d3";
import AbstractPicker from "./AbstractPicker";

type HSLpickerProps = {

}
export default function HSLpicker(props : HSLpickerProps) {
    return <AbstractPicker
        colorConstructor={hsl}
        coordData={{
            h: { stepcount: 360, unit: "º", scale: scaleLinear().domain([0,360]).range([0,360]) },
            s: { stepcount: 100, unit: "%", scale: scaleLinear().domain([0,100]).range([0,1]) },
            l: { stepcount: 100, unit: "%", scale: scaleLinear().domain([0,100]).range([0,1]) },
        }}
        listKey={"hsl"}
        />
}