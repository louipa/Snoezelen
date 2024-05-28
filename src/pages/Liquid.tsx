import React, { useEffect } from 'react';
import Box from '../components/box';
import { Canvas, useThree } from '@react-three/fiber';
import './test.js';

import * as THREE from 'three'; // Import the THREE object from the three package

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function Liquid() {
    return (
        <canvas
            id="lamp-anim"
            className="lamp-anim"
            width="1500px"
            height="700px"
        ></canvas>
    );
}
