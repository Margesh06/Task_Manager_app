import React from 'react';
import api from '../services/api';

function TaskList({ tasks, onTaskUpdated }) {
    const token = localStorage.getItem('token');

    const handleComplete = async (id) => {
        await api.put(`/tasks/${id}`, { status: 'completed' }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        onTaskUpdated();
    };

    const handleDelete = async (id) => {
        await api.delete(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        onTaskUpdated();
    };

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => handleComplete(task._id)}>Complete</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;
