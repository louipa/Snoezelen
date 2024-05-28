import React, { useRef, useState } from 'react';
import { elastic as Menu } from 'react-burger-menu';
import './sidebar.css';
import { Outlet, Link } from 'react-router-dom';

const CustomBurgerIcon = () => <img src="./react.svg" />;

export default function Sidebar(props) {
    return (
        <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            customBurgerIcon={<CustomBurgerIcon />}
        >
            <Link className="menu-item" to="/">
                Home
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/squishCube">
                Squish Cube
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/liquid">
                Liquid
            </Link>
            {props.test}
        </Menu>
    );
}
