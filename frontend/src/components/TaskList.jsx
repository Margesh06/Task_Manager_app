import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TaskList({ onTaskUpdated }) {
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [statusFilter, searchTerm]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
                params: { status: statusFilter, search: searchTerm },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingTaskId(task._id);
        setEditName(task.name);
        setEditDescription(task.description);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditName('');
        setEditDescription('');
    };

    const handleSaveEdit = async (id) => {
        try {
            await api.put(`/tasks/${id}`, { name: editName, description: editDescription }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks(); // Refresh the task list
            handleCancelEdit(); // Clear the editing state
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleComplete = async (id) => {
        try {
            await api.put(`/tasks/${id}`, { status: 'completed' }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            {/* Search and Filter */}
            <div>
                <input
                    type="text"
                    placeholder="Search by task name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Task List */}
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {editingTaskId === task._id ? (
                            // Edit form for the selected task
                            <div>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Task name"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Task description"
                                />
                                <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            // Display task information
                            <div>
                                <h3>{task.name}</h3>
                                <p>{task.description}</p>
                                <p>Status: {task.status}</p>
                                <button onClick={() => handleComplete(task._id)}>Complete</button>
                                <button onClick={() => handleDelete(task._id)}>Delete</button>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
