import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

const Layout = () => {
    const handlechange = (message: string) => {
        console.log(message);
    };

    return (
        <div id="outer-container" className="size100p">
            <Sidebar />
            <div id="page-wrap" className="size100p">
                <Outlet context={[handlechange]} />
            </div>
        </div>
    );
};

export default Layout;
