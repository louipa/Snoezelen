import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lavalamp from './pages/Lavalamp';
import SquishCube from './pages/SquishCube';
import OpticFiber from './pages/OpticFiber';
import Particles from './pages/Particles/Particles';
import Fractales from './pages/Fractales';
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';

export default function App() {
    return (
        <BrowserRouter basename="/snoezelen">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="squishCube" element={<SquishCube />} />
                    <Route path="particles" element={<Particles />} />
                    <Route path="fractales" element={<Fractales />} />
                    <Route path="lavalamp" element={<Lavalamp />} />
                    <Route path="opticfiber" element={<OpticFiber />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
