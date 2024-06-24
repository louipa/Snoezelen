// src/Rope.js
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

const GRAVITY = new THREE.Vector3(0, -0.02, 0);
const DAMPING = 0.9;
const SEGMENTS = 40;
const SEGMENT_LENGTH = 0.25;
const MOUSE_FORCE = 0.002;

export function LineFollowingCurve({
    curvePoints,
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
                intensity={3}
                distance={6.5}
            />
        </>
    );
}

const Rope = ({ x, y }) => {
    const { viewport, mouse } = useThree();
    const points = useMemo(() => {
        const pointsArray = [];
        for (let i = 0; i <= SEGMENTS; i++) {
            pointsArray.push(new THREE.Vector3(x, -i * SEGMENT_LENGTH + y, 0));
        }
        return pointsArray;
    }, [x, y]);

    const velocities = useMemo(
        () => points.map(() => new THREE.Vector3(0, 0, 0)),
        [points]
    );
    const ref = useRef();

    useEffect(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        ref.current.geometry = geometry;
    }, [points]);

    const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame(() => {
        const mousePosition = new THREE.Vector3(
            (mouse.x * viewport.width) / 2,
            (mouse.y * viewport.height) / 2,
            0
        );

        for (let i = 1; i < points.length; i++) {
            velocities[i].add(GRAVITY);

            const direction = points[i].clone().sub(mousePosition);
            const distance = direction.length();
            const force = direction
                .normalize()
                .multiplyScalar(
                    (MOUSE_FORCE * 30) / (distance * distance + 0.1)
                );
            velocities[i].add(force);

            velocities[i].multiplyScalar(DAMPING);

            points[i].add(velocities[i]);
        }

        // Correct the segment lengths
        for (let iteration = 0; iteration < 60; iteration++) {
            for (let j = 0; j < points.length - 1; j++) {
                const segment = points[j + 1].clone().sub(points[j]);
                const currentLength = segment.length();
                const correction = segment.multiplyScalar(
                    (currentLength - SEGMENT_LENGTH) / currentLength / 2
                );
                if (j > 0) {
                    points[j].add(correction);
                }
                points[j + 1].sub(correction);
            }
        }

        ref.current.geometry.setFromPoints(points);
    });

    return (
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color="#757272" />
            <LineFollowingCurve
                curvePoints={points}
                animationDuration={1}
                lineLength={2}
                color={'#79f8f8'}
            />
        </line>
    );
};

export default Rope;
