import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';

function Homepage() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await axios.get(Cats_API_URL);
                setCats(response.data);
            } catch (error) {
                console.error("Error fetching cats:", error);
            }
        };

        fetchCats(); // Call fetchCats within useEffect
    }, []); // Empty dependency array means this effect runs once on component mount
    const handleAdoptClick = async (cat) => {
        try {
          // Send the cat data to the Laravel server for approval
          const response = await axios.post('http://127.0.0.1:8000/api/adopt', cat);
          console.log(response.data); // Handle the response from the server
        } catch (error) {
          console.error("Error submitting adoption request:", error);
        }
      };

    return (
        <div className="cat-card">
            {cats.map(cats => (
                <div key={cats.id}>
                    <img src={cats.cat_image} alt="" />
                    <h1>{cats.cat_name}</h1>
                    <h2>{cats.cat_age_type}</h2>
                    <h2>{cats.cat_breed}</h2>
                    <h2>{cats.cat_description}</h2>
                    <button onClick={() => handleAdoptClick(cats)}>Adopt</button>

                </div>
            ))}
        </div>
    );
}

export default Homepage;
