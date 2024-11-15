import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box } from '@mui/material';

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
        <form onSubmit={handleSubmit} style={styles.form}>
            <TextField
                label="Task Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
            />
            <Button type="submit" variant="contained" color="primary" style={styles.button}>
                Add Task
            </Button>
        </form>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        width: '100%',
        maxWidth: '500px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
        },
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#fff',
        background: 'linear-gradient(90deg, #4B9CD3, #1E90FF)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, background 0.3s ease',
    },
};

export default TaskForm;
