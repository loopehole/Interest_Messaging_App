import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SendInterest from './components/SendInterest'; // Import the SendInterest component
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/accounts/users/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setIsAuthenticated(true);
            })
            .catch(error => {
                setIsAuthenticated(false);
            });
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
                <Route path="/send-interest" element={<PrivateRoute isAuthenticated={isAuthenticated}><SendInterest /></PrivateRoute>} /> {/* New route for SendInterest */}
            </Routes>
        </Router>
    );
}

export default App;
