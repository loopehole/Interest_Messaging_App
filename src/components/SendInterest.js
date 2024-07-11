// frontend/interest-frontend/src/components/SendInterest.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendInterest = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/accounts/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSendInterest = async (recipientId) => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/interests/', {
                recipient: recipientId,
                message,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setResponseMessage('Interest sent successfully!');
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setResponseMessage(error.response.data.detail);
            } else {
                setResponseMessage('An error occurred. Please try again.');
            }
        }
        setMessage('');
    };

    return (
        <div>
            <h2>Send Interest</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                        <button onClick={() => handleSendInterest(user.id)}>Send Interest</button>
                    </li>
                ))}
            </ul>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
            />
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default SendInterest;
