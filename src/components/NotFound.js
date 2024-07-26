import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <Link to="/">Go back to Home</Link>
        </div>
    );
}

export default NotFound;
