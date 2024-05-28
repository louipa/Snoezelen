import React, { useMemo } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Polygon from '../components/Polygon';

interface IFractales {
    sides: number;
    radius: number;
}

const Fractales: React.FC<IFractales> = (props) => {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <Polygon radius={1.9} sides={10}></Polygon>
        </Canvas>
    );
};

export default Fractales;
