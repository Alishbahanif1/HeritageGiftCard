import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {

 const islogin=localStorage.getItem('isAuthenticated');

 if (!islogin) {
        return  <Navigate to="/login" />; 
      }
    
      return children; 
      }

export default ProtectedRoute;
