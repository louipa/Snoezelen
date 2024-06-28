// @author : Clément Galiot

import React from 'react';

interface SidebarContextProps {
    elementSidebar: React.ReactNode;
    setElementSidebar: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const SidebarContext = React.createContext<SidebarContextProps>({
    elementSidebar: null,
    setElementSidebar: () => {}
});

export default SidebarContext;
