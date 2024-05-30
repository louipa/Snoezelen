import { Line } from '@react-three/drei';
import * as THREE from 'three';
import React, { useRef, useState } from 'react';

function CubeFollowingCurve({ curve }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(true);

    // Hook useFrame pour mettre à jour la position du cube à chaque frame
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const t = (elapsedTime % 5) / 5; // Un cycle complet toutes les 5 secondes
        const point = curve.getPointAt(t);

        if (meshRef.current) {
            meshRef.current.position.set(point.x, point.y, point.z);

            if (t === 1) {
                setVisible(false); // Rendre le cube invisible à la fin
            }
        }
    });

    if (!visible) {
        return null; // Ne pas rendre le cube s'il n'est pas visible
    }

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'blue'} />
        </mesh>
    );
}

export default function Curve(props: { points: THREE.Vector3[] | undefined }) {
    const curve = new THREE.CatmullRomCurve3(props.points);

    const curvePoints = curve.getPoints(50);

    return <Line points={curvePoints} color="red" lineWidth={2} />;
}
