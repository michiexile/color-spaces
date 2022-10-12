import React from "react";
import {rgb} from "d3-color";
import AbstractPicker from "./AbstractPicker";

type RGBpickerProps = {

}
export default function RGBpicker(props : RGBpickerProps) {
    return <AbstractPicker
        colorConstructor={rgb}
        coordData={{
            r: { stepcount: 255 },
            g: { stepcount: 255 },
            b: { stepcount: 255 },
        }}
        listKey={"rgb"}
        />
}