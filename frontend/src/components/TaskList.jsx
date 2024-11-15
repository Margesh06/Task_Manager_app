import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, InputAdornment } from '@mui/material';
import api from '../services/api';

function TaskList({ onTaskUpdated }) {
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
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
        setEditStatus(task.status);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditName('');
        setEditDescription('');
        setEditStatus('');
    };

    const handleSaveEdit = async (id) => {
        try {
            await api.put(`/tasks/${id}`, { 
                name: editName, 
                description: editDescription, 
                status: editStatus 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
            handleCancelEdit();
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
        <div style={styles.container}>
            <div style={styles.controls}>
                <TextField
                    label="Search by task name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    style={styles.input}
                />
                <FormControl fullWidth style={styles.select}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <ul style={styles.taskList}>
                {tasks.map((task) => (
                    <li key={task._id} style={styles.taskItem}>
                        {editingTaskId === task._id ? (
                            <div style={styles.editContainer}>
                                <TextField
                                    label="Task Name"
                                    variant="outlined"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    fullWidth
                                    style={styles.input}
                                />
                                <TextField
                                    label="Task Description"
                                    variant="outlined"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    style={styles.input}
                                />
                                <FormControl fullWidth style={styles.select}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        label="Status"
                                    >
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                    </Select>
                                </FormControl>
                                <div style={styles.buttonGroup}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleSaveEdit(task._id)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div style={styles.taskContent}>
                                <h3 style={styles.taskTitle}>{task.name}</h3>
                                <p style={styles.taskDescription}>{task.description}</p>
                                <p style={styles.taskStatus}>Status: {task.status}</p>
                                <div style={styles.buttonGroup}>
                                    {task.status !== 'completed' && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleComplete(task._id)}
                                        >
                                            Complete
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(task)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    controls: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        marginBottom: '10px',
    },
    select: {
        width: '150px',
    },
    taskList: {
        listStyleType: 'none',
        padding: 0,
    },
    taskItem: {
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    taskContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    taskTitle: {
        fontSize: '1.5em',
        margin: 0,
    },
    taskDescription: {
        fontSize: '1.1em',
        color: '#555',
    },
    taskStatus: {
        margin: '10px 0',
        fontSize: '1.2em',
        color: '#888',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
    },
    editContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
};

export default TaskList;
