// @author : Antoine Otegui, Louis Painter, Clément Galiot

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="homeContainer size100p">
            <h1>Home</h1>
            <ul>
                <li>
                    <Link to="/squishCube">Squish Cube</Link>
                </li>
                <li>
                    <Link to="/lavalamp">Lava Lamp</Link>
                </li>
                <li>
                    <Link to="/particles">Particles</Link>
                </li>
                <li>
                    <Link to="fractales2">Fractals</Link>
                </li>
                <li>
                    <Link to="fractales">Chaos Game</Link>
                </li>
                <li>
                    <Link to="/fluid">Fluid</Link>
                </li>
                <li>
                    <Link to="/contact">Contact (404)</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
