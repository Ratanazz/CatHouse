import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';

function CatDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`${Cats_API_URL}/${id}`);
        setCat(response.data);
      } catch (error) {
        console.error("Error fetching cat details:", error);
      }
    };

    fetchCat();
  }, [id]);

  if (!cat) {
    return <div>Loading...</div>;
  }

  const handleAdoptClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token is found
      alert('You need to log in to adopt a cat.');
      navigate('/login');
      return;
    }

    try {
      // Send the cat data to the Laravel server for approval with authentication token
      const response = await axios.post('http://127.0.0.1:8000/api/adopt', cat, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error("Error submitting adoption request:", error);
    }
  };

  return (
    <div className="cat-detail-container">
      <h1>{cat.cat_name}</h1>
      <img src={cat.cat_image} alt={cat.cat_name} className="cat-detail-image" />
      <p>Age: {cat.cat_age_type}</p>
      <p>Personality: {cat.cat_breed}</p>
      <p>{cat.cat_description}</p>
      <button onClick={handleAdoptClick}>Adopt</button>
    </div>
  );
}

export default CatDetail;
