import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        setIsLoggedIn(!!storedToken); // Check if token exists
    }, []);

    const login = (token) => {
        localStorage.setItem('auth_token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
