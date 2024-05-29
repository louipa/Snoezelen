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
            <Link className="menu-item" to="/liquid">
                Liquid
            </Link>
            {elementSidebar}
        </Menu>
    );
}
