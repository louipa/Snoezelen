import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { lavaAnimation } from './LavaAnimation.js';
import { useOutletContext } from 'react-router-dom';

import * as THREE from 'three';

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color);
    }, [color, scene]);

    return null;
};

export default function Liquid() {
    const [handlechange]: [any] = useOutletContext();

    useEffect(() => {
        let lavaAnim = lavaAnimation();
        handlechange(<div>tryc</div>);
        lavaAnim.changeState();
        lavaAnim.run();

        return () => {
            lavaAnim.changeState();
        };
    }, []);

    return <canvas id="lamp-anim" className="lamp-anim size100p"></canvas>;
}
