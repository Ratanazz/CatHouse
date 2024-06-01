import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/AdoptionRequsetList.css';
const AdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

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
      setAdoptionRequests((prevAdoptionRequests) =>
        prevAdoptionRequests.map((request) =>
          request.id === id ? { ...request, status: 'declined' } : request
        )
      );
    } catch (error) {
      console.error('Error declining adoption request:', error);
    }
  };

  const filteredRequests =
    activeTab === 'pending'
      ? adoptionRequests.filter((request) => request.status === 'pending')
      : adoptionRequests.filter((request) => request.status === activeTab);

  return (
    <div className='request-list'>
      <h1>Adoption Requests</h1>
      <div className='button-tab'>
          <button
            className={`button-81 ${activeTab === 'pending' ? 'active' : ''}`}
            role="button"
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`button-81 ${activeTab === 'approved' ? 'active' : ''}`}
            role="button"
            onClick={() => setActiveTab('approved')}
          >
            Approved
          </button>
          <button
            className={`button-81 ${activeTab === 'declined' ? 'active' : ''}`}
            role="button"
            onClick={() => setActiveTab('declined')}
          >
            Declined
          </button>
        </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Cat Name</th>
            <th>Age Type</th>
            <th>Breed</th>
            
            <th>Image</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.cat.cat_name}</td>
              <td>{request.cat.cat_age_type}</td>
              <td>{request.cat.cat_breed}</td>
              
              <td>
                <img src={request.cat.cat_image} alt={request.cat.cat_name} width="100" />
              </td>
              <td><span className='statustext'>{request.status}</span></td>
              <td>
                {request.status === 'pending' && (
                  <>
                    <button class="button-2" role="button" onClick={() => handleApprove(request.id)}>Approve</button>
                    
                    <button class="button-1" role="button"onClick={() => handleDecline(request.id)}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionRequests;