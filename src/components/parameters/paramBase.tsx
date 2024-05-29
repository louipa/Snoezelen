import React from 'react';
import './paramBase.css';

export default function ParamBase(props: {
    name: string;
    children: React.ReactElement | React.ReactElement[] | null;
}) {
    return (
        <div className="parambase">
            <p>{props.name}</p>
            {props.children}
        </div>
    );
}
