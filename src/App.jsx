import { useState } from "react";
import "./App.css";
import { Box } from "./components/box";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
      <Box position={[0, 0, -5]} />
      <Box position={[0, 1, -5]} />
      <ambientLight />
    </Canvas>
  );
}

export default App;
