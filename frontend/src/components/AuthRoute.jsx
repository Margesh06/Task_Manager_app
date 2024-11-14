import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
    const token = localStorage.getItem('token');

    // If there is no token, redirect to the login page
    if (!token) {
        return <Navigate to="/" />;
    }

    // If there is a token, render the children (protected content)
    return children;
}

export default AuthRoute;
