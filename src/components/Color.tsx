// Color global state context for everyone else to interact with

import React, {createContext, PropsWithChildren, useState} from "react";
import {ColorCommonInstance, rgb} from "d3-color";
import {randomInt} from "d3-random";
import {RGBColor} from "d3";

export const randomByte = randomInt(0,256);

const initialState = {
    color: rgb(randomByte(), randomByte(), randomByte()),
    updateColor: (newColor : RGBColor) => {}
}

export const ColorContext = createContext(initialState);

export default function ColorProvider(props : PropsWithChildren) {
    const [{color}, setColor] = useState({color: initialState.color});
    return (
        <ColorContext.Provider value={{
            color: color,
            updateColor: (newColor : RGBColor) => {
                console.log(`Setting ${newColor.formatHex()}`);
                setColor({color: newColor.rgb()})
            }
        }}>
            {props.children}
        </ColorContext.Provider>
    )
}