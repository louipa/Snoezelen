import React, { useContext, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';

import * as THREE from 'three';
import Rope from '../components/rope';
import SidebarContext from '../components/sidebarContext';
import ParamSlider from '../components/parameters/paramSlider';

const SetBackgroundColor = ({ color }: { color: string }) => {
    const { scene } = useThree();

    useEffect(() => {
        scene.background = new THREE.Color(color);
    }, [color, scene]);

    return null;
};

export default function OpticFiber() {
    const { setElementSidebar } = useContext(SidebarContext);
    const [ropeCount, setRopeCount] = useState(10);
    const [ropeDistance, setRopeDistance] = useState(0.5);
    const [segmentNumber, setSegmentNumber] = useState(100);
    const [segmentLength, setSegmentLentgh] = useState(0.15);

    const handleRopeNumber = (event) => {
        setRopeCount(parseInt(event.target.value, 10));
    };

    const handleRopeDistance = (event) => {
        setRopeDistance(event.target.value);
    };

    const handleSegmentNumber = (event) => {
        setSegmentNumber(parseInt(event.target.value, 10));
    };

    const handleSegmentLentgh = (event) => {
        setSegmentLentgh(event.target.value);
    };

    useEffect(() => {
        setElementSidebar(
            <div className="parameter-container">
                <h3>Personalize your experience</h3>
                <ParamSlider
                    name="Rope number"
                    min="1"
                    max="30"
                    step="1"
                    defaultValue="10"
                    onChange={handleRopeNumber}
                />
                <ParamSlider
                    name="Rope distance"
                    min="0.1"
                    max="1"
                    step="0.1"
                    defaultValue="0.5"
                    onChange={handleRopeDistance}
                />
                <ParamSlider
                    name="Segment number"
                    min="10"
                    max="600"
                    step="10"
                    defaultValue="100"
                    onChange={handleSegmentNumber}
                />
                <ParamSlider
                    name="Segment lentgh"
                    min="0.01"
                    max="1"
                    step="0.01"
                    defaultValue="0.15"
                    onChange={handleSegmentLentgh}
                />
            </div>
        );

        return () => {
            setElementSidebar(<></>);
        };
    }, [setElementSidebar]);

    // Generate the positions based on the current rope count
    const ropePositions = Array.from(
        { length: ropeCount },
        (_, i) =>
            -(((ropeCount - 1) / 2) * ropeDistance) + 0.01 + i * ropeDistance
    );

    const combinedKey = `${ropeCount}-${segmentNumber}`;

    return (
        <Canvas
            key={combinedKey}
            orthographic
            camera={{ zoom: 50, position: [0, 0, 100] }}
        >
            <SetBackgroundColor color="#222222" />
            <mesh scale={100} position={[0, 0, -10]}>
                <boxGeometry args={[1, 1, 0.1]} />
                <meshStandardMaterial color={'#ffffff'} />
            </mesh>
            {ropePositions.map((x, index) => (
                <Rope
                    key={index}
                    x={x}
                    y={10}
                    segmentNumber={segmentNumber}
                    segmentLength={segmentLength}
                />
            ))}
        </Canvas>
    );
}
