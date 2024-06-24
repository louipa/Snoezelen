import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Polygon from '../components/Polygon';
import { Points } from '@react-three/drei';
import SidebarContext from '../components/sidebarContext';
import ParamSlider from '../components/parameters/paramSlider';

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function pickHex(color1, color2, weight) {
    const w1 = weight;
    const w2 = 1 - w1;
    return [
        Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)
    ];
}

const Fractales: React.FC = () => {
    const { setElementSidebar } = useContext(SidebarContext);
    const radius = 4;
    const nbPoints = 100000;
    const [sides, setSides] = useState(3);
    const [interpolation, setInterpolation] = useState(0.5);
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

        const positions = new Float32Array(nbPoints * 3);
        const colors = new Float32Array(nbPoints * 3);
        let x = Math.random() * radius;
        let y = Math.random() * radius;

        for (let i = 0; i < nbPoints; i++) {
            const i3 = i * 3;

            const target = vertices[randomInteger(0, sides - 1)];

            x = lerp(x, target.x, interpolation);
            y = lerp(y, target.y, interpolation);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = 0;

            const test = pickHex(
                [200, 0, 0],
                [0, 0, 100],
                (Math.abs(x) / 2 + Math.abs(y) / 2) / radius
            );
            colors[i3] = test[0] / 255;
            colors[i3 + 1] = test[1] / 255;
            colors[i3 + 2] = test[2] / 255;
        }
        console.log(colors);
        return [positions, colors];
    }, [radius, sides, nbPoints, interpolation]);

    useEffect(() => {
        setElementSidebar(
            <div className="parameter-container">
                <h3>Personalize your experience</h3>
                <ParamSlider
                    name="Interpolation"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="0.5"
                    onChange={(e) =>
                        setInterpolation(Number(e.currentTarget.value))
                    }
                />
                <ParamSlider
                    name="Number of sides"
                    min="3"
                    max="15"
                    step="1"
                    defaultValue="3"
                    onChange={(e) => setSides(Number(e.currentTarget.value))}
                />
            </div>
        );
        return () => {
            setElementSidebar(<></>);
        };
    }, [setElementSidebar]);
    return (
        <>
            <Canvas camera={{}} style={{ backgroundColor: 'black' }}>
                <Polygon radius={radius} sides={sides} />
                <Points positions={points[0]} colors={points[1]}>
                    <pointsMaterial vertexColors size={0.02} />
                </Points>
            </Canvas>
        </>
    );
};

export default Fractales;
