import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
    const { token } = useToken();
    const [userData, setUserData] = useState({ username: '', email: '' });
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/settings/edit');
    };

    useEffect(() => {
        const decodeToken = (token) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        };

        const fetchUserData = () => {
            if (token) {
                try {
                    const decodedToken = decodeToken(token);
                    const { account } = decodedToken;
                    if (account) {
                        setUserData({ username: account.username, email: account.email });
                    }
                } catch (error) {
                    console.error('Failed to decode token', error);
                }
            }
        };

        fetchUserData();
    }, [token]); // Depend on token to re-run this effect when token changes

    return (
        <div>
            <h2>User Settings</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleEditClick}>Edit</button>
        </div>
    );
};

export default UserSettings;
