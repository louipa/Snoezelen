import React, { useMemo } from 'react';
import * as THREE from 'three';

interface IPolygon {
    sides: number;
    radius: number;
}

const Polygon: React.FC<IPolygon> = (props) => {
    const shape = useMemo(() => {
        const angleStep = (Math.PI * 2) / props.sides;
        const polygon = new THREE.Shape();

        for (let i = -1; i < props.sides; i++) {
            const angle = i * angleStep;
            const x = props.radius * Math.cos(angle);
            const y = props.radius * Math.sin(angle);
            polygon.lineTo(x, y);
        }
        return polygon;
    }, [props]);

    return (
        <mesh>
            <shapeGeometry args={[shape]}></shapeGeometry>
            <meshBasicMaterial color="black" />
        </mesh>
    );
};

export default Polygon;
