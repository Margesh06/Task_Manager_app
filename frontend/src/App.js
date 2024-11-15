import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './components/Profile';  // Import the ProfilePage component
import AuthRoute from './components/AuthRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* AuthRoute will protect the dashboard route */}
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    }
                />
                
                {/* Route for the profile page */}
                <Route
                    path="/profile"
                    element={
                        <AuthRoute>
                            <ProfilePage />
                        </AuthRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
