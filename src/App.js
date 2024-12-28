import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Make sure AuthProvider is properly implemented
import DisplayTable from './DisplayTable';
import TransactionDetails from './TransactionDetails';
import Redeem from './Redeem';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';  // Assuming ProtectedRoute is implemented properly
import LogOut from './components/LogOut';

const App = () => {
 
  
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Define routes */}
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Protected Routes for Admin */}
          <Route
            path="/allCustomers"
            element={
              <ProtectedRoute>
                <DisplayTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactionDetails"
            element={
              <ProtectedRoute>
                <TransactionDetails />
              </ProtectedRoute>
            }
          />

          {/* Protected Route for Redeem */}
          <Route
            path="/redeem"
            element={
              <ProtectedRoute>
                <Redeem />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
