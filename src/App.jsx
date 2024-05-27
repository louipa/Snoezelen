import { useState } from 'react';
import './App.css';
import { Box } from './components/box';
import { Canvas } from '@react-three/fiber';
import Sidebar from './components/sidebar';

function App() {
    return (
        <div id="outer-container" className="App">
            <Sidebar />
            <Canvas
                id="page-wrap"
                orthographic
                camera={{ zoom: 50, position: [0, 0, 100] }}
                gl={{
                    alpha: false,
                    antialias: true,
                    backgroundColor: 'skyblue'
                }}
            >
                <Box position={[0, 0, -5]} />
                <Box position={[0, 1, -5]} />
                <ambientLight />
            </Canvas>
        </div>
    );
}

export default App;
