// @author : Antoine Otegui, Louis Painter, Clément Galiot

import './App.css';
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Lavalamp from './pages/Lavalamp/Lavalamp';
import OpticFiber from './pages/Opticfiber/OpticFiber';
import Particles from './pages/Particles/Particles';
import Fluid from './pages/Fluid/FluidPage';
import FractalesChaos from './pages/Chaos/FractalesChaos';
import FractalesShader from './pages/Fractal/FractalesShader';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import About from './pages/About/About';
import CarouselExperiences from './pages/Carousel/Carousel';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<CarouselExperiences />} />
                <Route path="about" element={<About />} />
                <Route path="/" element={<Layout />}>
                    <Route path="particles" element={<Particles />} />
                    <Route path="fluid" element={<Fluid />} />
                    <Route path="fractaleschaos" element={<FractalesChaos />} />
                    <Route path="fractales" element={<FractalesShader />} />
                    <Route path="lavalamp" element={<Lavalamp />} />
                    <Route path="opticfiber" element={<OpticFiber />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
