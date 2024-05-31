import { Line } from '@react-three/drei';
import * as THREE from 'three';
import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export function LineFollowingCurve({
    curve,
    numPoints,
    animationDuration,
    lineLength,
    color
}) {
    const lineRef = useRef();
    const lightRef = useRef();
    const [visible, setVisible] = useState(true);
    const [points, setPoints] = useState([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
    ]);

    let curvePoints = curve.getPoints(numPoints);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const t = (elapsedTime % animationDuration) / animationDuration;
        const start = Math.floor(t * curvePoints.length);
        const end = Math.min(start + 1 + lineLength, curvePoints.length);

        setPoints(curvePoints.slice(start, end));

        if (lineRef.current) {
            lineRef.current.geometry.setFromPoints(points);

            if (t === 1) {
                setVisible(false);
            }
        }

        if (lightRef.current) {
            console.log(start);
            const lightPosition = curvePoints[start];
            if (lightPosition) {
                lightRef.current.position.copy(lightPosition);
            }
        }
    });

    if (!visible) {
        return null;
    }

    return (
        <>
            <Line points={points} color={color} lineWidth={2} />
            <pointLight
                ref={lightRef}
                color={color}
                intensity={50}
                distance={10}
            />
        </>
    );
}

export default function Curve(props: { numPoints: any; points: any }) {
    const numPoints = props.numPoints;

    const curve = new THREE.CatmullRomCurve3(props.points);

    const curvePoints = curve.getPoints(numPoints);

    return (
        <>
            <Line points={curvePoints} color="#FFFFFF" lineWidth={2} />
            <LineFollowingCurve
                curve={curve}
                numPoints={numPoints}
                animationDuration={2}
                lineLength={20}
                color={'red'}
            />
        </>
    );
}
