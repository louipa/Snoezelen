import './App.css';
import {Box} from './components/box';
import {Canvas} from '@react-three/fiber';

function App() {
  return (
    <Canvas>
      <Box position={[-1.2, 0, 0]} />
      <ambientLight></ambientLight>
    </Canvas>
  );
}

export default App;
