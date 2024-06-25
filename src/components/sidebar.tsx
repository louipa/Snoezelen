import React, { useContext, useRef, useState } from 'react';
import { push as Menu } from 'react-burger-menu';
import './sidebar.css';
import { Outlet, Link } from 'react-router-dom';
import SidebarContext from './sidebarContext';

const CustomBurgerIcon = () => <img src="./react.svg" />;

export default function Sidebar() {
    const { elementSidebar } = useContext(SidebarContext);
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
            <Link className="menu-item" to="/lavalamp">
                Lava Lamp
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/fractales2">
                Fractales
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/fractales">
                Chaos Game
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/particles">
                Particles
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/opticfiber">
                Optic Fiber
            </Link>
            <span className="item-separator" />
            <Link className="menu-item" to="/fluid">
                Fluid
            </Link>
            {elementSidebar}
        </Menu>
    );
}
