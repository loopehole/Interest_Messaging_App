// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendInterest from './SendInterest';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [interests, setInterests] = useState([]);

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

        const fetchInterests = async () => {
            const token = localStorage.getItem('access_token');

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/accounts/interests/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setInterests(response.data);
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        fetchUsers();
        fetchInterests();
    }, []);

    const handleAcceptInterest = async (interestId) => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.patch(`http://127.0.0.1:8000/api/accounts/interests/${interestId}/accept/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optionally update state or fetch interests again
        } catch (error) {
            console.error('Error accepting interest:', error);
        }
    };

    const handleRejectInterest = async (interestId) => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.patch(`http://127.0.0.1:8000/api/accounts/interests/${interestId}/reject/`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optionally update state or fetch interests again
        } catch (error) {
            console.error('Error rejecting interest:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
            <h2>Received Interests</h2>
            <ul>
                {interests.map((interest) => (
                    <li key={interest.id}>
                        {interest.sender} - {interest.message}
                        {interest.accepted ? (
                            <span> - Accepted</span>
                        ) : interest.rejected ? (
                            <span> - Rejected</span>
                        ) : (
                            <div>
                                <button onClick={() => handleAcceptInterest(interest.id)}>Accept</button>
                                <button onClick={() => handleRejectInterest(interest.id)}>Reject</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
