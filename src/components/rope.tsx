// src/Rope.js
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GRAVITY = new THREE.Vector3(0, -0.02, 0);
const DAMPING = 0.9;
const SEGMENTS = 80;
const SEGMENT_LENGTH = 0.25;
const MOUSE_FORCE = 0.002;
const CORRECTION_THRESHOLD = 0.03;

class ObjectPool {
    constructor(createFunc, size) {
        this.createFunc = createFunc;
        this.pool = [];
        for (let i = 0; i < size; i++) {
            this.pool.push(createFunc());
        }
    }

    get() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFunc();
    }

    release(obj) {
        this.pool.push(obj);
    }
}

const vectorPool = new ObjectPool(() => new THREE.Vector3(), 100);

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
    const lightRef = useRef();
    const lineRef = useRef();

    const [animationElapsedTime, setAnimationElapsedTime] = useState(0);
    const [curvePoints, setCurvePoints] = useState([]);

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

    useFrame((state, delta) => {
        setAnimationElapsedTime((prevTime) => prevTime + delta);

        const mousePosition = vectorPool
            .get()
            .set(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2,
                0
            );

        let pointsUpdated = false;

        for (let i = 1; i < points.length; i++) {
            velocities[i].add(GRAVITY);

            const direction = vectorPool
                .get()
                .copy(points[i])
                .sub(mousePosition);
            const distance = direction.length();
            const force = direction
                .normalize()
                .multiplyScalar(
                    (MOUSE_FORCE * 30) / (distance * distance + 0.1)
                );
            velocities[i].add(force);

            velocities[i].multiplyScalar(DAMPING);

            points[i].add(velocities[i]);

            const segment = vectorPool
                .get()
                .copy(points[i])
                .sub(points[i - 1]);
            const currentLength = segment.length();
            if (
                Math.abs(currentLength - SEGMENT_LENGTH) > CORRECTION_THRESHOLD
            ) {
                const correction = segment
                    .normalize()
                    .multiplyScalar(currentLength - SEGMENT_LENGTH);
                points[i].sub(correction);
                pointsUpdated = true;
            }
            vectorPool.release(direction);
            vectorPool.release(segment);
        }

        vectorPool.release(mousePosition);

        if (pointsUpdated) {
            ref.current.geometry.setFromPoints(points);
            setCurvePoints([...points]);
        }

        const animationDuration = 1;
        const lineLength = 5;
        const t =
            (animationElapsedTime % animationDuration) / animationDuration;
        const start = Math.floor(t * curvePoints.length);
        const end = Math.min(start + lineLength, curvePoints.length);
        const linePoints = curvePoints.slice(start, end);

        if (lineRef.current) {
            lineRef.current.geometry.setFromPoints(linePoints);
        }

        if (lightRef.current && linePoints.length > 0) {
            lightRef.current.position.copy(linePoints[linePoints.length - 1]);
        }
    });

    return (
        <>
            <line ref={ref}>
                <bufferGeometry />
                <lineBasicMaterial color="#757272" />
            </line>
            <line ref={lineRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#79f8f8" />
            </line>
            <pointLight
                ref={lightRef}
                color={'#79f8f8'}
                intensity={3}
                distance={6.5}
            />
        </>
    );
};

export default Rope;
