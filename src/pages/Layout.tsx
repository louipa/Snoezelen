import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

const CustomBurgerIcon = () => <img src="./react.svg" />;

const Layout = () => {
    return (
        <div id="outer-container" className="size100p">
            <Sidebar />
            <div id="page-wrap" className="size100p">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
