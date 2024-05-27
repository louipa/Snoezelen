import React from 'react';
import Box from '../components/Box';
import { Canvas } from '@react-three/fiber';

export default function SquishCube() {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <Box position={[0, 0, -5]} />
            <Box position={[0, 1, -5]} />
            <ambientLight />
        </Canvas>
    );
}
