import React, { useState } from 'react';
import ParamBase from './paramBase';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHex, hexToHsva } from '@uiw/color-convert';

export default function ParamColorPicker(props: {
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    const [openpicker, setOpenpicker] = useState('none');

    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });

    const [color, setColor] = useState('#ffffff');

    const handleTextChange = (event: { target: { value: any } }) => {
        const value = event.target.value;
        const isValid = /^#?[0-9A-Fa-f]*$/.test(value);
        if (isValid) {
            setColor(value.startsWith('#') ? value : '#' + value);
            if (value.length === 7 || value.length === 4) {
                setHsva(hexToHsva(value));
                if (props.onChange) props.onChange(value);
            }
        }
    };

    const handleClickColor = () => {
        if (openpicker === 'none') setOpenpicker('block');
        else setOpenpicker('none');
    };

    return (
        <ParamBase name={props.name}>
            <div className="colorPicker">
                <input
                    className="hexPreview"
                    value={color}
                    onChange={handleTextChange}
                    placeholder="#000000"
                    maxLength={7}
                />
                <div
                    className="colorPreview"
                    style={{ backgroundColor: hsvaToHex(hsva) }}
                    onClick={handleClickColor}
                />
            </div>
            <Colorful
                color={hsva}
                onChange={(color) => {
                    setHsva(color.hsva);
                    setColor(hsvaToHex(color.hsva));
                }}
                style={{ display: openpicker }}
            />
        </ParamBase>
    );
}
