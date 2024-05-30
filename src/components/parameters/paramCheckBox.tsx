import React from 'react';
import ParamBase from './paramBase';

export default function ParamCheckBox(props: {
    name: string;
    defaultValue: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <ParamBase name={props.name}>
            <label className="toggle">
                <input
                    className="toggle-checkbox"
                    type="checkbox"
                    defaultChecked={props.defaultValue}
                    onChange={props.onChange}
                />
                <div className="toggle-switch"></div>
            </label>
        </ParamBase>
    );
}
