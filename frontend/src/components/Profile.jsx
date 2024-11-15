import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, CardContent, Typography, TextField, Button, Box, Avatar, CircularProgress } from '@mui/material';
import defaultProfileImage from '../user.png';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', padding: 3 }}>
            {/* Display error if any */}
            {error && <Typography sx={{ color: 'red', marginBottom: 2 }}>{error}</Typography>}

            {/* Display profile details */}
            {profile ? (
                <Card sx={{ width: '100%', maxWidth: 600, padding: 3, marginBottom: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Avatar
                                alt="Profile"
                                src={profile.profileImage || defaultProfileImage}
                                sx={{ width: 56, height: 56, marginRight: 2 }}
                            />
                            <Typography variant="h5">{profile.username}</Typography>
                        </Box>

                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    value={updatedProfile.username}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box>
                                <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                                <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ marginTop: 2 }}>
                                    Edit Profile
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <CircularProgress />
            )}

            {/* Log out button */}
            <Button variant="contained" color="error" onClick={handleLogout} sx={{ marginTop: 4 }}>
                Log Out
            </Button>
        </Box>
    );
}

export default ProfilePage;
