import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/change-password/', {
                old_password: oldPassword,
                new_password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Password changed successfully');
            setError('');
        } catch (error) {
            setError('Error changing password');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleChangePassword}>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Old Password"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
