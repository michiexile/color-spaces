import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {RGBColor} from "d3-color";
import {ScaleContinuousNumeric, scaleLinear} from "d3-scale";
import {ticks} from "d3-array";

const css = String.raw

type AbstractPickerProps = {
    colorConstructor : (any) => {rgb : () => RGBColor, formatHex : () => string},
    coordData : {[key : string] : {
            stepcount : number,
            scale? : ScaleContinuousNumeric<number, number>,
            unit? : string,
        }},
    listKey : string,
}

export default function AbstractPicker({colorConstructor, coordData, listKey} : AbstractPickerProps) : JSX.Element {
    const {color, updateColor} = useContext(ColorContext);
    const coordcolor = colorConstructor(color);
    const defaultScale = scaleLinear()
        .domain([0,255])
        .range([0,255]);

    const gradientFactory = (coord: string, stepcount: number) => (
        () => {
            const scale = coordData[coord].scale || defaultScale;
            const colorSteps = ticks(...scale.domain(), stepcount).map((v) => {
                const newCoords = { ...coordcolor, [coord]: scale(v) };
                let c = colorConstructor(...Object.keys(coordData).map((x) => newCoords[x]));
                return c.formatHex();
            });
            return colorSteps;
        }
    );

    const onChangeFactory = (coord: string) => (
        (newC: number) => {
            let scale = coordData[coord].scale || defaultScale;
            let args = Object.keys(coordData).map((x) => (x==coord)?scale(newC):coordcolor[x]);
            const c = colorConstructor(...args);
            updateColor(c.rgb());
        }
    )

    function value(coord: string): (c: RGBColor) => number {
        return ((c: RGBColor) => {
            const coordc = colorConstructor(c);
            return (coordc[coord]);
        });
    }

    return (<div>
        <ul style={{listStyle: "none"}}>
            {
                Object.keys(coordData).map((coord) => {
                    let scale = coordData[coord].scale || defaultScale;
                    return(
                        <li key={`${listKey}-${coord}`}><GradientSlider
                            initval={scale.invert(coordcolor[coord])}
                            className={coord}
                            label={coord.toUpperCase()}
                            gradient={gradientFactory(coord, coordData[coord].stepcount)}
                            onChange={onChangeFactory(coord)}
                            value={(c) => scale.invert(colorConstructor(c)[coord])}
                            min={scale.domain()[0]}
                            max={scale.domain()[1]}
                            unit={("unit" in coordData[coord]) ? coordData[coord].unit : undefined}
                            />
                        </li>);
            })
            }
        </ul>
    </div>);
}
