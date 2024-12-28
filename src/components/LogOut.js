import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const { logout } = useAuth();
    
    const navigate = useNavigate(); 
    function handleLogout(){
        logout()
         navigate('/');}
    return (
        <div >
            <button onClick={handleLogout} style={{ padding: '0.5rem 1rem',backgroundColor:'black', color:'grey', border:'1px solid grey' }}>
                Logout
            </button>
        </div>
    );
};

export default LogOut;
