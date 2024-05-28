import React from 'react';
import { Outlet, Link } from 'react-router-dom';
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
                    <Link to="/contact">Contact (404)</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
