import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/adoption-requests');
        setAdoptionRequests(response.data);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchAdoptionRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/adoption-requests/${id}`, { status: 'approved' });
      // Update the adoption request status in the local state
      setAdoptionRequests((prevAdoptionRequests) =>
        prevAdoptionRequests.map((request) =>
          request.id === id ? { ...request, status: 'approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving adoption request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/adoption-requests/${id}`, { status: 'declined' });
      // Update the adoption request status in the local state
      setAdoptionRequests((prevAdoptionRequests) =>
        prevAdoptionRequests.map((request) =>
          request.id === id ? { ...request, status: 'declined' } : request
        )
      );
    } catch (error) {
      console.error('Error declining adoption request:', error);
    }
  };

  return (
    <div>
      <h1>Adoption Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Cat Name</th>
            <th>Age Type</th>
            <th>Breed</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adoptionRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.cat.cat_name}</td>
              <td>{request.cat.cat_age_type}</td>
              <td>{request.cat.cat_breed}</td>
              <td>{request.cat.cat_description}</td>
              <td>
                <img src={request.cat.cat_image} alt={request.cat.cat_name} width="100" />
              </td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleApprove(request.id)}>Approve</button>
                <button onClick={() => handleDecline(request.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;