import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(username, password);
        if (success) {
            const userId=localStorage.getItem('userid');
            if (userId == 1) 
                {navigate('/allCustomers');} 
            else 
            {navigate('/Redeem');}
           
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
            <h2 className='text-center mt-5 mb-3'>Heritage Jewllwers</h2>
            <h3 className='text-center'>Login</h3>
            <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className='input'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className='input'
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <>{error && <p style={{ color: 'red' }}>{error}</p>}</>
                <div className='d-flex justify-content-center align-items-center'>

                <button className='btn btn-dark' type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                    {loading ? 'Logging in...' : 'Login'}
                </button></div>
                
            </form>

           </div>
        </div>
    );
};

export default Login;
