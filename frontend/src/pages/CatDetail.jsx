import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';
import "./Css/Catdetail.css";
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
  const handleShareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleShareInstagram = () => {
    const shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(`Check out ${cat.cat_name} on our website!`)}`;
    window.open(shareUrl, "_blank");
  };

  const handleShareTelegram = () => {
    const shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(`Check out ${cat.cat_name} on our website!`)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div className="cat-detail-container">
      <div className="cat-detail-content">
        <img
          src={cat.cat_image}
          alt={cat.cat_name}
          className="cat-detail-image"
        />
        <div className="cat-description">
          <div className="info-cat">
            <h1>{cat.cat_name}</h1>
            <p>Age: {cat.cat_age_type}</p>
            <p>Breed: {cat.cat_breed}</p>
            <p>{cat.cat_description}</p>
          </div>
          <div className="button-container">
            {/* <button className="adopt-button" onClick={handleAdoptClick}>
              <img
                src="https://i.ibb.co/y6s6V3Z/Screenshot-2024-05-31-140418.png"
                alt="Adopt"
                className="adopt-button-image"
              />
            </button> */}
            <button class="button-80" onClick={handleAdoptClick}>Adopt Him</button>
            <div className="share-buttons">
              
              <button onClick={handleShareFacebook}>
                <img
                  src="https://cdn-icons-png.freepik.com/256/5968/5968764.png?ga=GA1.1.1013861150.1698735855&semt=ais_hybrid"
                  alt="Share on Facebook"
                  className="share-icon"
                />
              </button>
              <button onClick={handleShareInstagram}>
                <img
                  src="https://cdn-icons-png.freepik.com/256/2111/2111463.png?ga=GA1.1.1013861150.1698735855&semt=ais_hybrid"
                  alt="Share on Instagram"
                  className="share-icon"
                />
              </button>
              <button onClick={handleShareTwitter}>
                <img
                  src="https://cdn-icons-png.freepik.com/256/5968/5968830.png?ga=GA1.1.1013861150.1698735855&semt=ais_hybrid"
                  alt="Share on Twitter"
                  className="share-icon"
                />
              </button>
              <button onClick={handleShareTelegram}>
                <img
                  src="https://cdn-icons-png.freepik.com/256/2504/2504941.png?ga=GA1.1.1013861150.1698735855&semt=ais_hybrid"
                  alt="Share on Telegram"
                  className="share-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatDetail;
