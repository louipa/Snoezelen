import React from 'react';
import './paramBase.css';

export default function ParamBase(props) {
    return (
        <div className="parambase">
            <p>{props.name}</p>
            {props.children}
        </div>
    );
}
