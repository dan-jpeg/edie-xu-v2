import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/landing';

    if (isLandingPage) {
        return <>{children}</>;
    }

    return (
        <div className="app-container scrollbar-hide">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="main-container">
                {children}
            </div>
        </div>
    );
};

export default Layout;