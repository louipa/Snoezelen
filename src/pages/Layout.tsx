import React, { ReactElement } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';

const Layout = () => {
    const handlechange = (message: string) => {};

    return (
        <div id="outer-container" className="size100p">
            <Sidebar test={handlechange('truc')} />
            <div id="page-wrap" className="size100p">
                <Outlet context={[handlechange]} />
            </div>
        </div>
    );
};

export default Layout;
