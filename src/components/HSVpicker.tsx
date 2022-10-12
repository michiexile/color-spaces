import React from "react";
import {hsv} from "d3-hsv";
import AbstractPicker from "./AbstractPicker";
import {scaleLinear} from "d3";

type HSVpickerProps = {

}
export default function HSVpicker(props : HSVpickerProps) {
    return <AbstractPicker
        colorConstructor={hsv}
        coordData={{
            h: { stepcount: 360, unit: "º", scale: scaleLinear().domain([0,360]).range([0,360]) },
            s: { stepcount : 100, unit : "%", scale: scaleLinear().domain([0,100]).range([0,1])},
            v: { stepcount : 100, unit : "%", scale: scaleLinear().domain([0,100]).range([0,1])},
        }}
        listKey={"hsv"} />
}