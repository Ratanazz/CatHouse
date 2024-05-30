import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';
import catHomepageImage from '../assestes/image 2.png';
import './Css/Homepage.css';
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
        <div className="homepagecontainer">
            <div className="homepage">
        <div className="hero-section">
          <img src={catHomepageImage} alt="Hero" className="hero-image" /> {/* Use the imported image */}
          <h1 className="hero-title">YOUR BEST FRIEND NEEDS YOUR HELP</h1>
        </div>
        <p className="welcome-text">WELCOME TO PAWPAW</p>
        <p>Phnom Penh Animal Welfare is a volunteer organization dedicated to improving animal welfare in Cambodia. Our projects are funded by generous supporters like you, enabling us to make a positive impact on the lives of abandoned and stray cats and dogs in Phnom Penh and beyond</p>
        
        <Button variant="primary" className="donate-button">Donate</Button>
        <Row className="mt-4">
          {cats.map(cats => (
            
                <Col md={3} key={cats.id}>
                  <Card className="cat-card">
                    <Card.Img variant="top" src={cats.cat_image} />
                    <Card.Body>
                      <Card.Title>{cats.cat_name}</Card.Title>
                      <Card.Text>
                        Age: {cats.cat_age_type}
                        <br />
                        Personality: {cats.cat_breed}
                      </Card.Text>
                      <button onClick={() => handleAdoptClick(cats)}>Adopt</button>
                    </Card.Body>
                  </Card>
                </Col>
           
          ))}
        </Row>
        <div className="pagination">
          <span className="page-circle active">1</span>
          <span className="page-circle">2</span>
          <span className="page-circle">3</span>
          <span className="page-circle">4</span>
          <span className="page-circle">5</span>
        </div>
      </div>
        
        </div>
    );
}

export default Homepage;
