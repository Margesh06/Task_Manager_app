import React, { useState } from 'react';
import api from '../services/api';

function TaskForm({ onTaskAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await api.post('/tasks', { name, description }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        onTaskAdded();
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
