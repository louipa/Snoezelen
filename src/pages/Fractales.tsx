import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Polygon from '../components/Polygon';
import { Float, Point, PointMaterial, Points } from '@react-three/drei';

interface IFractales {}

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

const Fractales: React.FC<IFractales> = () => {
    const [radius, setRadius] = useState(4);
    const nbPoints = 100000;
    const [sides, setSides] = useState(3);
    const [interpolation, setInterpolation] = useState(0.7);
    const points = useMemo(() => {
        const vertices = [];
        const baseAngle = (2 * Math.PI) / sides;

        for (let i = 0; i < sides; i++) {
            const angle = baseAngle * i;
            vertices.push(
                new THREE.Vector3(
                    radius * Math.cos(angle),
                    radius * Math.sin(angle),
                    0
                )
            );
        }

        const result = new Float32Array(nbPoints * 3);
        let x = Math.random() * radius;
        let y = Math.random() * radius;

        for (let i = 0; i < nbPoints; i++) {
            const i3 = i * 3;

            const target = vertices[randomInteger(0, sides - 1)];

            x = lerp(x, target.x, interpolation);
            y = lerp(y, target.y, interpolation);

            result[i3] = x;
            result[i3 + 1] = y;
            result[i3 + 2] = 0;
        }
        return result;
    }, [radius, sides, nbPoints, interpolation]);
    return (
        <>
            <input
                type="range"
                name="pos"
                id="pos"
                min="0"
                max="1"
                step="0.01"
                value={interpolation}
                onChange={(e) =>
                    setInterpolation(Number(e.currentTarget.value))
                }
            />
            <input
                type="range"
                name="rad"
                id="rad"
                min="3"
                max="15"
                value={sides}
                onChange={(e) => setSides(Number(e.currentTarget.value))}
            />
            <Canvas camera={{}} style={{ backgroundColor: 'black' }}>
                <Polygon radius={radius} sides={sides} />
                <Points positions={points}>
                    <pointsMaterial color="red" size={0.02} />
                </Points>
            </Canvas>
        </>
    );
};

export default Fractales;
