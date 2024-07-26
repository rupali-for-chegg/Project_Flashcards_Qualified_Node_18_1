import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                <Outlet /> {/* This will render the matched route's component */}
            </div>
        </>
    );
}

export default Layout;
