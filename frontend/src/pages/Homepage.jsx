import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';
import catHomepageImage from '../assestes/image 2.png';
import { Link } from 'react-router-dom';
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

        fetchCats();
    }, []);

    

    return (
        <div className="homepagecontainer">
            <div className="homepage">
                <div className="hero-section">
                    <img src={catHomepageImage} alt="Hero" className="hero-image" />
                    <h1 className="hero-title">YOUR BEST FRIEND NEEDS YOUR HELP</h1>
                </div>
                <p className="welcome-text">WELCOME TO PAWPAW</p>
                <p>Phnom Penh Animal Welfare is a volunteer organization dedicated to improving animal welfare in Cambodia. Our projects are funded by generous supporters like you, enabling us to make a positive impact on the lives of abandoned and stray cats and dogs in Phnom Penh and beyond</p>

                <Button variant="primary" className="donate-button">Donate</Button>
                <Row className="mt-4">
                    {cats.map(cat => (
                        <Col md={3} key={cat.id}>
                            <Card className="cat-card">
                                <Link to={`/cat/${cat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img variant="top" src={cat.cat_image} />
                                    <Card.Body>
                                        <Card.Title>{cat.cat_name}</Card.Title>
                                        <Card.Text>
                                            Age: {cat.cat_age_type}
                                            <br />
                                            Personality: {cat.cat_breed}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                
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
