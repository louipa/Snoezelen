import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class Square {
    x: number;
    y: number;
    size: number;
    color: string;

    constructor(x: number, y: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

const SquareMesh = ({ square }) => {
    return (
        <mesh position={[square.x, square.y, 0]}>
            <planeGeometry args={[square.size, square.size]} />
            <meshBasicMaterial color={square.color} side={THREE.DoubleSide} />
        </mesh>
    );
};

interface IWorm {
    width: number;
    length: number;
}

const Worm: React.FC<IWorm> = (props) => {
    const { width, length } = props;
    const [headPosition, setHeadPosition] = useState({ x: 1, y: 1 });
    const [body, setBody] = useState([] as Square[]);

    const mesh = useRef<THREE.Mesh>();

    useFrame(() => {
        const newHeadX = headPosition.x + 0.01;
        const newHeadY = headPosition.y + 0.02;
        setHeadPosition({ x: newHeadX, y: newHeadY });
        const newBody = [...body];
        if (newBody.length > length) {
            newBody.pop();
        }
        newBody.unshift(
            new Square(headPosition.x, headPosition.y, width, 'black')
        );
        setBody(newBody);
    });

    return (
        <mesh ref={mesh}>
            {body.map((square, index) => (
                <SquareMesh key={index} square={square} />
            ))}
        </mesh>
    );
};

export default Worm;
