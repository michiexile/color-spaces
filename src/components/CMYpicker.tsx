import React from "react";
import {rgb,RGBColor} from "d3-color";

import AbstractPicker from "./AbstractPicker";
import {scaleLinear} from "d3";

type CMYprops = {

}
export type CMY = {
    c : number,
    m : number,
    y : number,
    rgb : () => RGBColor,
    formatHex : () => string
}
export default function CMYpicker(props : CMYprops) {
    function cmy2CMY(c : number, m : number, y : number) : CMY {
        return {
            c: c,
            m: m,
            y: y,
            rgb: function () {
                return rgb(255 * (1 - c), 255 * (1 - m), 255 * (1 - y))
            },
            formatHex: function () {
                return this.rgb().formatHex()
            }
        }
    }
    function rgb2cmy(r : number, g : number, b : number) : CMY {
        return cmy2CMY((255 - r) / 255,(255 - g) / 255,(255 - b) / 255);
    }
    function colorConstructor(arg : {rgb:Function}) : CMY;
    function colorConstructor(c : number, m : number, y : number) : CMY;
    function colorConstructor(argOrC : number | {rgb:Function}, m? : number, y? : number) : CMY {
        if(typeof(argOrC) == "number" && m !== undefined && y !== undefined) {
            return cmy2CMY(argOrC, m, y)
        } else {
            const rgbc = argOrC.rgb();
            return rgb2cmy(rgbc.r, rgbc.g, rgbc.b);
        }
    }
    const scalePercent = scaleLinear()
        .domain([0,100])
        .range([0,1])
    const coordData = {
        c : { stepcount : 100, unit : "%", scale: scalePercent},
        m : { stepcount : 100, unit : "%", scale: scalePercent},
        y : { stepcount : 100, unit : "%", scale: scalePercent},
    }

    return (
        <AbstractPicker
            colorConstructor={colorConstructor}
            coordData={coordData}
            listKey={"cmy"}
        />
    )
}
