import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { lavaAnimation } from './LavaAnimation.js';

import * as THREE from 'three'; // Import the THREE object from the three package

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function Liquid() {
    useEffect(() => {
        lavaAnimation().run();
    }, []);
    return <canvas id="lamp-anim" className="lamp-anim size100p"></canvas>;
}
