import React, { useState, useEffect } from 'react';
import Fluid from './Fluid';
import { Canvas, useThree } from '@react-three/fiber';
import { randomFieldVectors } from '../Particles/perlin';
import SnoezelenAudio from '../SnoezelenAudio';
import './Fluid.css';

import * as THREE from 'three';

const SetBackgroundColor = ({ color }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color);
    }, [color, scene]);

    return null;
};

export default function FluidPage() {
    // //     props: {
    // //     numberWorms: number,
    // //     delayBetweenAnimation: number
    // // }
    const delayBetweenReorientation: number = 25000;
    const numberWorms: number = 300;

    const fieldVector: { x: number; y: number }[][] = randomFieldVectors(25);

    let newFieldVector: { x: number; y: number }[][] = randomFieldVectors(25);

    useEffect(() => {
        const interval = setInterval(() => {
            fieldVector.forEach((row, i) => {
                row.forEach((vector, j) => {
                    (vector.x = 0.9 * vector.x + 0.1 * newFieldVector[i][j].x),
                        (vector.y =
                            0.9 * vector.y + 0.1 * newFieldVector[i][j].y);
                });
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            newFieldVector = randomFieldVectors(25);
        }, delayBetweenReorientation);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="fluid"
            style={{
                position: 'relative',
                height: '100%',
                backgroundColor: 'black'
            }}
        >
            <SnoezelenAudio></SnoezelenAudio>
            {Array.from({ length: 4 }, (_, i) => (
                <Canvas
                    key={i}
                    orthographic
                    camera={{ position: [0, 0, 100] }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        filter: `blur(${Math.floor((4 - i) ** 2.5)}px)`
                    }}
                >
                    <Fluid
                        fieldVector={fieldVector}
                        numberWorms={(4 - i) * 50}
                        wormLength={(4 - i - 1) * 10 + 2}
                        wormWidth={(4 - i) * 2}
                    ></Fluid>
                </Canvas>
            ))}
            <div className="colorFilter"></div>
        </section>
    );
}
