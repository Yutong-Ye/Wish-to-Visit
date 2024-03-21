import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';

const UserSettingsEdit = () => {
    const { token, logout } = useToken();
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const { account } = decodedToken;

            if (account) {
                setUserData({
                    username: account.username || '',
                    email: account.email || '',
                    password: ''
                });
            }
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { username: userData.username, email: userData.email, password: userData.password };

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const { account } = decodedToken;

            const response = await fetch(`http://localhost:8000/api/user/${account.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to update user settings. Status: ${response.status}`);
            }

            console.log('User settings updated successfully');
            const logoutSuccess = await logout();
            if (logoutSuccess) {
                console.log('Logout successful');
                navigate('/');
            } else {
                console.error('Logout failed');
            }

        } catch (error) {
            console.error('Error updating user settings:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </div>
            <button type="submit">Update Settings</button>
        </form>
    );
};

export default UserSettingsEdit;
