import React from "react";
import {rgb,RGBColor} from "d3-color";

import AbstractPicker from "./AbstractPicker";

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
            const rgbc = rgb(argOrC);
            return rgb2cmy(rgbc.r, rgbc.g, rgbc.b);
        }
    }

    const coordData = {
        c : { stepcount : 100, max : 100, unit : "%"},
        m : { stepcount : 100, max : 100, unit : "%"},
        y : { stepcount : 100, max : 100, unit : "%"},
    }

    return (
        <AbstractPicker
            colorConstructor={colorConstructor}
            coordData={coordData}
            process={{to: (i) => i / 100, from: (i) => i * 100}}
            listKey={"cmy"}
        />
    )
}
