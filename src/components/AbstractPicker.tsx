import React, {useContext} from "react";
import GradientSlider from "./GradientSlider";
import {ColorContext} from "./Color";
import {RGBColor} from "d3-color";
// @ts-ignore


const css = String.raw

type AbstractPickerProps = {
    colorConstructor : (any) => {rgb : () => RGBColor, formatHex : () => string},
    coordData : {[key : string] : {stepcount : number, min? : number, max? : number, unit? : string}},
    listKey : string,
    process? : {to : (i:number) => number, from : (i:number) => number}
}

export default function AbstractPicker({colorConstructor, coordData, listKey,
                                           process = { to: (i:number) => i, from: (i:number) => i}}
                                           : AbstractPickerProps) : JSX.Element {
    const {color, updateColor} = useContext(ColorContext);
    const coordcolor = colorConstructor(color);

    const gradientFactory = (coord: string, stepcount: number) => (
        () => {
            const colorArgumentFactory = (i: number) => {
                let args = new Map(Object.keys(coordData).map((x) => [x, coordcolor[x]]));
                args.set(coord, process.to(i));
                return args;
            };
            const colorSteps = [...Array(stepcount)].map((x, i) => {
                let c = colorConstructor.apply(this, Array.from(colorArgumentFactory(i).values()));
                return c.formatHex();
            });
            return colorSteps;
        }
    );

    const onChangeFactory = (coord: string) => (
        (newC: number) => {
            let args = new Map(Object.keys(coordData).map((x) => [x, coordcolor[x]]));
            args.set(coord, process.to(newC));
            const c = colorConstructor.apply(this, Array.from(args.values()));
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
        <style scoped>{css`
          ul {
            list-style: none;
          }
        `}</style>
        <ul>
            {
                Object.keys(coordData).map((coord) => (
                    <li key={`${listKey}-${coord}`}><GradientSlider
                        initval={process.from(coordcolor[coord])}
                        className={coord}
                        label={coord.toUpperCase()}
                        gradient={gradientFactory(coord, coordData[coord].stepcount)}
                        onChange={onChangeFactory(coord)}
                        value={(c) => process.from(colorConstructor(c)[coord])}
                        min={("min" in coordData[coord]) ? coordData[coord].min : undefined}
                        max={("max" in coordData[coord]) ? coordData[coord].max : undefined}
                        unit={("unit" in coordData[coord]) ? coordData[coord].unit : undefined}
                    />
                    </li>
                ))
            }
        </ul>
    </div>);
}
