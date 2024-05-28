import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import './sidebar.css';

const CustomBurgerIcon = () => <img src="./react.svg" />;

const Layout = () => {
    return (
        <div id="outer-container" className="size100p">
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
            </Menu>
            <div id="page-wrap" className="size100p">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
