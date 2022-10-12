import React from "react";
import {lab, scaleLinear} from "d3";
import AbstractPicker from "./AbstractPicker";

type LABpickerProps = {

}
export default function LABpicker(props : LABpickerProps) {
    return <AbstractPicker
        colorConstructor={lab}
        coordData={{
            l: { stepcount: 100, scale: scaleLinear().domain([0,100]).range([0,100])},
            a: { stepcount: 320, scale: scaleLinear().domain([-160,160]).range([-160,160])},
            b: { stepcount: 320, scale: scaleLinear().domain([-160,160]).range([-160,160])},
        }}
        listKey={"lab"} />
}