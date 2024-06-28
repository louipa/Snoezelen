// @author : Antoine Otegui, Clément Galiot

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import SidebarContext from '../components/sidebar/sidebarContext';

const Layout = () => {
    const [elementSidebar, setElementSidebar] = useState<React.ReactNode>(
        <></>
    );

    return (
        <SidebarContext.Provider value={{ elementSidebar, setElementSidebar }}>
            <div id="outer-container" className="size100p">
                <Sidebar />
                <div id="page-wrap" className="size100p">
                    <Outlet />
                </div>
            </div>
        </SidebarContext.Provider>
    );
};

export default Layout;
