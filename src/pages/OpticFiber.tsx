import React, { useEffect } from 'react';
import Curve from '../components/curve';
import { Canvas, useThree } from '@react-three/fiber';

import * as THREE from 'three'; // Import the THREE object from the three package
import Box from '../components/box';

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
            <Curve
                points={[
                    new THREE.Vector3(0, 10, 0),
                    new THREE.Vector3(-5, 5, 0),
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(20, -5, 0),
                    new THREE.Vector3(10, 0, 0)
                ]}
                numPoints={200}
            />
            <mesh scale={100} position={[0, 0, -10]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color={'#ffffff'} />
            </mesh>
        </Canvas>
    );
}
