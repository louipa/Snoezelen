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
        lavaAnim.changeBallSize(event.target.value);
    }
};

export default function Liquid() {
    const { setElementSidebar } = useContext(SidebarContext);

    useEffect(() => {
        lavaAnim = lavaAnimation();
        setElementSidebar(
            <>
                <input type="range" min="0" max="11" onChange={setBallNumber} />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={setBallSize}
                />
            </>
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
