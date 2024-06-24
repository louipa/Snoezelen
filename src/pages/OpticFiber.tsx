import React, { useEffect } from 'react';
import Curve from '../components/curve';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import * as THREE from 'three'; // Import the THREE object from the three package
import Box from '../components/box';
import Rope from '../components/rope';

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function OpticFiber() {
    const ropePositions = Array.from({ length: 41 }, (_, i) => -2 + i * 0.1);
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <SetBackgroundColor color="#222222" />
            <mesh scale={100} position={[0, 0, -10]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color={'#ffffff'} />
            </mesh>
            {ropePositions.map((x, index) => (
                <Rope key={index} x={x} y={10} />
            ))}
        </Canvas>
    );
}
