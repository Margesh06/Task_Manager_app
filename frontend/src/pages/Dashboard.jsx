import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import defaultProfileImage from '../user.png';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // state to hold profile image URL
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
            setProfileImage(response.data.profileImage); // Assuming the API returns a profile image URL
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to fetch profile.");
        }
    };

    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the profile page
    };

    useEffect(() => {
        fetchTasks();
        fetchProfileImage(); // Fetch the profile image when the dashboard loads
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            {/* Profile image at the top right */}
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <img
                    src={profileImage || defaultProfileImage} // fallback to a default image if no profile image is available
                    alt="Profile"
                    style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
                    onClick={handleProfileClick}
                />
            </div>

            {/* Display error if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <TaskForm onTaskAdded={fetchTasks} />
            <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
        </div>
    );
}

export default Dashboard;
