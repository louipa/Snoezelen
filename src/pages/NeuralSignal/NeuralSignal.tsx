import React, { useEffect } from 'react';
import Worm from '../../components/Worm';
import { Canvas, useThree } from '@react-three/fiber';
import { randomFieldVectors } from './perlin.js';

import * as THREE from 'three'; // Import the THREE object from the three package
import { Line } from '@react-three/drei';

const SetBackgroundColor = ({ color }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color); // Use the THREE object to set the background color
    }, [color, scene]);

    return null;
};

export default function NeuralSignal() {
    const vectors = randomFieldVectors(100);
    const offset = vectors.length / 2;

    return (
        <Canvas orthographic camera={{ zoom: 5 }}>
            <SetBackgroundColor color="#222222" />
            <Worm width={0.05} length={200}></Worm>
            {vectors.map((row, i) =>
                row.map((vector, j) => (
                    <Line
                        key={`${i}-${j}`}
                        points={[
                            [i - offset, j - offset, 0],
                            [i - offset + vector.x, j - offset + vector.y, 0]
                        ]}
                        color="white"
                        lineWidth={1}
                    />
                ))
            )}
            <ambientLight />
        </Canvas>
    );
}
