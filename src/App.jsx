import { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Liquid from './pages/Liquid';
import SquishCube from './pages/SquishCube';
import NeuralSignal from './pages/NeuralSignal/NeuralSignal';
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
                    <Route path="neuralSignal" element={<NeuralSignal />} />
                    <Route path="fractales" element={<Fractales />} />
                    <Route path="liquid" element={<Liquid />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
