import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            await axios.post('http://127.0.0.1:8000/api/messages/', {
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContent('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;
