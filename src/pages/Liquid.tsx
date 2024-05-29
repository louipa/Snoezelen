import React, { useContext, useEffect, useState } from 'react';
import { lavaAnimation } from './LavaAnimation.js';
import SidebarContext from '../components/sidebarContext.js';

let lavaAnim: lavaAnimation;

const setBallNumber = (event) => {
    if (lavaAnim && lavaAnim.setBallNumber) {
        lavaAnim.setBallNumber(event.target.value);
    }
};

const setBallSize = (event) => {
    if (lavaAnim && lavaAnim.setBallNumber) {
        lavaAnim.setBallSize(event.target.value);
    }
};

export default function Liquid() {
    const { setElementSidebar } = useContext(SidebarContext);

    useEffect(() => {
        lavaAnim = lavaAnimation();
        setElementSidebar(
            <div className="parameter-container">
                <h3>Personalize your experience</h3>
                <div>
                    <p>Ball number</p>
                    <input
                        className="slider"
                        type="range"
                        min="1"
                        max="30"
                        defaultValue="10"
                        onChange={setBallNumber}
                    />
                </div>
                <div>
                    <p>Ball size</p>
                    <input
                        className="slider"
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        defaultValue="1"
                        onChange={setBallSize}
                    />
                </div>
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
