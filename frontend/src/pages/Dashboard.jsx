import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import defaultProfileImage from '../user.png';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Failed to fetch tasks.");
        }
    };

    const fetchProfileImage = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfileImage(response.data.profileImage);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to fetch profile.");
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    useEffect(() => {
        fetchTasks();
        fetchProfileImage();
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
            <h2 style={styles.title}>Taskify 🚀</h2>

                <div style={styles.profileContainer}>
                    <img
                        src={profileImage || defaultProfileImage}
                        alt="Profile"
                        style={styles.profileImage}
                        onClick={handleProfileClick}
                    />
                </div>
            </header>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.content}>
                <div style={styles.taskSection}>
                    <h3 style={styles.sectionTitle}>Your Tasks</h3>
                    <div style={styles.taskFormContainer}>
                        <TaskForm onTaskAdded={fetchTasks} />
                    </div>
                    <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f8ff, #e0ebff)',
        padding: '40px 20px',
    },
    header: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '2px solid #d3d3d3',
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
        fontWeight: '600',
        margin: 0,
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    profileImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
    },
    content: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    taskSection: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    taskFormContainer: {
        display: 'flex',
        justifyContent: 'center',  // This centers the task form in the container
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        color: '#444',
        fontWeight: '500',
        marginBottom: '15px',
    },
    error: {
        color: '#ff4d4f',
        fontSize: '1rem',
        marginBottom: '20px',
    },
};

// Hover effects
styles.profileImage[':hover'] = { transform: 'scale(1.1)' };
styles.taskSection[':hover'] = { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' };

export default Dashboard;
