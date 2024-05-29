import React from 'react';
import ParamBase from './paramBase';

export default function ParamCheckBox(props: {
    name: string;
    defaultValue: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <ParamBase name={props.name}>
            <input
                type="checkbox"
                id="switch"
                defaultChecked={props.defaultValue}
                onChange={props.onChange}
            />
            <label htmlFor="switch"></label>
        </ParamBase>
    );
}
