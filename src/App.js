// src/App.js or Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';  // Your protected component
import ProtectedRoute from './components/ProtectedRoute';
import Tasks from './components/Task';
import AddTask from './components/AddTask';

function App() {
    return (
        <Router>
            <Routes>
            
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
=                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
<Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
<Route path="//add-task" element={<ProtectedRoute element={<AddTask />} />} />

                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
