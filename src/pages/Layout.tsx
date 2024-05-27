import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const CustomBurgerIcon = () => <img src="assets/react.svg" />;

const Layout = () => {
    return (
        <>
            <Menu customBurgerIcon={<CustomBurgerIcon />}>
                <Link className="menu-item" to="/">
                    Home
                </Link>
                <Link className="menu-item" to="/squishCube">
                    Squish Cube
                </Link>
            </Menu>

            <Outlet />
        </>
    );
};

export default Layout;
