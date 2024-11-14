import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, email, password });
            navigate('/');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
