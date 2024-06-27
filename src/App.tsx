import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Lavalamp from './pages/Lavalamp';
import SquishCube from './pages/SquishCube';
import OpticFiber from './pages/OpticFiber';
import Particles from './pages/Particles/Particles';
import Fluid from './pages/Fluid/FluidPage';
import Fractales from './pages/Fractales';
import FractalesShader from './pages/FractalesShader';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import CarouselExperiences from './pages/Carousel';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CarouselExperiences />} />
                    <Route path="squishCube" element={<SquishCube />} />
                    <Route path="particles" element={<Particles />} />
                    <Route path="fluid" element={<Fluid />} />
                    <Route path="fractales" element={<Fractales />} />
                    <Route path="fractales2" element={<FractalesShader />} />
                    <Route path="lavalamp" element={<Lavalamp />} />
                    <Route path="opticfiber" element={<OpticFiber />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
