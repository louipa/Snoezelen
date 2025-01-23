// @author : Clément Galiot, Antoine Otegui
// librairy : https://github.com/negomi/react-burger-menu

import React, { useContext } from 'react';
import { push as Menu } from 'react-burger-menu';
import './sidebar.css';
import { Link } from 'react-router-dom';
import SidebarContext from './sidebarContext';
import CustomParametersButton from '../../assets/parameters.png';
import HomeButton from '../../assets/home.png';

export default function Sidebar() {
    const { elementSidebar } = useContext(SidebarContext);
    return (
        <>
            <Link to="/">
                <img
                    src={HomeButton}
                    style={{
                        zIndex: 1000,
                        position: 'fixed',
                        width: '36px',
                        height: '36px',
                        top: '36px',
                        left: '36px'
                    }}
                />
            </Link>
            <Menu
                pageWrapId={'page-wrap'}
                outerContainerId={'outer-container'}
                customBurgerIcon={<img src={CustomParametersButton} />}
            >
                {elementSidebar}
            </Menu>
        </>
    );
}
