import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/messages/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.sender.username}</strong>: {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
