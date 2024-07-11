import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/accounts/users/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the users!", error);
    });
  }, []);

  const sendInterest = () => {
    const token = localStorage.getItem('token');
    if (selectedUserId && message) {
      axios.post('/api/messaging/interests/', {
        receiver: selectedUserId,
        message: message
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        alert('Interest sent!');
        setMessage('');
        setSelectedUserId(null);
      })
      .catch(error => {
        console.error("There was an error sending the interest!", error);
      });
    } else {
      alert('Please select a user and enter a message.');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            <button onClick={() => setSelectedUserId(user.id)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedUserId && (
        <div>
          <h3>Selected User: {users.find(user => user.id === selectedUserId).username}</h3>
          <input
            type="text"
            placeholder="Enter your interest message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendInterest}>Send Interest</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
