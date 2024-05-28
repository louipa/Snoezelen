import React, { useEffect } from 'react';
import Worm from '../../components/Worm';
import { Canvas, useThree } from '@react-three/fiber';
import { randomFieldVectors } from './perlin.js';

import * as THREE from 'three'; // Import the THREE object from the three package

const SetBackgroundColor = ({ color }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function SquishCube() {
    useEffect(() => {
        console.log(randomFieldVectors(10));
    }, []);
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <SetBackgroundColor color="#222222" />
            <Worm width={0.05} length={200}></Worm>

            <ambientLight />
        </Canvas>
    );
}
