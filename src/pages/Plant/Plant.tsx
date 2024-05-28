import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Tree } from './Tree';

interface IPlant {}

const Plant: React.FC<IPlant> = () => {
    return (
        <>
            <Canvas camera={{}} style={{ backgroundColor: 'black' }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Tree depth={5} />
            </Canvas>
        </>
    );
};

export default Plant;
