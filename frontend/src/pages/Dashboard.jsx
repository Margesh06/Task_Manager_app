import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <TaskForm onTaskAdded={fetchTasks} />
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
    );
}

export default Dashboard;
