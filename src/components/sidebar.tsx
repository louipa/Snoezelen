import React from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import './sidebar.css';

const CustomBurgerIcon = () => <img src="./react.svg" />;

const Sidebar = () => {
    return (
        <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            customBurgerIcon={<CustomBurgerIcon />}
        >
            <a id="home" className="menu-item" href="/">
                Home
            </a>
            <a id="about" className="menu-item" href="/about">
                About
            </a>
            <a id="contact" className="menu-item" href="/contact">
                Contact
            </a>
        </Menu>
    );
};

export default Sidebar;
