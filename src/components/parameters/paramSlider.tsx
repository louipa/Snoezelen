import React from 'react';
import ParamBase from './paramBase';

export default function ParamSlider(props: {
    name: string;
    min: string;
    max: string;
    step: string;
    defaultValue: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <ParamBase name={props.name}>
            <input
                className="slider"
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
            />
            <div className="sliderValues">
                <p>{props.min}</p>
                <p>{props.max}</p>
            </div>
        </ParamBase>
    );
}
