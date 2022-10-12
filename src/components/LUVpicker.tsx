import React from "react";
// @ts-ignore
import {hsluv} from "d3-hsluv";
import AbstractPicker from "./AbstractPicker";
import {scaleLinear} from "d3";

type LUVpickerProps = {

}
export default function LUVpicker(props : LUVpickerProps) {
    return <AbstractPicker
        colorConstructor={hsluv}
        coordData={{
           l : { stepcount: 360, unit: "º", scale: scaleLinear().domain([0,360]).range([0,360]) },
           u : { stepcount: 100, unit: "%", scale: scaleLinear().domain([0,100]).range([0,100])},
           v : { stepcount: 100, unit: "%", scale: scaleLinear().domain([0,100]).range([0,100])},
        }}
        listKey={"luv"} />;
}