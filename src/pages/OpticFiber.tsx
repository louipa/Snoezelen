import React, { useEffect } from 'react';
import Box from '../components/box';
import { Canvas, useThree } from '@react-three/fiber';

import * as THREE from 'three'; // Import the THREE object from the three package

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function OpticFiber() {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <SetBackgroundColor color="#222222" />
            <Box position={[0, 0, -5]} />
            <ambientLight />
        </Canvas>
    );
}
