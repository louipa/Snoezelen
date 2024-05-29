import React, { useContext, useEffect, useState } from 'react';
import { lavaAnimation } from './LavaAnimation.js';
import SidebarContext from '../components/sidebarContext.js';
import ParamSlider from '../components/parameters/paramSlider.js';
import ParamColorpicker from '../components/parameters/paramColorpicker.js';

let lavaAnim: lavaAnimation;

const setBallNumber = (event: { target: { value: any } }) => {
    if (lavaAnim && lavaAnim.setBallNumber) {
        lavaAnim.setBallNumber(event.target.value);
    }
};

const setBallSize = (event: { target: { value: any } }) => {
    if (lavaAnim && lavaAnim.setBallSize) {
        lavaAnim.setBallSize(event.target.value);
    }
};

const setBallSpeed = (event: { target: { value: any } }) => {
    if (lavaAnim && lavaAnim.setBallSpeed) {
        lavaAnim.setBallSpeed(event.target.value);
    }
};

export default function Liquid() {
    const { setElementSidebar } = useContext(SidebarContext);

    useEffect(() => {
        lavaAnim = lavaAnimation();
        setElementSidebar(
            <div className="parameter-container">
                <h3>Personalize your experience</h3>
                <ParamSlider
                    name="Ball number"
                    min="1"
                    max="30"
                    step="1"
                    defaultValue="10"
                    onChange={setBallNumber}
                />
                <ParamSlider
                    name="Ball size"
                    min="0.1"
                    max="3"
                    step="0.1"
                    defaultValue="1"
                    onChange={setBallSize}
                />
                <ParamSlider
                    name="Ball speed"
                    min="0.1"
                    max="2"
                    step="0.05"
                    defaultValue="0.25"
                    onChange={setBallSpeed}
                />
                <ParamColorpicker name="Ball color" />
            </div>
        );
        lavaAnim.changeState();
        lavaAnim.run();

        return () => {
            lavaAnim.changeState();
            setElementSidebar(<></>);
        };
    }, [setElementSidebar]);

    return <canvas id="lamp-anim" className="lamp-anim size100p"></canvas>;
}
