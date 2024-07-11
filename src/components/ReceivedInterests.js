import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReceivedInterests = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios.get('/api/messaging/interests/received/')
      .then(response => {
        setInterests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the interests!", error);
      });
  }, []);

  const respondToInterest = (id, status) => {
    axios.patch(`/api/messaging/interests/${id}/`, { status: status })
      .then(response => {
        alert(`Interest ${status}`);
        setInterests(interests.filter(interest => interest.id !== id));
      })
      .catch(error => {
        console.error("There was an error responding to the interest!", error);
      });
  };

  return (
    <div>
      <h2>Received Interests</h2>
      <ul>
        {interests.map(interest => (
          <li key={interest.id}>
            {interest.sender.username}: {interest.message}
            <button onClick={() => respondToInterest(interest.id, 'accepted')}>Accept</button>
            <button onClick={() => respondToInterest(interest.id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedInterests;
