import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        username: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await api.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
                setUpdatedProfile({ username: response.data.username, email: response.data.email });
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Navigate to the login page
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedProfile({ username: profile.username, email: profile.email });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await api.patch('/auth/profile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(response.data);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile.");
        }
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {/* Display error if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display profile details */}
            {profile ? (
                <div>
                    <h3>Profile</h3>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={updatedProfile.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Username:</strong> {profile.username}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <button onClick={handleEditClick}>Edit Profile</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            {/* Log out button */}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default ProfilePage;
