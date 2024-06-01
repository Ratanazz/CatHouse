import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';
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
         <h1 className="hero-title">YOUR<br/> BESTFRIEND<br/> NEEDS YOUR<br/> HELP</h1>
       </div>
       <div className="welcome-container">
         <p className="welcome-text">WELCOME TO PAWPAW</p>
         <img src="https://i.ibb.co/NsMPGj8/pawpaw-removebg-preview.png" alt="PawPaw Logo" className="pawpaw-logo" />
       </div>
       <div className="modal-description">
         <p>Phnom Penh Animal Welfare is a volunteer organization dedicated to improving animal welfare in Cambodia. Our projects are funded by generous supporters like you, enabling us to make a positive impact on the lives of abandoned and stray cats and dogs in Phnom Penh and beyond</p>
         <p>You can help us continue our mission by donating or adopting one of the many cats in our shelter. Your support makes a real difference!</p>
       </div>
       <div className="donate-button-container">
         <img src="https://i.ibb.co/xhbDGJW/Screenshot-2024-05-31-141935.png" alt="Donate Button" className="donate-button" />
       </div>
       
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
                     Breed: {cat.cat_breed}
                   </Card.Text>
                 </Card.Body>
               </Link>
             </Card>
           </Col>
         ))}
       </Row>
       <div className="pagination">
         <span className="page-circle active">1</span>
         
       </div>
     </div>
   </div>
 );
}

export default Homepage;
