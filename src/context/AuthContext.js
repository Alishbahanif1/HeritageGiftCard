import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const savedAuthState = localStorage.getItem('isAuthenticated');
        if (savedAuthState === 'true') {
          setIsAuthenticated(true);
        }
      }, []);
    
    // Function to handle login
    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'https://aptech.heritagejewels.com.pk/microservices/login.php',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;

            if (response.status === 200 && data.success) {
                console.log(response.data.user.userid)
                localStorage.setItem('userid', response.data.user.userid);
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                return true
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userid');
   
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
