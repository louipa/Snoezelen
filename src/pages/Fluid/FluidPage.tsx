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
    const fieldVectorSize = 13;

    const fieldVector: { x: number; y: number }[][] =
        randomFieldVectors(fieldVectorSize);

    let newFieldVector: { x: number; y: number }[][] =
        randomFieldVectors(fieldVectorSize);

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
            newFieldVector = randomFieldVectors(fieldVectorSize);
        }, delayBetweenReorientation);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (event: MouseEvent) => {
        // console.log(newFieldVector);

        const mouseCaseX = Math.round(
            (event.clientX / window.innerWidth) * (fieldVectorSize - 1)
        );
        const mouseCaseY = Math.round(
            (1 - event.clientY / window.innerHeight) * (fieldVectorSize - 1)
        );

        const radius = 2;

        const supX =
            mouseCaseX + radius < fieldVectorSize
                ? mouseCaseX + radius
                : fieldVectorSize;
        const supY =
            mouseCaseY + radius < fieldVectorSize
                ? mouseCaseY + radius
                : fieldVectorSize;

        for (
            let i = mouseCaseX - radius < 0 ? 0 : mouseCaseX - radius;
            i < supX;
            i++
        ) {
            for (
                let j = mouseCaseY - radius < 0 ? 0 : mouseCaseY - radius;
                j < supY;
                j++
            ) {
                const distX = i - mouseCaseX;
                const distY = j - mouseCaseY;
                const tot = Math.abs(distX) + Math.abs(distY);
                const ratioX = distX / tot || 0;
                const ratioY = distY / tot || 0;
                fieldVector[i][j].x =
                    ratioX * (1 - Math.abs(ratioX)) +
                    Math.abs(ratioX) * fieldVector[i][j].x;
                fieldVector[i][j].y =
                    ratioY * (1 - Math.abs(ratioY)) +
                    Math.abs(ratioY) * fieldVector[i][j].y;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
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
            <div className="canvaContainer">
                {Array.from({ length: 4 }, (_, i) => (
                    <Canvas
                        key={i}
                        orthographic
                        camera={{ position: [0, 0, 100] }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            filter: `blur(${Math.floor((4 - i) ** 2.0)}px)`
                        }}
                    >
                        <Fluid
                            fieldVector={fieldVector}
                            numberWorms={(4 - i) * 50}
                            wormLength={(4 - i - 1) * 10 + 2}
                            wormWidth={(4 - i) * 0.5}
                        ></Fluid>
                    </Canvas>
                ))}
            </div>
            <div className="colorFilter"></div>
        </section>
    );
}
